import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch('https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873');
      const data = await response.json();
      console.log(data);
      setApiData(data);
    } catch (error) {
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
