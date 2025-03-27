// HomeScreen.js - Landing page with navigation to demo sections
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import { useEffect } from 'react';

const HomeScreen = ({ navigation }) => {
  // MOUNTING lifecycle demonstration (btp610/notes/wk06s02-lifecycle.md lines 157-158)
  useEffect(() => {
    console.log("HomeScreen MOUNTING");
    
    // Configure navigation options programmatically (btp610/notes/wk07s01-nested_navigators.md lines 401-411)
    navigation.setOptions({
      title: "BTP610 Demo App",
      headerTintColor: "#2196F3",
    });
    
    // UNMOUNTING lifecycle cleanup (btp610/notes/wk06s02-lifecycle.md lines 163-166)
    return () => {
      console.log("HomeScreen UNMOUNTING");
    };
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native Concept Demos</Text>
        <Text style={styles.subtitle}>BTP610 Comprehensive Application</Text>
      </View>
      
      <View style={styles.cardContainer}>
        {/* Navigation buttons to different demo screens */}
        {/* Each button uses the navigation.navigate() method as shown in btp610/notes/wk06s01-Multicreen_Apps.md lines 174-186 */}
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Styling Demo</Text>
          <Text style={styles.cardDescription}>
            Demonstrates text styling, colors, borders, and conditional styling techniques.
          </Text>
          <Button 
            title="View Demo" 
            onPress={() => navigation.navigate('Styling Demo')}
            color="#2196F3"
          />
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Flexbox Layout</Text>
          <Text style={styles.cardDescription}>
            Shows flexbox container properties, direction, alignment, and item styling.
          </Text>
          <Button 
            title="View Demo" 
            onPress={() => navigation.navigate('Flexbox Layout')}
            color="#4CAF50"
          />
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Input</Text>
          <Text style={styles.cardDescription}>
            Demonstrates TextInput, Button, Switch, and other interactive components.
          </Text>
          <Button 
            title="View Demo" 
            onPress={() => navigation.navigate('User Input')}
            color="#FF9800"
          />
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>FlatList Demo</Text>
          <Text style={styles.cardDescription}>
            Shows how to render lists of data with proper optimization.
          </Text>
          <Button 
            title="View Demo" 
            onPress={() => navigation.navigate('FlatList Demo')}
            color="#9C27B0"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  cardContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
});

export default HomeScreen; 