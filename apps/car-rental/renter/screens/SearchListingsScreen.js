/*
\owner\screens\MyListingScreen.js
*/

import { StyleSheet, Text, View, Button, TextInput, TextView, Switch, Pressable, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import {useState, useEffect, useCallback, useRef} from "react"
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { runTransaction } from 'firebase/firestore';
import { logger } from '../utils/logger';

import {db, auth} from "../firebaseConfig"
import { doc, getDoc, collection, query, where, getDocs, deleteDoc, addDoc, updateDoc, setDoc } from "firebase/firestore"

const ITEMS_PER_PAGE = 3;

const SearchListingsScreen = ({navigation}) => {
    const [listings, setListings] = useState([])
    const [filteredListings, setFilteredListings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [geocodedListings, setGeocodedListings] = useState([])
    const mapRef = useRef(null);
    
    // Initial region for the map (you might want to adjust these coordinates)
    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    useFocusEffect(
        useCallback(() => {
            logger.info('Screen focused, initializing data and UI');
            loadAvailableListings()
            setupLogoutButton()
            
            return () => {
                logger.debug('Screen blurred, cleaning up');
            }
        }, [])
    )

    const setupLogoutButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={logoutUser} title="Logout"/>
            ),
        })
    }

    const logoutUser = () => {        
        auth.signOut() 
        navigation.navigate("Login Screen")       
    }

    const geocodeAddress = async (address) => {
        try {
            const results = await Location.geocodeAsync(address);
            if (results && results.length > 0) {
                return {
                    latitude: results[0].latitude,
                    longitude: results[0].longitude,
                };
            }
            console.warn(`Failed to geocode address: ${address}`);
            return null;
        } catch (error) {
            console.error('Geocoding error:', error);
            return null;
        }
    };

    const fitMapToMarkers = () => {
        if (mapRef.current && geocodedListings.length > 0) {
            const markers = geocodedListings.filter(listing => listing.latitude && listing.longitude);
            if (markers.length > 0) {
                console.log('Fitting map to markers:', markers);
                const coordinates = markers.map(listing => ({
                    latitude: listing.latitude,
                    longitude: listing.longitude,
                }));
                
                mapRef.current.fitToCoordinates(coordinates, {
                    edgePadding: {
                        top: 50,
                        right: 50,
                        bottom: 50,
                        left: 50,
                    },
                    animated: true,
                });
            }
        }
    };

    // Add useEffect to watch for geocodedListings changes
    useEffect(() => {
        if (geocodedListings.length > 0) {
            console.log('Geocoded listings updated, fitting map');
            fitMapToMarkers();
        }
    }, [geocodedListings]);

    const geocodeListings = async (listingsData) => {
        const geocodedResults = [];
        for (const listing of listingsData) {
            const fullAddress = `${listing.address}, ${listing.city}, ${listing.state}`;
            const coordinates = await geocodeAddress(fullAddress);
            if (coordinates) {
                console.log(`Geocoded ${fullAddress}:`, coordinates);
                geocodedResults.push({
                    ...listing,
                    ...coordinates
                });
            } else {
                console.warn(`Failed to geocode address for listing: ${listing.id}`);
                geocodedResults.push(listing);
            }
        }
        setGeocodedListings(geocodedResults);
        // Remove direct fitMapToMarkers call here as it will be handled by useEffect
    };

    const loadAvailableListings = async () => {
        logger.info('Starting listings load');
        setIsLoading(true)
        try {
            const q = query(
                collection(db, "listings"), 
                where("booked", "==", false)
            );
            const querySnapshot = await getDocs(q);
            
            const listingsData = [];
            for (const docSnapshot of querySnapshot.docs) {
                const data = docSnapshot.data();
                // Validate required fields
                if (!data.make || !data.model || !data.year) {
                    logger.debug('Invalid listing data:', docSnapshot.id);
                    continue;
                }
                
                // Fetch owner details using ownerUid
                try {
                    const ownerRef = doc(db, "users", data.ownerUid);
                    const ownerDoc = await getDoc(ownerRef);
                    const ownerData = ownerDoc.data();
                    const ownerName = ownerData?.name || 'Unknown Owner';
                    
                    listingsData.push({ 
                        id: docSnapshot.id, 
                        ...data,
                        ownerName 
                    });
                } catch (error) {
                    console.warn('Error fetching owner details:', error);
                    listingsData.push({ 
                        id: docSnapshot.id, 
                        ...data,
                        ownerName: 'Unknown Owner'
                    });
                }
            }
            
            setListings(listingsData);
            await geocodeListings(listingsData);
        } catch (err) {
            logger.error('Error loading listings:', err);
            Alert.alert(
                "Error",
                "Failed to load listings. Please try again later."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Add this useEffect to initialize filteredListings
    useEffect(() => {
        setFilteredListings(listings);
    }, [listings]);

    const handleMarkerPress = (listing) => {
        console.log('SearchListingsScreen: Map marker pressed', { 
            listingId: listing.id,
            make: listing.make,
            model: listing.model 
        })
        setFilteredListings([listing])
    }

    const resetFilter = () => {
        console.log('SearchListingsScreen: Resetting listing filters to show all listings', {
            totalListings: listings.length
        })
        setFilteredListings(listings)
    }

    const generateConfirmationCode = (ownerUid, listingId, renterUid) => {
        // Get last 4 characters of each ID
        const ownerPart = ownerUid.slice(-4);
        const listingPart = listingId.slice(-4);
        const renterPart = renterUid.slice(-4);
        
        // Generate random 4 character string
        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
        
        // Combine all parts with hyphens
        return `${ownerPart}-${listingPart}-${renterPart}-${randomPart}`;
    };

    const createBooking = async (listing) => {
        logger.info('Starting booking creation', {
            listingId: listing.id,
            car: `${listing.year} ${listing.make} ${listing.model}`
        });
        try {
            const currentUser = auth.currentUser
            if (!currentUser) {
                logger.error('No authenticated user found');
                Alert.alert("Error", "You must be logged in to book a car")
                return
            }

            const confirmationCode = generateConfirmationCode(
                listing.ownerUid,
                listing.id,
                currentUser.uid
            )
            console.log('SearchListingsScreen: Generated confirmation code', { confirmationCode })

            const bookingData = {
                uid: listing.id,
                ownerUid: listing.ownerUid,
                renterUid: currentUser.uid,
                confirmationCode: confirmationCode,
                active: true,
                createdAt: new Date()
            };

            // Use transaction to ensure both operations succeed or fail together
            await runTransaction(db, async (transaction) => {
                const bookingRef = doc(db, "bookings", listing.id);
                transaction.set(bookingRef, bookingData);

                const listingRef = doc(db, "listings", listing.id);
                transaction.update(listingRef, { booked: true });
            });

            Alert.alert(
                "Booking Confirmed!",
                `Your confirmation code is: ${confirmationCode}`,
                [
                    {
                        text: "View My Bookings",
                        onPress: () => navigation.navigate('My Bookings')
                    },
                    {
                        text: "Search More Listings",
                        onPress: () => {
                            loadAvailableListings();
                            setFilteredListings(listings);
                        }
                    }
                ],
                { cancelable: false }
            );

            logger.info('Booking created successfully', {
                bookingId: listing.id,
                confirmationCode
            });

        } catch (error) {
            logger.error('Error creating booking:', error)
            Alert.alert(
                "Error",
                "Failed to create booking. Please try again later."
            )
        }
    };

    const handleBooking = (item) => {
        console.log('SearchListingsScreen: Initiating booking process', {
            listingId: item.id,
            car: `${item.year} ${item.make} ${item.model}`,
            location: `${item.address}, ${item.city}`
        })
        Alert.alert(
            "Confirm Booking",
            `Please confirm your booking of the ${item.year} ${item.make} ${item.model} at ${item.address}, ${item.city}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => console.log('SearchListingsScreen: Booking cancelled by user')
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        console.log('SearchListingsScreen: Booking confirmed by user')
                        createBooking(item)
                    }
                }
            ]
        )
    };

    const renderListingItem = ({ item }) => (
        <View style={styles.listingItem}>
            <View style={styles.listingHeader}>
                <Text style={styles.listingTitle}>
                    {item.year} {item.make} {item.model}
                </Text>
            </View>

            <View style={styles.listingContent}>
                <Image 
                    source={{ uri: item.photo }} 
                    style={styles.thumbnail}
                />
                <View style={styles.listingDetails}>
                    <Text style={styles.price}>Price: ${item.price}/day</Text>
                    <Text style={styles.location}>📍 {item.address}</Text>
                    <Text style={styles.location}>🏙️ {item.city}, {item.state}</Text>
                    <Text style={styles.owner}>👤 Owner: {item.ownerName}</Text>
                    <Text style={styles.date}>Listed: {new Date(item.createDate.seconds * 1000).toLocaleDateString()}</Text>
                    
                    <TouchableOpacity 
                        style={styles.bookButton}
                        onPress={() => handleBooking(item)}
                    >
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading available listings...</Text>
            </View>
        )
    }

    return(
        <View style={styles.container}> 
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={initialRegion}
                >
                    {geocodedListings.map((listing) => {
                        if (listing.latitude && listing.longitude) {
                            return (
                                <Marker
                                    key={listing.id}
                                    coordinate={{
                                        latitude: listing.latitude,
                                        longitude: listing.longitude,
                                    }}
                                    title={`${listing.year} ${listing.make} ${listing.model}`}
                                    description={`$${listing.price}/day`}
                                    onPress={() => handleMarkerPress(listing)}
                                />
                            );
                        }
                        return null;
                    })}
                </MapView>
                {filteredListings.length !== listings.length && (
                    <TouchableOpacity 
                        style={styles.resetButton}
                        onPress={resetFilter}
                    >
                        <Text style={styles.resetButtonText}>Show All Listings</Text>
                    </TouchableOpacity>
                )}
            </View>
            
            {listings.length === 0 ? (
                <Text style={styles.text}>No cars are currently available.</Text>
            ) : (
                <FlatList
                    style={styles.listContainer}
                    data={filteredListings}
                    renderItem={renderListingItem}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    refreshing={isLoading}
                    onRefresh={loadAvailableListings}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapContainer: {
        height: 200,  // Fixed height for the map
        width: '100%',
        backgroundColor: '#f0f0f0',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    listContainer: {
        flex: 1,
        padding: 20,
    },
    tb: {
        width:"100%",  
        borderRadius:5,
        backgroundColor:"#efefef",
        color:"#333",
        fontWeight:"bold",
        paddingHorizontal:10,
        paddingVertical:15,
        marginVertical:10,      
    },
    btn: {
        borderWidth:1,
        borderColor:"#141D21",
        borderRadius:8,
        paddingVertical:8,
        marginVertical:8
    },
    darkBtn: {
        borderWidth:1,
        backgroundColor:"#000",    
        borderRadius:8,
        paddingVertical:16,
        marginVertical:8
    },
    btnLabel: {
        fontSize:16,
        textAlign:"center"
    },
    error: {
        fontSize:16,
        textAlign:"center",
        color:"blue"
    },
    heading : {
        fontSize:20,
        textAlign:"center",
    },
    text : {
        fontSize:18,
        marginVertical:8,
    },
    listingItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginVertical: 5,
        position: 'relative', // For absolute positioning of delete button
    },
    listingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    listingContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
    },
    listingDetails: {
        flex: 1,
        justifyContent: 'flex-start',
        gap: 2,
    },
    listingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    header: {
        marginBottom: 20,
    },
    subheading: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 5
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 5,
    },
    bookingButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
    },
    bookingStatus: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '500',
    },
    deleteButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    location: {
        fontSize: 14,
        marginBottom: 4,
        color: '#666',
    },
    owner: {
        fontSize: 14,
        marginBottom: 4,
        color: '#666',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    resetButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    resetButtonText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    bookButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    bookButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default SearchListingsScreen
