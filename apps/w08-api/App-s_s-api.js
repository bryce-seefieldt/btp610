import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

// Main App component
export default function App() {
  // State to store API data
  const [apiData, setApiData] = useState(null);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // Function to fetch data from the API
  const getData = async () => {
    try {
      // Fetch data from the API
      const response = await fetch('https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873');
      const data = await response.json();
      console.log(data);
      // Store the data in state
      setApiData(data);
    } catch (error) {
      // Log any errors
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sunrise/Sunset API Demo</Text>
      {apiData ? (
        <View>
          <Text style={styles.text}>Status: {apiData.status}</Text>
          <Text style={styles.text}>Golden Hour: {apiData.results.golden_hour}</Text>
          <Text style={styles.text}>Date: {apiData.results.date}</Text>
          <Text style={styles.text}>Sunrise: {apiData.results.sunrise}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});
