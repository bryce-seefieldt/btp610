import { StyleSheet, Text, View } from 'react-native';


export default function App() {

// 1. create a function that get the API data
// we need async() because our function code uses an await somehwhere
// the rule of using await is that the function must use an async
const getData = async () => {
  console.log('getData() function called');
  // a. Connect to the api endpoint and get the response
  // You must have the fetch() execute as a background task
  // In JS: await forces the operation to execute in the background
  console.log("calling API using fetch()");
  const response = await fetch('https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873');
  if (response.ok) {
    console.log("RESPONSE:");
    console.log(`Response is "${typeof response}" type:`);
    console.log(response);
 
  // b. Convert the response into a Javascript data structure
  // - array of javascript objects (https://jsonplaceholder.typicode.com/users)
  // - single javascript object.   (https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873)
    console.log("convert the JSON response into a JSdata structure");
    const data = await response.json();
    console.log(`Data is "${typeof data}" type:`);
    console.log(data);
    // .json() has automatically converted the api to an JS object

    // c. do something with the (display it in your app)
    // - web app, then show it in the console.error
    // -react native, then show it in a FlatList in your ui
    console.log(`data.status: ${data.status}`);
    console.log(`data.results.golden_hour: ${data.results.golden_hour}`);
    console.log(`data.results.date: ${data.results.date}`);
    console.log(`data.results.sunrise: ${data.results.sunrise}`);
    console.log(`data.results.sunset: ${data.results.sunset}`);


  } else {
    console.log("ERROR:");
    console.log(response.status);
  }
  
 };
 
 // 2. use the function in your program
 console.log('STARTING API DEMO');
 getData();

}