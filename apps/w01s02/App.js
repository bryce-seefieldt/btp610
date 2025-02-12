import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (

    <View style={styles.container}>
      <Text>abcd sdfdsfdsf sdfsdfds</Text>
      <Image 
        source={{uri:"https://cdn.britannica.com/88/132688-050-E9739DD9/Skyline-Jakarta-Indonesia.jpg"}}
        width={250} 
        height={100}
      />


      <Text>abcd sdfdsfdsf sdfsdfds</Text>
      <Text>abcd sdfdsfdsf sdfsdfds</Text>
      <Text>abcd sdfdsfdsf sdfsdfds</Text>
      <Text>abcd sdfdsfdsf sdfsdfds</Text>
      <StatusBar style="auto" />
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
});
