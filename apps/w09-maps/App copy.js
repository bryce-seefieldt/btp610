import * as Location from "expo-location"

import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Platform, StatusBar } from "react-native";
import { useState, useEffect } from "react"


export default function App()  {

   const [addressFromUI, setAddressFromUI] = useState("1750 Finch Avenue East, Toronto, ON")
 
   // Starbucks Vancouver: 2505 Granville St, Vancouver, BC V6H 3G7
   const [latFromUI, setLatFromUI] = useState("43.7778779")
   const [lngFromUI, setLngFromUI] = useState("-79.3495249")

   const [fwdGecodeResultsLabel, setFwdGecodeResultsLabel] = useState("reverse geocoding results go here")
   const [reverseGecodeResultsLabel, setReverseGecodeResultsLabel] = useState("reverse geocoding results go here")
   const [currLocationLabel, setCurrLocationLabel] = useState("curr location results here")


   // use this funciton when the app loads
   useEffect(()=>{
       requestPermissions()
   },[])


   // dd a function to ask for permissions
   const requestPermissions = async () => {
       try {          
          const permissionsObject = 
              await Location.requestForegroundPermissionsAsync()
          if (permissionsObject.status  === "granted") {
              alert("Permission granted!")              
          } else {
              alert("Permission denied or not provided")              
          }
       } catch (err) {
          console.log(err)
       }
    }
   



   const doFwdGeocode = async () => {
       console.log("+++ DEBUG: Foward Geocoding")

       // 1. attempt: convert the address to a coordinate
       const geocodedLocation = await Location.geocodeAsync(addressFromUI)

       // 2. get the results
       const results = geocodedLocation[0]
       // --- 2a. results = undefined       
       if (results === undefined) {
           // could not find a matching coordinate
           // addressFromUI = "BLAH BLAH BLAH XHSYD 2343423"
           console.log("ERROR: cannot find coordinate")
           setFwdGecodeResultsLabel("ERROR: Could not find coordinate.")
           // stop and do not proceed with any other logic
           return
       }
       // --- 2b. results contains something
       console.log("Results found:")
       console.log(results)
       // {"accuracy": 100, "altitude": 0, "latitude": 43.7957894, "longitude": -79.3489909}

       // 3. extract the latitude and longitude and show it in the UI
       const output = `Lat: ${results.latitude}, Lng: ${results.longitude}`
       setFwdGecodeResultsLabel(output)
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

        // output to the user interface

        // TODO:{"coords": {"accuracy": 5, "altitude": 0, "altitudeAccuracy": -1, "heading": -1, "latitude": 40.354255, "longitude": -3.786621, "speed": -1},
        // "timestamp": 1711031513428.132}

         setCurrLocationLabel(`Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude} , accuracy: ${location.coords.accuracy}`)
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

           <View style={{flexDirection:"row", justifyContent:"center"}}>
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

       </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff",
     alignItems: "center",
     justifyContent: "center",
     paddingTop: (Platform.OS === "android") ? StatusBar.currentHeight : 0,     
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
   },   
   map : {
     borderWidth:1,
     borderColor:"black",     
     height:300,
   }
});