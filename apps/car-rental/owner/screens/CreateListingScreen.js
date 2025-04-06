/*
\owner\screens\CreateListingScreen.js
*/

import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    ScrollView, 
    Pressable, 
    Alert,
    KeyboardAvoidingView,
    Platform,
    Button,
    Switch
} from 'react-native';
import { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import * as Location from 'expo-location';

const CreateListingScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        make: 'Toyota',
        model: 'Camry',
        year: '2020',
        licensePlate: 'ABC123',
        price: '100',
        photo: 'https://picsum.photos/100',
        city: 'Toronto',
        address: '2 Yonge Street',
        isAvailable: true,
        booked: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userName, setUserName] = useState('');
    const scrollViewRef = useRef();
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    useEffect(() => {
        loadUserProfile();
        setupLogoutButton();
    }, []);

    const loadUserProfile = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setUserName(userDoc.data().name);
                }
            }
        } catch (err) {
            console.error("Error loading user profile:", err);
        }
    };

    const setupLogoutButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={logoutUser} title="Logout"/>
            ),
        });
    };

    const logoutUser = () => {        
        auth.signOut(); 
        navigation.navigate("Login Screen");       
    };

    const requestLocationAndGetAddress = async () => {
        setIsLoadingLocation(true);
        try {
            // Request permissions only when switch is turned on
            const permissionsObject = await Location.requestForegroundPermissionsAsync();
            
            if (permissionsObject.status !== "granted") {
                Alert.alert(
                    "Permission Denied",
                    "Location permission is needed to auto-fill address"
                );
                setUseCurrentLocation(false);
                return;
            }

            // If permission granted, get current location
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced
            });

            // Get address from coordinates
            const results = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            if (results && results[0]) {
                const address = results[0];
                setFormData(prev => ({
                    ...prev,
                    address: `${address.streetNumber || ''} ${address.street || ''}`.trim(),
                    city: address.city || '',
                }));
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "Could not get current location. Please enter address manually."
            );
            setUseCurrentLocation(false);
        } finally {
            setIsLoadingLocation(false);
        }
    };

    // Handle switch toggle
    const handleLocationSwitch = (value) => {
        setUseCurrentLocation(value);
        if (value) {
            requestLocationAndGetAddress();
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const currentYear = new Date().getFullYear();

        // Essential field validations
        if (!formData.make.trim()) newErrors.make = 'Make is required';
        if (!formData.model.trim()) newErrors.model = 'Model is required';
        if (!formData.licensePlate.trim()) newErrors.licensePlate = 'License plate is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';

        // Year validation
        const yearNum = parseInt(formData.year);
        if (!formData.year || isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear + 1) {
            newErrors.year = `Year must be between 1900 and ${currentYear + 1}`;
        }

        // Price validation
        const price = parseFloat(formData.price);
        if (!formData.price || isNaN(price) || price <= 0) {
            newErrors.price = 'Please enter a valid price';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (!validateForm()) {
                return;
            }

            const currentUser = auth.currentUser;
            if (!currentUser) {
                Alert.alert("Error", "Please log in again");
                navigation.navigate("Login Screen");
                return;
            }

            const listingData = {
                ...formData,
                ownerUid: currentUser.uid,
                year: parseInt(formData.year),
                price: parseFloat(formData.price),
                createDate: serverTimestamp(),
                lastUpdate: serverTimestamp()
            };

            await addDoc(collection(db, "listings"), listingData);
            
            Alert.alert(
                "Success",
                `${listingData.year} ${listingData.make} ${listingData.model} in ${listingData.city} listing created successfully.`,
                [
                    {
                        text: "View My Listings",
                        onPress: () => navigation.navigate("My Listings")
                    },
                    {
                        text: "Add More Listings",
                        onPress: () => {
                            clearForm();
                            // Optionally scroll to top
                            scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert(
                "Error",
                error.code === 'permission-denied' 
                    ? "You don't have permission to create listings" 
                    : "Failed to create listing. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearForm = () => {
        console.log('clearForm: Resetting form data');
        setFormData({
            make: '',
            model: '',
            year: '',
            licensePlate: '',
            price: '',
            photo: '',
            city: '',
            address: '',
            isAvailable: true,
            booked: false
        });
        setErrors({});
    };

    const renderInput = (field, placeholder, keyboardType = 'default') => (
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, errors[field] && styles.inputError]}
                placeholder={placeholder}
                value={formData[field]}
                onChangeText={(text) => setFormData({...formData, [field]: text})}
                keyboardType={keyboardType}
                onFocus={() => {
                    // Scroll to input when focused
                    scrollViewRef.current?.scrollTo({
                        y: styles.inputContainer.marginBottom * Object.keys(formData).indexOf(field),
                        animated: true
                    });
                }}
            />
            {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
        </View>
    );

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView 
                ref={scrollViewRef}
                style={styles.scrollView}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.heading}>Create New Listing</Text>
                
             

                {renderInput('make', 'Make (e.g., Toyota)')}
                {renderInput('model', 'Model (e.g., Camry)')}
                {renderInput('year', 'Year (e.g., 2020)', 'numeric')}
                {renderInput('licensePlate', 'License Plate')}
                {renderInput('price', 'Daily Price ($)', 'numeric')}
                {renderInput('photo', 'Photo URL')}
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, errors.address && styles.inputError]}
                        placeholder="Address"
                        value={formData.address}
                        onChangeText={(text) => setFormData({...formData, address: text})}
                        editable={!isLoadingLocation}
                    />
                    {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
                    {isLoadingLocation && <Text style={styles.loadingText}>Getting location...</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, errors.city && styles.inputError]}
                        placeholder="City"
                        value={formData.city}
                        onChangeText={(text) => setFormData({...formData, city: text})}
                        editable={!isLoadingLocation}
                    />
                    {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
                </View>
                <View style={styles.switchContainer}>
                    <Text>Use Current Location</Text>
                    <Switch
                        value={useCurrentLocation}
                        onValueChange={handleLocationSwitch}
                        disabled={isLoadingLocation}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable 
                        style={[styles.button, styles.submitButton]} 
                        onPress={handleSubmit}
                        disabled={isSubmitting}>
                        <Text style={styles.buttonText}>
                            {isSubmitting ? 'Creating...' : 'Create Listing'}
                        </Text>
                    </Pressable>

                    <Pressable 
                        style={[styles.button, styles.clearButton]} 
                        onPress={clearForm}>
                        <Text style={styles.buttonText}>Clear Form</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 40, // Added extra bottom margin for keyboard
        gap: 10,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#007AFF',
    },
    clearButton: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    loadingText: {
        color: '#666',
        fontSize: 12,
        marginTop: 5,
        fontStyle: 'italic',
    },
});

export default CreateListingScreen;