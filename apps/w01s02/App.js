// wk01s02/App.js

// Import required React Native components
// Note: Each UI element must be explicitly imported 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';

// Root component function - follows declarative programming principle
// Returns a single root element as required by Native Mobile
export default function App() {
  return (
    // SafeAreaView added as root container to handle iOS notch
    <SafeAreaView style={styles.container}>
      {/* Main content container with flex column layout */}
      <View style={styles.contentContainer}>
        
        {/* Text group container with spacing */}
        <View style={styles.textGroup}>
          <Text style={styles.headerText}>Welcome to the App</Text>
          <Text style={styles.bodyText}>This is a description text with proper styling</Text>
        </View>

        {/* Image container with improved image handling */}
        <View style={styles.imageContainer}>
          <Image 
            source={{uri:"https://cdn.britannica.com/88/132688-050-E9739DD9/Skyline-Jakarta-Indonesia.jpg"}}
            style={styles.image}
            resizeMode="contain"  // Added for better image scaling
          />
        </View>

        {/* List container using gap for consistent spacing */}
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>First item</Text>
          <Text style={styles.listItem}>Second item</Text>
          <Text style={styles.listItem}>Third item</Text>
          <Text style={styles.listItem}>Fourth item</Text>
        </View>

      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// Enhanced StyleSheet with structured, reusable styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // New content container for main layout
  contentContainer: {
    flex: 1,
    padding: 20,
    gap: 20, // Adds consistent vertical spacing between child elements
  },
  // Styles for text group
  textGroup: {
    gap: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bodyText: {
    fontSize: 16,
    color: '#666',
  },
  // Improved image container and styling
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  // List styling with consistent spacing
  listContainer: {
    gap: 15,
    paddingVertical: 10,
  },
  listItem: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
});
