import { StyleSheet, Text, View } from 'react-native';

// Main App component
export default function App() {

  // 1. Create a function to get API data
  // The function is marked as async because it uses await
  const getData = async () => {
    console.log('getData() function called');
    
    // a. Connect to the API endpoint and get the response
    // fetch() is used to make the API call, and await ensures it runs in the background
    console.log("calling API using fetch()");
    const response = await fetch('https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873');
    
    // Check if the response is successful
    if (response.ok) {
      console.log("RESPONSE:");
      console.log(`Response is "${typeof response}" type:`);
      console.log(response);
      
      // b. Convert the response into a JavaScript data structure
      // .json() converts the response to a JS object
      console.log("convert the JSON response into a JSdata structure");
      const data = await response.json();
      console.log(`Data is "${typeof data}" type:`);
      console.log(data);

      // c. Display the data in the app
      // For React Native, data can be shown in a FlatList or console
      console.log(`data.status: ${data.status}`);
      console.log(`data.results.golden_hour: ${data.results.golden_hour}`);
      console.log(`data.results.date: ${data.results.date}`);
      console.log(`data.results.sunrise: ${data.results.sunrise}`);
      console.log(`data.results.sunset: ${data.results.sunset}`);
    } else {
      // Log an error if the response is not successful
      console.log("ERROR:");
      console.log(response.status);
    }
  };
  
  // 2. Use the function in your program
  console.log('STARTING API DEMO');
  getData();
}