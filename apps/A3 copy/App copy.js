// \apps\A3\App.js
import * as Location from "expo-location"
import MapView, {Marker, Callout} from "react-native-maps"
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, ActivityIndicator } from "react-native";
import { useState, useEffect, useRef } from "react"
import { GEOAPIFY_API_KEY } from "@env"
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


export default function App() {
    // Loading state to handle async operations
    const [isLoading, setIsLoading] = useState(false);
    // Error state to store and display error messages
    const [error, setError] = useState(null);

    const [addressFromUI, setAddressFromUI] = useState("1750 Finch Avenue East, Toronto, ON")
    const [latFromUI, setLatFromUI] = useState("43.7778779")
    const [lngFromUI] = useState("-79.3495249")

    // State to store the complete location object returned by Location.getCurrentPositionAsync()
    // Contains coords object with latitude, longitude, altitude, accuracy, etc.
    const [currentLocation, setCurrentLocation] = useState(null);
    // State to control the visible region of the map
    // Null initially - will be set when location is retrieved
    const [visibleMapRegion, setVisibleMapRegion] = useState(null);

    // State to display current location in text format
    const [currLocationLabel, setCurrLocationLabel] = useState("Retrieving location...");

    // Source: apps/w08-api/App-s_s-api.js (lines 7-8)
    // State to store places data from API
    const [placesData, setPlacesData] = useState(null);

    // useEffect hook runs when component mounts or when placesData updates
    useEffect(() => {
        console.log("DEBUG: useEffect triggered - component mounted or placesData updated");
        
        // Declare async function inside useEffect to handle permissions and location
        const initializeLocation = async () => {
            console.log("DEBUG: Starting location initialization");
            
            // First request permissions
            await requestPermissions();
            
            // Only proceed to get location if no errors occurred during permission request
            if (!error) {
                console.log("DEBUG: Permissions granted, getting current location");
                await getCurrLocation();
            } else {
                console.log("DEBUG: Permissions failed, cannot get location");
            }
        };

        // Execute the initialization function
        initializeLocation();
    }, []); // Empty dependency array means this only runs once when component mounts

    // Function to request location permissions from device
    const requestPermissions = async () => {
        console.log("DEBUG: Requesting location permissions");
        try {
            setIsLoading(true);
            setError(null);
            const permissionsObject = await Location.requestForegroundPermissionsAsync()
            
            if (permissionsObject.status === "granted") {
                console.log("DEBUG: Permission granted successfully");
            } else {
                console.log("DEBUG: Permission denied by user");
                setError("Location permission denied");
            }
        } catch (err) {
            console.log("ERROR in requestPermissions:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }
   

   // Source: apps/w08-api/App-api-demo.js (lines 8-42)
   // Function to fetch nearby places from Geoapify API
   const fetchNearbyPlaces = async (latitude, longitude) => {
       console.log('\n=== DEBUG: fetchNearbyPlaces() ===');
       console.log('Parameters:', { latitude, longitude });
       
       try {
           setIsLoading(true);
           setError(null);

           // Construct API URL with parameters
           const apiUrl = `https://api.geoapify.com/v2/places`
               + `?categories=commercial.food_and_drink,sport`
               + `&conditions=named`
               + `&filter=circle:${longitude},${latitude},5000`
               + `&limit=50`
               + `&apiKey=${GEOAPIFY_API_KEY}`;
           
           console.log('Calling Geoapify API...');
           const response = await fetch(apiUrl);
           
           // Check if the response is successful
           if (response.ok) {
               console.log('API Response received successfully');
               
               // Convert response to JSON
               const data = await response.json();
               
               // Store places data in state
               setPlacesData(data);

               // Enhanced debug logging for places data
               console.log('\n=== Places Retrieved ===');
               if (data.features.length === 0) {
                   console.log('No places found in the specified area');
               } else {
                   data.features.forEach((place, index) => {
                       const props = place.properties;
                       console.log(`\nPlace ${index + 1}:`);
                       console.log('------------------------');
                       console.log(`Name: ${props.name}`);
                    //    console.log(`Address: ${props.address_line2 || 'No address provided'}`);
                    //    console.log(`Categories: ${props.categories.join(', ')}`);
                    //    console.log(`Distance: ${props.distance}m from current location`);
                       
                       // Additional useful information
                       console.log('Location details:');
                       console.log(`- Street: ${props.street || 'N/A'}`);
                       console.log(`- City: ${props.city || 'N/A'}`);
                    //    console.log(`- State: ${props.state || 'N/A'}`);
                    //    console.log(`- Postal Code: ${props.postcode || 'N/A'}`);
                   });
                   console.log('\n=== End of Places List ===\n');
               }
           } else {
               throw new Error(`API Error: ${response.status}`);
           }
       } catch (err) {
           console.log('ERRORRRR in fetchNearbyPlaces:', err);
           setError(err.message);
       } finally {
           setIsLoading(false);
       }
   };

   // Source: apps/w09-geo/App.js (lines 54-76)
   const getCurrLocation = async () => {
       console.log("DEBUG: Starting getCurrentLocation");
       try {
           setIsLoading(true);
           setError(null);
           
           const location = await Location.getCurrentPositionAsync({
               accuracy: Location.Accuracy.Balanced
           });

           console.log("DEBUG: Location retrieved successfully:", location);

           // Store location and update map
           setCurrentLocation(location);
           const newRegion = {
               latitude: location.coords.latitude,
               longitude: location.coords.longitude,
               latitudeDelta: 0.05,
               longitudeDelta: 0.05
           };
           setVisibleMapRegion(newRegion);

           // Source: apps/w09-geo/App.js - Forward Geocoding pattern
           // Get address for current location
           console.log("DEBUG: Getting address for current location");
           try {
               const addressResponse = await Location.reverseGeocodeAsync({
                   latitude: location.coords.latitude,
                   longitude: location.coords.longitude
               });

               if (addressResponse && addressResponse[0]) {
                   const address = addressResponse[0];
                   console.log("DEBUG: Current location address details:", address);
                   
                   // Format address components
                   const formattedAddress = [
                       address.street,
                       address.city,
                       address.region,
                       address.postalCode,
                       address.country
                   ].filter(Boolean).join(', ');

                   console.log("DEBUG: Formatted current address:", formattedAddress);
                   setCurrLocationLabel(formattedAddress);
               } else {
                   console.log("DEBUG: No address found for current location");
                   setCurrLocationLabel("Address not found");
               }
           } catch (geoErr) {
               console.log("ERROR in geocoding:", geoErr);
               setCurrLocationLabel("Error getting address");
           }

           // Fetch nearby places using current location
           console.log("DEBUG: Fetching nearby places");
           await fetchNearbyPlaces(
               location.coords.latitude,
               location.coords.longitude
           );
       } catch (err) {
           console.log("ERROR: Trying etCurrLocation:", err);
           setError(err.message);
           setCurrLocationLabel("Error getting location");
       } finally {
           setIsLoading(false);
       }
   };

   // Source: apps/w09-map-demo/App.js (lines 51-52)
   // Reference to store map instance for programmatic control
   const mapRef = useRef(null);

   // Function to determine marker icon based on place category
   // Source: Adapted from apps/w09-maps/App.js (lines 65-70)
   const getCategoryIcon = (categories) => {
       console.log("DEBUG: Determining icon for categories:", categories);
       
       // Check if categories is an array and has elements
       if (!Array.isArray(categories) || categories.length === 0) {
           console.log("DEBUG: No categories found, using default marker");
           return <MaterialCommunityIcons name="map-marker" size={24} color="#000" />;
       }

       // Source: Combined patterns from apps/w09-map-demo/App.js and apps/w09-maps/App.js
       // Check for food and drink category
       if (categories.some(cat => cat.includes('commercial.food_and_drink'))) {
           console.log("DEBUG: Food/Drink category detected");
           return <MaterialCommunityIcons name="food-fork-drink" size={24} color="#FF6B6B" />;
       }
       
       // Check for sport/fitness category
       if (categories.some(cat => cat.includes('sport'))) {
           console.log("DEBUG: Sport category detected");
           return <FontAwesome5 name="dumbbell" size={24} color="#4A90E2" />;
       }

       // Default marker if no specific category matches
       console.log("DEBUG: Using default marker");
       return <MaterialCommunityIcons name="map-marker" size={24} color="#000" />;
   };

   // Source: apps/w09-map-demo/App.js (lines 58-75)
   // Function to render markers for each POI
   const renderPlaceMarkers = () => {
       console.log("\n=== DEBUG: renderPlaceMarkers ===");
       if (!placesData) {
           console.log("DEBUG: placesData is null");
           return null;
       }
       if (!placesData.features) {
           console.log("DEBUG: placesData.features is undefined");
           return null;
       }
       if (placesData.features.length === 0) {
           console.log("DEBUG: No features in placesData");
           return null;
       }

       console.log(`DEBUG: About to render ${placesData.features.length} markers`);
       
       return placesData.features.map((place, index) => {
           if (!place.properties || !place.properties.lat || !place.properties.lon) {
               console.log(`DEBUG: Invalid place data for index ${index}`);
               return null;
           }

           console.log(`DEBUG: Rendering marker ${index + 1}:`, {
               name: place.properties.name,
               lat: place.properties.lat,
               lon: place.properties.lon,
               categories: place.properties.categories
           });

           return (
               <Marker
                   key={`place-${index}`}  // More specific key
                   coordinate={{
                       latitude: place.properties.lat,
                       longitude: place.properties.lon
                   }}
               >
                   <View style={styles.markerContainer}>
                       {getCategoryIcon(place.properties.categories)}
                   </View>
                   
                   <Callout>
                       <View style={styles.calloutContainer}>
                           <Text style={styles.calloutTitle}>
                               {place.properties.name || 'Unnamed Location'}
                           </Text>
                           <Text style={styles.calloutAddress}>
                               {place.properties.address_line2 || 'No address available'}
                           </Text>
                       </View>
                   </Callout>
               </Marker>
           );
       }).filter(Boolean); // Remove any null markers
   };

   // Add this useEffect to monitor component lifecycle and data flow
   useEffect(() => {
       console.log("\n=== DEBUG: Map Component State ===");
       console.log("currentLocation:", currentLocation ? "Set" : "Not Set");
       console.log("placesData:", placesData ? `Has ${placesData.features?.length || 0} places` : "Not Set");
       console.log("visibleMapRegion:", visibleMapRegion ? "Set" : "Not Set");
       
       if (currentLocation && !placesData) {
           console.log("DEBUG: Location available but no places data, fetching places...");
           fetchNearbyPlaces(
               currentLocation.coords.latitude,
               currentLocation.coords.longitude
           );
       }
   }, [currentLocation, placesData, visibleMapRegion]);

   return (
       <SafeAreaView style={styles.container}>
           {error ? (
               // Show error message if there's an error
               <Text style={styles.errorText}>{error}</Text>
           ) : isLoading ? (
               // Show loading indicator while getting location
               <ActivityIndicator size="large" />
           ) : (
               <View style={styles.content}>
                   <Text style={styles.headingText}>Calorie Exchange Centers</Text>
                   <Text style={styles.subHeadingText}>Displaying Food and Fitness near {currLocationLabel}</Text>
                   
                   {/* Only render MapView when we have valid region data */}
                   {currentLocation && (
                       <MapView
                           key="mainMap"
                           ref={mapRef}
                           style={styles.map}
                           initialRegion={{
                               latitude: currentLocation.coords.latitude,
                               longitude: currentLocation.coords.longitude,
                               latitudeDelta: 0.05,
                               longitudeDelta: 0.05
                           }}
                           onLayout={() => {
                               console.log("DEBUG: MapView layout complete");
                           }}
                       >
                           {/* Current location marker with Callout */}
                           <Marker
                               coordinate={{
                                   latitude: currentLocation.coords.latitude,
                                   longitude: currentLocation.coords.longitude
                               }}
                           >
                               <View style={styles.currentLocationMarker}>
                                   <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#007AFF" />
                               </View>
                               
                               {/* Source: apps/w09-maps/App.js - Callout pattern */}
                               <Callout>
                                   <View style={styles.calloutContainer}>
                                       <Text style={styles.calloutTitle}>Current Location</Text>
                                       <View style={styles.calloutDivider} />
                                       <Text style={styles.calloutAddress}>
                                           {currLocationLabel}
                                       </Text>
                                       <View style={styles.calloutDivider} />
                                       <Text style={styles.calloutCoordinates}>
                                           Lat: {currentLocation.coords.latitude.toFixed(4)}{'\n'}
                                           Long: {currentLocation.coords.longitude.toFixed(4)}
                                       </Text>
                                   </View>
                               </Callout>
                           </Marker>

                           {/* Place markers */}
                           {renderPlaceMarkers()}
                       </MapView>
                   )}
               </View>
           )}
       </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff",
     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
   },
   content: {
       flex: 1,
       alignItems: "center",
       padding: 20,
   },
   subHeadingText: {
    color:"green",
    fontSize:14,
    marginVertical:8,
    textAlign:"center"
   },
   text: {
       fontSize:18,
       marginVertical:8,
       textAlign:"center"
   },
   headingText: {
     color:"purple",
       fontSize:24,
       marginVertical: 8,
       textAlign:"center",
   },     
   input: {
       height: 40,
       margin: 8,
       borderWidth: 1,
       padding: 10,
       width: '100%',
   },   
   map: {
    flex: 1,          // Take up remaining space
    width: '100%',    // Full width minus padding
    minHeight: 200,   // Minimum height
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,  // Slightly rounded corners
    marginHorizontal: 16,  // Padding from edges
    marginBottom: 16,      // Padding from bottom
},
   errorText: {
       color: 'red',
       fontSize: 16,
       textAlign: 'center',
       margin: 10,
   },
   markerContainer: {
       padding: 5,
       backgroundColor: 'white',
       borderRadius: 12,
       borderWidth: 1,
       borderColor: '#ccc',
   },
   currentLocationMarker: {
       padding: 5,
       backgroundColor: 'white',
       borderRadius: 12,
       borderWidth: 2,
       borderColor: '#007AFF',
   },
   calloutContainer: {
       padding: 12,
       backgroundColor: 'white',
       borderRadius: 8,
       borderWidth: 1,
       borderColor: '#ccc',
       width: 250,  // Fixed width
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5,
   },
   calloutTitle: {
       fontSize: 16,
       fontWeight: 'bold',
       marginBottom: 8,
       textAlign: 'center',
       color: '#333',
   },
   calloutAddress: {
       fontSize: 14,
       color: '#666',
       textAlign: 'center',
       marginBottom: 4,
       lineHeight: 20,
   },
   calloutDivider: {
       height: 1,
       backgroundColor: '#eee',
       width: '100%',
       marginVertical: 8,
   },
   calloutCoordinates: {
       fontSize: 14,
       color: '#666',
       textAlign: 'center',
       fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',  // Monospace font for coordinates
   },
});