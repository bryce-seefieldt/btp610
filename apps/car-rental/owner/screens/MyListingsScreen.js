/*
\owner\screens\MyListingScreen.js
*/

import { StyleSheet, Text, View, Button, TextInput, TextView, Switch, Pressable, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import {useState, useEffect, useCallback} from "react"
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import {db, auth} from "../firebaseConfig"
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore"

const ITEMS_PER_PAGE = 3;

const MyListingsScreen = ({navigation}) => {
    const [userProfile, setUserProfile] = useState(null)
    const [listings, setListings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useFocusEffect(
        useCallback(() => {
            console.log('MyListingsScreen: Screen focused, refreshing data')
            loadUserProfile()
            setupLogoutButton()
            
            return () => {
                console.log('MyListingsScreen: Screen blurred')
            }
        }, [])
    )

    // Calculate paginated listings
    const paginatedListings = useCallback(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return listings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [listings, currentPage]);

    // Navigation functions
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const setupLogoutButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={logoutUser} title="Logout"/>
            ),
        })
    }

    const loadUserProfile = async () => {
        setIsLoading(true)
        try {
            const currentUser = auth.currentUser
            if (!currentUser) {
                navigation.navigate("Login Screen")
                return
            }

            const userDoc = await getDoc(doc(db, "users", currentUser.uid))
            if (!userDoc.exists()) {
                Alert.alert("Error", "User profile not found")
                return
            }

            setUserProfile(userDoc.data())
            await loadUserListings(currentUser.uid)
        } catch (err) {
            Alert.alert("Error", "Failed to load profile. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const loadUserListings = async (uid) => {
        console.log('loadUserListings: Starting listings load', { uid })
        try {
            if (!uid) {
                throw new Error('User ID is required');
            }

            const q = query(
                collection(db, "listings"), 
                where("ownerUid", "==", uid)
            );
            const querySnapshot = await getDocs(q);
            
            const listingsData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Validate required fields
                if (!data.make || !data.model || !data.year) {
                    console.warn('Invalid listing data:', doc.id);
                    return;
                }
                listingsData.push({ id: doc.id, ...data });
            });
            
            setListings(listingsData);
            setTotalPages(Math.ceil(listingsData.length / ITEMS_PER_PAGE));
            setCurrentPage(1);
        } catch (err) {
            console.error("loadUserListings: Error:", err);
            Alert.alert(
                "Error",
                "Failed to load listings. Please try again later."
            );
        }
    };

    const logoutUser = () => {        
        auth.signOut() 
        navigation.navigate("Login Screen")       
    }

    const handleBookingsPress = (listing) => {
        console.log('handleBookingsPress:', {
            listingId: listing.id,
            make: listing.make,
            model: listing.model,
            booked: listing.booked
        });
        
        Alert.alert(
            "Booking Status",
            `${listing.year} ${listing.make} ${listing.model} is currently ${listing.booked ? 'booked' : 'available'} \n\nWould you like to manage bookings for this listing?`,
            [{ text: "YES", onPress: () => navigation.navigate("BookingsScreen", { listingId: listing.uid }) },
             { text: "NO", onPress: () => console.log("No") }]
        );
    };

    const handleDeleteListing = async (listingId) => {
        try {
            if (!listingId) {
                throw new Error('Listing ID is required');
            }

            const listingRef = doc(db, "listings", listingId);
            const listingDoc = await getDoc(listingRef);

            if (!listingDoc.exists()) {
                Alert.alert("Error", "Listing not found");
                return;
            }

            // Check if user owns the listing
            if (listingDoc.data().ownerUid !== auth.currentUser?.uid) {
                Alert.alert("Error", "You don't have permission to delete this listing");
                return;
            }

            await deleteDoc(listingRef);
            Alert.alert(
                "Success",
                "Listing deleted successfully",
                [{ text: "OK", onPress: () => loadUserProfile() }]
            );
        } catch (err) {
            Alert.alert(
                "Error",
                "Could not delete listing. Please try again."
            );
        }
    };

    const renderListingItem = ({ item }) => (
        <View style={styles.listingItem}>
            <View style={styles.listingHeader}>
                <Text style={styles.listingTitle}>
                    {item.year} {item.make} {item.model}
                </Text>
                <TouchableOpacity 
                    onPress={() => handleBookingsPress(item)}
                    style={styles.bookingButton}
                >
                    <MaterialIcons 
                        name={item.booked ? "event-busy" : "event-available"} 
                        size={24} 
                        color={item.booked ? "#FF3B30" : "#34C759"}
                    />
                    <Text style={[
                        styles.bookingStatus,
                        { color: item.booked ? "#FF3B30" : "#34C759" }
                    ]}>
                        {item.booked ? "Booked" : "Available"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listingContent}>
                <Image 
                    source={{ uri: item.photo }} 
                    style={styles.thumbnail}
                />
                <View style={styles.listingDetails}>
                    <Text>License Plate: {item.licensePlate}</Text>
                    <Text>Price: ${item.price}/day</Text>
                    <Text>Location: {item.city}</Text>
                    <Text>Listed: {new Date(item.createDate.seconds * 1000).toLocaleDateString()}</Text>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => Alert.alert(
                    "Delete Listing",
                    "Confirm you are permanently deleting this listing from your profile",
                    [
                        { 
                            text: "Cancel", 
                            style: "cancel",
                            onPress: () => loadUserProfile() // Refresh on cancel
                        },
                        { 
                            text: "Confirm", 
                            style: "destructive",
                            onPress: () => handleDeleteListing(item.id)
                        }
                    ]
                )}
            >
                <MaterialIcons name="delete-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
        </View>
    )

    const renderPagination = () => (
        <View style={styles.paginationContainer}>
            <Pressable 
                style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
                onPress={previousPage}
                disabled={currentPage === 1}
            >
                <Text style={styles.pageButtonText}>Previous</Text>
            </Pressable>
            
            <Text style={styles.pageText}>
                Page {currentPage} of {totalPages}
            </Text>
            
            <Pressable 
                style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
                onPress={nextPage}
                disabled={currentPage === totalPages}
            >
                <Text style={styles.pageButtonText}>Next</Text>
            </Pressable>
        </View>
    )

    // Add function to count booked listings
    const getBookedListingsCount = () => {
        return listings.filter(listing => listing.booked).length;
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading profile and listings...</Text>
            </View>
        )
    }

    return(
        <View style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.heading}>Welcome {userProfile?.name || 'Owner'}!</Text>
                <Text style={styles.subheading}>
                    {listings.length === 0 
                        ? 'No Listings' 
                        : `${listings.length} Total Listing${listings.length === 1 ? '' : 's'} • ${getBookedListingsCount()} Booked`
                    }
                </Text>
            </View>

            {listings.length === 0 ? (
                <Text style={styles.text}>Create your first listing!</Text>
            ) : (
                <>
                    <FlatList
                        data={paginatedListings()}
                        renderItem={renderListingItem}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        refreshing={isLoading}
                        onRefresh={loadUserProfile}
                    />
                    {renderPagination()}
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
    padding:20,
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
        justifyContent: 'center', // Centers content vertically
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
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    pageButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    pageButtonDisabled: {
        backgroundColor: '#ccc',
    },
    pageButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    pageText: {
        fontSize: 14,
        color: '#666',
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
    }
});

export default MyListingsScreen
