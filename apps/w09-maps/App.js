import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Platform, StatusBar } from "react-native";
import { useState, useEffect, useRef } from "react"

import MapView, {Marker} from "react-native-maps"

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


// Main App component
export default function App()  {

   // State variable that stores the current visible area of the map
   const [visibleMapRegion, setVisibleMapRegion] = useState(
     {
       latitude: 43.7949433,
       longitude: -79.3529767,
       latitudeDelta: 1,    // large numbers will zoom out, small numbers zoom in
       longitudeDelta:1     // large numbers will zoom out, small numbers zoom in 
     }
   )

 // Reference to the map
 const mapRef = useRef(null)


 const moveMapSomewhere = () => {
   console.log("moving map")

   mapRef.current.animateToRegion(
     {
       latitude: 49.257706,
       longitude: -123.2064761,
       latitudeDelta: 1,
       longitudeDelta:1
     }
   )

   // This does not work, it is just here for your reference to show
   // that it doesn't work

   // setVisibleMapRegion({
   //   latitude: 49.257706,
   //   longitude: -123.2064761,
   //   latitudeDelta: 1,
   //   longitudeDelta:1
   // } )
 }

   return (
       <SafeAreaView style={styles.container}>
           <Text style={styles.headingText}>Map Demo</Text>

           <MapView initialRegion={visibleMapRegion} style={styles.map} ref={mapRef}>
               <Marker
                 coordinate={{latitude:43.6826927, longitude:-79.6904297}}
                 onPress={()=>{
                   alert("You clicked on airports")
                 }}
               />
               <Marker
                 coordinate={{latitude:43.8461025, longitude:-79.6475165}}                
                 title="Bolton, Ontario"
                 description="Somewhere in Bolton"
               />
               <Marker coordinate={{latitude:43.948238, longitude:-79.0435025}}>
                 <View style={{backgroundColor:"yellow", borderWidth:1, borderColor:"black"}}>
                   <Text>ABCD</Text>
                   <Text>DEFGH</Text>
                   <MaterialCommunityIcons name="heart-plus" size={24} color="black" />
                 </View>
               </Marker>                                
              
              
           </MapView>

           <Button title="Move Map Somewhere!" onPress = {moveMapSomewhere}/>

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
   map : {
     borderWidth:1,
     borderColor:"black",     
     height:300,
     width:300,
   }
});