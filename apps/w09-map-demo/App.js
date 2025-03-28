import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MapView, {Marker} from "react-native-maps"
import {useState, useRef} from "react"

// List of attractions with coordinates
const attractionsList = [
  {
    name: "Sydney Opera House",
    lat: -33.856159,
    lng: 151.215256
  },
  {
    name: "Great Barrier Reef",
    lat: -18.156290,
    lng: 147.485962
  },
  {
    name: "Uluru-Kata Tjuta National Park",
    lat: -25.344490,
    lng: 131.035431
  },
  {
    name: "Sydney Harbour Bridge",
    lat: -33.832066,
    lng: 151.01121
  },
  {
    name: "Blue Mountains National Park",    
    lat: -33.733333,
    lng: 150.316667
  },
  {
    name: "Cradle Mountain-Lake St. Clair National Park",    
    lat: -41.650000,
    lng: 145.950000
  }
]

// Main App component
export default function App() {

  // State variable for the displayed region of the map
  const [displayedRegion, setDisplayedRegion] = useState({
    latitude: -33.8688,
    longitude: 151.2093,
    latitudeDelta: 50,
    longitudeDelta: 50
  })

  // State variable to keep track of markers on the map
  const [markerList, setMarkersList] = useState([])

  // Reference to the map
  const mapRef = useRef(null)

  // Function to add a marker to the map
  const addMarker = () => {    
    // Randomly pick an attraction from the list
    const pos = Math.floor(Math.random() * (attractionsList.length) + 0)
    const selected = attractionsList[pos]
    
    // Add the selected attraction to the markers list
    markerList.push(selected)
    console.log(markerList)
    setMarkersList([...markerList])

    // Move the map to be centered on the selected attraction
    mapRef.current.animateToRegion({
      latitude: selected.lat,
      longitude: selected.lng,
      latitudeDelta: 1,
      longitudeDelta: 1
    })
  }

  // Function to clear all markers from the map
  const clearMarkers = () => {
    // Clear the markers list
    setMarkersList([])

    // Reset the map view to the initial region
    mapRef.current.animateToRegion({
      latitude: -33.8688,
      longitude: 151.2093,
      latitudeDelta: 50,
      longitudeDelta: 50
    })
  }

  // Function to zoom to a specific location
  const zoomToLocation = () => {
    // Zoom the map to the Sydney Opera House
    mapRef.current.animateToRegion({
      latitude: -33.856159,
      longitude: 151.215256,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Here is a map</Text>
      <Button onPress={addMarker} title="Add Marker"/>
      <Button onPress={clearMarkers} title="Clear Markers"/>
      <Button onPress={zoomToLocation} title="Zoom to Location"/>      
      <MapView
          style={{flex: 1, margin: 20}}          
          initialRegion={displayedRegion}
          ref={mapRef}>

          {
            markerList.map((location, index) => {              
              return (
                <Marker key={index}
                        coordinate={{latitude: location.lat, longitude: location.lng}}>                    
                    <FontAwesome6 name="house-chimney" size={24} color="black"/>                            
                </Marker>
              )
            })
          }

      </MapView>
      
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight + 10
  },
  heading: {
    fontSize: 30,
    textAlign: "center"
  }
});
