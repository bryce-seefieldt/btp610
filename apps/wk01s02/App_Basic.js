// wk01s02/App.js

// Import required React Native components
// Note: Each UI element must be explicitly imported 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

// Root component function - follows declarative programming principle
// Returns a single root element as required by Native Mobile
export default function App() {
  return (
    // Root container element (<View>) - automatically a flex container
    // Uses reusable styles from StyleSheet.create()
    <View style={styles.container}>
      {/* Basic Text component with no styling */}
      <Text>abcd sdfdsfdsf sdfsdfds</Text>

      {/* Image component with required network image properties
          - Network images must specify height/width
          - Uses inline style object for dimensions */}
      <Image 
        source={{uri:"https://cdn.britannica.com/88/132688-050-E9739DD9/Skyline-Jakarta-Indonesia.jpg"}}
        width={250} 
        height={100}
      />

      {/* Multiple Text components as flex items within the container
          - Will be arranged according to container's flex properties
          - Default flexDirection is "column" in Native Mobile */}
      <Text>abcd sdfdsfdsf sdfsdfds</Text>
      <Text>abcd sdfdsfdsf sdfsdfds</Text>
      <Text>abcd sdfdsfdsf sdfsdfds</Text>
      <Text>abcd sdfdsfdsf sdfsdfds</Text>

      {/* StatusBar component for system status bar customization */}
      <StatusBar style="auto" />
    </View>
  );
}

// StyleSheet object for reusable styles
// Following Native Mobile's structured styling approach
const styles = StyleSheet.create({
  container: {
    // Flex properties for container layout
    flex: 1,  // Takes up all available space
    backgroundColor: '#fff',
    // Flex alignment properties
    alignItems: 'center',      // Centers items horizontally
    justifyContent: 'center',  // Centers items vertically
  },
});
