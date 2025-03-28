import * as Location from "expo-location"
import MapView, {Marker} from "react-native-maps"

import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Platform, StatusBar } from "react-native";
import { useState, useEffect } from "react"


// Main App component
export default function App()  {

   // State variables for user input and geocoding results
   const [addressFromUI, setAddressFromUI] = useState("1750 Finch Avenue East, Toronto, ON")
   const [latFromUI, setLatFromUI] = useState("43.7778779")
   const [lngFromUI, setLngFromUI] = useState("-79.3495249")
   const [fwdGecodeResultsLabel, setFwdGecodeResultsLabel] = useState("reverse geocoding results go here")
   const [reverseGecodeResultsLabel, setReverseGecodeResultsLabel] = useState("reverse geocoding results go here")
   const [currLocationLabel, setCurrLocationLabel] = useState("curr location results here")

   // State variable to control the visible area of the map
   const [visibleMapRegion, setVisibleMapRegion] = useState({
     latitude: 43.7949433,
     longitude: -79.3529767,
     latitudeDelta: 1,
     longitudeDelta: 1
   })

   // Request permissions when the app loads
   useEffect(() => {
     requestPermissions()
   }, [])

   // Function to request location permissions
   const requestPermissions = async () => {
     try {
       // Request foreground location permissions from the user
       const permissionsObject = await Location.requestForegroundPermissionsAsync()
       if (permissionsObject.status === "granted") {
         alert("Permission granted!")
       } else {
         alert("Permission denied or not provided")
       }
     } catch (err) {
       console.log(err)
     }
   }

   // Function to perform forward geocoding
   const doFwdGeocode = async () => {
     console.log("+++ DEBUG: Forward Geocoding")

     // Convert the address to a coordinate using geocodeAsync
     const geocodedLocation = await Location.geocodeAsync(addressFromUI)

     // Get the results from the geocoding operation
     const results = geocodedLocation[0]
     if (results === undefined) {
       console.log("ERROR: cannot find coordinate")
       setFwdGecodeResultsLabel("ERROR: Could not find coordinate.")
       return
     }
     console.log("Results found:")
     console.log(results)

     // Extract the latitude and longitude and show it in the UI
     const output = `Lat: ${results.latitude}, Lng: ${results.longitude}`
     setFwdGecodeResultsLabel(output)
   }

   // Function to perform reverse geocoding
   const doReverseGeocode = async () => {
     // Get the coordinates from the UI and convert to numbers
     const coords = {
       latitude: parseFloat(latFromUI),
       longitude: parseFloat(lngFromUI)
     }

     console.log("DEBUG: What is coords?")
     console.log(coords)

     // Use the reverse geocoding function to convert coordinates to an address
     const abc = await Location.reverseGeocodeAsync(coords, {})
     const results = abc[0]
     if (results === undefined) {
       console.log("ERROR: cannot find coordinate")
       setReverseGecodeResultsLabel("ERROR: Could not find coordinate.")
     } else {
       console.log("DEBUG: Reverse Geocoding")
       console.log(results)

       // Format the results and update the UI
       const output = `
         Address: ${results.name}\n
         City: ${results.city}, ${results.region}\n
         Postal Code: ${results.postalCode}
       `
       setReverseGecodeResultsLabel(output)
     }
   }

   // Function to get the current location
   const getCurrLocation = async () => {
     // Get the current position of the device with balanced accuracy
     const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced})

     console.log("DEBUG: Get current location")
     console.log(location)

     // Update the UI with the current location coordinates
     setCurrLocationLabel(`Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`)
   }

   return (
     <SafeAreaView style={styles.container}>
       <Text style={styles.headingText}>Geocoding Demo</Text>

       <TextInput
         style={styles.input}
         onChangeText={setAddressFromUI}
         placeholder="Enter address (example: 123 Main Street)"
         value={addressFromUI}
       />
       <Button title="Forward Geocoding" onPress={doFwdGeocode}/>
       <Text style={styles.text}>{fwdGecodeResultsLabel}</Text>

       <View style={{flexDirection: "row", justifyContent: "center"}}>
         <TextInput
           style={styles.input}
           onChangeText={setLatFromUI}
           placeholder="Enter latitude"
           value={latFromUI}
         />
         <TextInput
           style={styles.input}
           onChangeText={setLngFromUI}
           placeholder="Enter longitude"
           value={lngFromUI}
         />
       </View>

       <Button title="Reverse Geocoding" onPress={doReverseGeocode}/>
       <Text style={styles.text}>{reverseGecodeResultsLabel}</Text>

       <Button title="Get Current Location" onPress={getCurrLocation}/>
       <Text style={styles.text}>{currLocationLabel}</Text>

       <MapView initialRegion={visibleMapRegion} style={styles.map}>
         <Marker
           coordinate={{latitude: 43.6826927, longitude: -79.6904297}}
           title="Toronto Pearson Airport"
           description="The busiest airport in Canada"
         />
         <Marker
           coordinate={{latitude: 43.7778779, longitude: -79.3495249}}
           onPress={() => { alert("You clicked on college!") }}
         >
           <View style={{backgroundColor: "yellow", borderWidth: 1, borderColor: "black"}}>
             <Text>ABCD</Text>
             <Text>DEFGH</Text>
           </View>
         </Marker>
       </MapView>
     </SafeAreaView>
   );
}

// Styles for the component
const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff",
     alignItems: "center",
     justifyContent: "center",
     paddingTop: (Platform.OS === "android") ? StatusBar.currentHeight : 0,
   },
   text: {
     fontSize: 18,
     marginVertical: 8,
     textAlign: "center"
   },
   headingText: {
     fontSize: 24,
     marginVertical: 8,
     textAlign: "center",
   },
   input: {
     height: 40,
     margin: 8,
     borderWidth: 1,
     padding: 10,
   },
   map: {
     borderWidth: 1,
     borderColor: "black",
     height: 300,
     width: 300,
   }
});