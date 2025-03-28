// \apps\A3\App.js
import * as Location from "expo-location"
import MapView, {Marker} from "react-native-maps"
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Platform, StatusBar, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react"

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [addressFromUI, setAddressFromUI] = useState("1750 Finch Avenue East, Toronto, ON")
    const [latFromUI, setLatFromUI] = useState("43.7778779")
    const [lngFromUI] = useState("-79.3495249")

    const [fwdGecodeResultsLabel, setFwdGecodeResultsLabel] = useState("reverse geocoding results go here")
    const [reverseGecodeResultsLabel, setReverseGecodeResultsLabel] = useState("reverse geocoding results go here")
    const [currLocationLabel, setCurrLocationLabel] = useState("curr location results here")

    const [visibleMapRegion, setVisibleMapRegion] = useState({
        latitude: 43.7949433,
        longitude: -79.3529767,
        latitudeDelta: 1,
        longitudeDelta: 1
    })

    useEffect(() => {
        requestPermissions()
    }, [])

    const requestPermissions = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const permissionsObject = await Location.requestForegroundPermissionsAsync()
            if (permissionsObject.status === "granted") {
                console.log("Permission granted!");
            } else {
                setError("Location permission denied");
            }
        } catch (err) {
            console.log("ERROR:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }
   



   const doFwdGeocode = async () => {
       console.log("+++ DEBUG: Forward Geocoding")
       try {
           setIsLoading(true);
           setError(null);
           
           // 1. attempt: convert the address to a coordinate
           const geocodedLocation = await Location.geocodeAsync(addressFromUI)

           // 2. get the results
           const results = geocodedLocation[0]
           if (results === undefined) {
               throw new Error("Could not find coordinate");
           }

           console.log("Results found:", results)
           
           // 3. extract the latitude and longitude and show it in the UI
           const output = `Lat: ${results.latitude}, Lng: ${results.longitude}`
           setFwdGecodeResultsLabel(output)
       } catch (err) {
           console.log("ERROR:", err);
           setError(err.message);
           setFwdGecodeResultsLabel("ERROR: " + err.message);
       } finally {
           setIsLoading(false);
       }
   }
  
   const doReverseGeocode = async () => {
       // 1. get the coordinates from the ui
       // build a  object with it
       // Use these property names with these spellings
       // (This is a requirement of the Location.geocode function)

       // Data in a textbox is ALWAYS represented as astring
       // But the location.geocode function needs numbers
       // So you must convert to a number before you can use
       //  it with the Location function
       const coords = {
           latitude:   parseFloat(latFromUI),
           longitude:  parseFloat(lngFromUI)}

       console.log("DEBUG: What is coords?")
       console.log(coords)
       // use the function
       // parameter #2 is always a empty object {}
       const abc = await Location.reverseGeocodeAsync(coords, {})
       const results = abc[0]
       // handle the results
       if (results === undefined) {
           // could not find a matching address
           console.log("ERROR: cannot find coordinate")
           setReverseGecodeResultsLabel("ERROR: Could not find coordinate.")
       }
       // can find address
       console.log("DEBUG: Reverse Geocoding")
       console.log(results)

       // {"city": "Toronto", "country": "Canada", "district": "Don Valley Village", "isoCountryCode": "CA", "name": "34 Leith Hill Rd", "postalCode": "M2J 1Z4", "region": "ON", "street": "Leith Hill Rd", "streetNumber": "34", "subregion": "Toronto", "timezone": "America/Toronto"}

       const output = `
           Address: ${results.name}\n
           City: ${results.city}, ${results.region}\n
           Postal Code: ${results.postalCode}
       `
       setReverseGecodeResultsLabel(output)
   }

   const getCurrLocation = async () => {
       const location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Balanced})

       console.log("DEBUG: Get current location")
       console.log(location)

       // ouptut to the user interface
       // TODO:{"coords": {"accuracy": 5, "altitude": 0, "altitudeAccuracy": -1, "heading": -1, "latitude": 40.354255, "longitude": -3.786621, "speed": -1},
       // "timestamp": 1711031513428.132}

       setCurrLocationLabel(`Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`)


       // 1. create a state variable that stores a marker position
       // 2. when you ge the current location, you update the state variable with the lat/lng
       // 3. Attach the state variable to the <Makrer> element
       // 4. When the state variable updates, the Marker will update

   }

   return (
       <SafeAreaView style={styles.container}>
           {error ? (
               <Text style={styles.errorText}>{error}</Text>
           ) : isLoading ? (
               <ActivityIndicator size="large" />
           ) : (
               <View style={styles.content}>
                   <Text style={styles.headingText}>Geocoding Demo</Text>
                
                   <TextInput
                       style={styles.input}
                       onChangeText={setAddressFromUI}
                       placeholder="Enter address (example: 123 Main Street)"
                       value={addressFromUI}
                   />
                   {/* <Button title="Forward Geocoding" onPress={doFwdGeocode}/>
                   <Text style={styles.text}>{fwdGecodeResultsLabel}</Text>
                   <Button title="Reverse Geocoding" onPress={doReverseGeocode}/>
                   <Text style={styles.text}>{reverseGecodeResultsLabel}</Text> */}
                   <Button title="Get Current Location" onPress={getCurrLocation}/>
                   <Text style={styles.text}>{currLocationLabel}</Text>
                   <MapView initialRegion={visibleMapRegion} style={styles.map}>
                       {/* <Marker
                           coordinate={{latitude:43.6826927, longitude:-79.6904297}}
                           title="Toronto Pearson Airport"
                           description="The busiest airport in canada" 
                     
                       /> */}
                   </MapView>
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
   text: {
       fontSize:18,
       marginVertical:8,
       textAlign:"center"
   },
   headingText: {
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
   map : {
     borderWidth:1,
     borderColor:"black",     
     height:300,
     width:300,
   },
   errorText: {
       color: 'red',
       fontSize: 16,
       textAlign: 'center',
       margin: 10,
   },
});