/*
\renter\screens\MyBookingsScreen.js
*/


import { StyleSheet, Text, View, Button, TextInput, TextView, Switch, Pressable, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import {useState, useEffect, useCallback} from "react"
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { runTransaction } from 'firebase/firestore';
import { logger } from '../utils/logger';

import {db, auth} from "../firebaseConfig"
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore"

const ITEMS_PER_PAGE = 3;

const MyBookingsScreen = ({navigation}) => {
    const [userProfile, setUserProfile] = useState(null)
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useFocusEffect(
        useCallback(() => {
            logger.info('Screen focused, refreshing data')
            loadUserProfile()
            setupLogoutButton()
            
            return () => {
                logger.debug('Screen blurred')
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

    const loadUserProfile = async () => {
        logger.info('Loading user profile and bookings')
        setIsLoading(true)
        try {
            const currentUser = auth.currentUser
            if (!currentUser) {
                logger.debug('No authenticated user found, redirecting to login')
                navigation.navigate("Login Screen")
                return
            }

            logger.info('Fetching user profile', { uid: currentUser.uid })
            const userDoc = await getDoc(doc(db, "users", currentUser.uid))
            if (!userDoc.exists()) {
                logger.error('User profile not found')
                Alert.alert("Error", "User profile not found")
                return
            }

            logger.info('User profile loaded successfully')
            setUserProfile(userDoc.data())
            await loadUserBookings(currentUser.uid)
        } catch (err) {
            logger.error('Error loading profile:', err)
            Alert.alert("Error", "Failed to load profile. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const loadUserBookings = async (uid) => {
        logger.info('Starting bookings load', { uid })
        try {
            if (!uid) {
                throw new Error('User ID is required');
            }

            const q = query(
                collection(db, "bookings"), 
                where("renterUid", "==", uid),
                where("active", "==", true)
            );
            
            const querySnapshot = await getDocs(q);
            const bookingsData = [];
            
            for (const docSnapshot of querySnapshot.docs) {
                const bookingData = docSnapshot.data();
                
                try {
                    const listingRef = doc(db, "listings", bookingData.uid);
                    const listingDoc = await getDoc(listingRef);
                    
                    if (listingDoc.exists()) {
                        const listingData = listingDoc.data();
                        bookingsData.push({
                            id: docSnapshot.id,
                            ...bookingData,
                            listing: {
                                make: listingData.make,
                                model: listingData.model,
                                year: listingData.year,
                                photo: listingData.photo,
                                address: listingData.address,
                                city: listingData.city,
                                state: listingData.state,
                            }
                        });
                    }
                } catch (error) {
                    logger.error("Error fetching listing details:", error);
                }
            }
            
            bookingsData.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
            
            setBookings(bookingsData);
            logger.info(`Loaded ${bookingsData.length} bookings`);
        } catch (err) {
            logger.error("Error:", err);
            Alert.alert(
                "Error",
                "Failed to load bookings. Please try again later."
            );
        }
    };

    const logoutUser = () => {        
        auth.signOut() 
        navigation.navigate("Login Screen")       
    }

    const handleCancelBooking = async (bookingId, listingId) => {
        logger.info('Starting booking cancellation', {
            bookingId,
            listingId
        })
        try {
            await runTransaction(db, async (transaction) => {
                logger.debug('Beginning cancellation transaction')
                const bookingRef = doc(db, "bookings", bookingId)
                const listingRef = doc(db, "listings", listingId)
                
                transaction.update(bookingRef, { active: false })
                transaction.update(listingRef, { booked: false })
                
                logger.debug('Transaction completed successfully')
            })

            logger.info('Booking cancelled successfully')
            Alert.alert(
                "Success",
                "Booking cancelled successfully",
                [{ text: "OK", onPress: () => loadUserProfile() }]
            )

        } catch (error) {
            logger.error('Error cancelling booking:', error)
            Alert.alert(
                "Error",
                "Failed to cancel booking. Please try again later."
            )
        }
    };

    const renderBookingItem = ({ item }) => (
        <View style={styles.bookingItem}>
            <Image 
                source={{ uri: item.listing.photo }} 
                style={styles.carImage}
            />
            <View style={styles.bookingDetails}>
                <Text style={styles.carTitle}>
                    {item.listing.year} {item.listing.make} {item.listing.model}
                </Text>
                <Text style={styles.location}>
                    📍 {item.listing.address}, {item.listing.city}
                </Text>
                <Text style={styles.confirmationCode}>
                    Confirmation: {item.confirmationCode}
                </Text>
                <Text style={styles.bookingDate}>
                    Booked on: {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
                </Text>
                
                <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => {
                        Alert.alert(
                            "Cancel Booking",
                            "Are you sure you want to cancel this booking?",
                            [
                                {
                                    text: "No",
                                    style: "cancel"
                                },
                                {
                                    text: "Yes",
                                    style: "destructive",
                                    onPress: () => handleCancelBooking(item.id, item.uid)
                                }
                            ]
                        );
                    }}
                >
                    <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading profile and bookings...</Text>
            </View>
        )
    }

    return(
        <View style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.heading}>Welcome {userProfile?.name || 'Renter'}!</Text>
                <Text style={styles.subheading}>
                    {bookings.length === 0 
                        ? 'No Bookings' 
                        : `${bookings.length} Total Booking${bookings.length === 1 ? '' : 's'}`
                    }
                </Text>
            </View>

            {bookings.length === 0 ? (
                <View>
                    <Text style={styles.text}>No bookings found. Start by searching for available cars!</Text>
                    <Pressable 
                        style={styles.searchButton}
                        onPress={() => navigation.navigate('Search Listings')}
                    >
                        <Text style={styles.searchButtonText}>Search Now</Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={bookings}
                    renderItem={renderBookingItem}
                    keyExtractor={item => item.id}
                    refreshing={isLoading}
                    onRefresh={() => loadUserProfile()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',    
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
    },
    subheading: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 5
    },
    text: {
        fontSize: 18,
        marginVertical: 8,
        textAlign: 'center'
    },
    error: {
        fontSize: 16,
        textAlign: 'center',
        color: 'blue'
    },
    searchButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        marginHorizontal: 40,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bookingItem: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginVertical: 5,
    },
    carImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 15,
    },
    bookingDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    carTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    location: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    confirmationCode: {
        fontSize: 14,
        color: '#007AFF',
        marginBottom: 4,
    },
    bookingDate: {
        fontSize: 12,
        color: '#888',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10,
    },
    cancelButton: {
        backgroundColor: '#FF3B30',
        padding: 8,
        borderRadius: 5,
        marginTop: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default MyBookingsScreen