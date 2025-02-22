#BBTP610; Week 7, Session 1  

## Nested Navigators

### What is a nested navigator?

- The app implements more than one navigation pattern
- Example:  A stack inside a tab
- Example:  A tab inside a stack


### Use today’s starter code:
- Unzip the code
- Open the project in VSCode
- Open a Terminal
- Run: `npm install`
- Run the project:
    - At home:  `npx expo start`            
    - At college:  `npx expo start –tunnel`

    
![alt text](image.png)

### Example: Embedding a Stack within a Tab


1.	In the App.js, create a custom component that contains a Stack Navigator

```js
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>         
       <Stack.Screen name="First Screen" component={Screen1} />
       <Stack.Screen name="Second Screen" component={Screen2} />
   </Stack.Navigator>
 )
}


2.	In the Tab navigator, add the custom component created in #1


export default function App() {

 return (
   <NavigationContainer>
     <Tab.Navigator>         
         <Tab.Screen name="Account Settings" component={AccountSettingsScreen} />
         <Tab.Screen name="My Home Page" component={HomeScreen} />
         <Tab.Screen name="ABC" component={StackContainerComponent}/>
     </Tab.Navigator>
   </NavigationContainer>
 );

}


 

Full Code: Screen1.js

import { StyleSheet, Text, View, Button } from 'react-native';

const Screen1 = ({navigation}) => {

   const btnPressed = () => {
       navigation.navigate("Second Screen")
   }
  return(
     <View style={styles.container}>
        <Text style={styles.text}>
         Here is the Screen1
        </Text>
        <Button title="Go to next screen" onPress={btnPressed}/>
     </View>
  )
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     justifyContent:"center",
     alignItems:"center",
  },
  text:{
   fontSize:20,
  }
});


export default Screen1
```
---

### Full code: App.js

```js
// App.js
import { StyleSheet, Text, View } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>        
       <Stack.Screen name="First Screen" component={Screen1} />
       <Stack.Screen name="Second Screen" component={Screen2} />
   </Stack.Navigator>
 )
}

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator initialRouteName="Account Settings">
       <Tab.Screen name="My Home Page" component={HomeScreen} />
       <Tab.Screen name="Demo" component={StackContainerComponent} />
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})
```
---

###     Screen options review:

```js
import { StyleSheet, Text, View } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator
     screenOptions={() => ({          
       headerTintColor:"magenta",
       headerStyle:{backgroundColor:"yellow"}
       })}
   >        
       <Stack.Screen name="First Screen" component={Screen1} />
       <Stack.Screen name="Second Screen" component={Screen2} />
   </Stack.Navigator>
 )
}

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator
        screenOptions={() => ({          
         headerTintColor:"white",
         headerStyle:{backgroundColor:"black"}
       })}
     >
       <Tab.Screen name="My Home Page" component={HomeScreen} />
       <Tab.Screen name="Demo" component={StackContainerComponent} />
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})

 
Controlling the header on individual screens:

import { StyleSheet, Text, View } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>        
       <Stack.Screen
         name="First Screen"
         component={Screen1}
         options={() => ({          
           headerTintColor:"black",
           headerStyle:{backgroundColor:"#FC427B"}
           })}
       />
       <Stack.Screen
         name="Second Screen"
         component={Screen2}
         options={() => ({          
           headerTintColor:"magenta",
           headerStyle:{backgroundColor:"yellow"}
           })}
       />
   </Stack.Navigator>
 )
}

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator
        screenOptions={() => ({          
         headerTintColor:"white",
         headerStyle:{backgroundColor:"black"}
       })}
     >
       <Tab.Screen name="My Home Page" component={HomeScreen} />
       <Tab.Screen name="Demo" component={StackContainerComponent} />
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})
```
---

### How to remove the double header on the Demo Screen

```js
import { StyleSheet, Text, View } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>        
       <Stack.Screen
         name="First Screen"
         component={Screen1}
         options={() => ({          
           headerTintColor:"black",
           headerStyle:{backgroundColor:"#FC427B"}
           })}
       />
       <Stack.Screen
         name="Second Screen"
         component={Screen2}
         options={() => ({          
           headerTintColor:"magenta",
           headerStyle:{backgroundColor:"yellow"}
           })}
       />
   </Stack.Navigator>
 )
}

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator
        screenOptions={() => ({          
         headerTintColor:"white",
         headerStyle:{backgroundColor:"black"}
       })}
     >
       <Tab.Screen name="My Home Page" component={HomeScreen} />
       <Tab.Screen name="Demo"
         component={StackContainerComponent}
         options={() => ({         
           headerShown:false
           })}/>
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})
```
---

### Configuring a header within the Screen component


1. Import use effect

```js
import {useEffect} from "react"
```

2. Add a useEffect() to the screen that triggers on the navigation prop

```js
// this function will execute when the navigation variable changes (updates)
useEffect(()=>{},[navigation])
```

3.  Inside the `useEffect()`, add the `navigation.setOptions({})`

This function is used to set the properties of the screen’s header:

```js
useEffect(()=>{
     navigation.setOptions({
         
     })
  },[navigation])
```

4. Add the properties you want to modify

Relevant properties include:
- title			→ Update the displayed title of the screen
- headerStyle		→ Sets the background color of the header bar
- headerTintColor	→ Set the text color of the screen title in the header bar
- headerShown	→ Shows or hides the header (set to true/false)
- headerRight		→  Adds user interface elements to the right side of the header bar
- headerLeft		→ Adds user interface elements to the left side of the header bar

For example:

```js
// set navigation options for this screen
  useEffect(()=>{
     navigation.setOptions({
         headerRight: () => (
           <Button onPress={btnPressed} title="Go!!" />
         ),
        title:"My Home Page!"
       })
  },[navigation])
```


     
### Full code: Screen1.js

```js
// Screen1.js
import { StyleSheet, Text, View, Button } from 'react-native';
import {useEffect} from "react"


const Screen1 = ({navigation}) => {
   // this function will execute when the navigation variable changes (updates)
  useEffect(()=>{
     // add the configuration for your header inside here
     navigation.setOptions({
        title:"My Custom Title",
        headerTintColor:"orange",
        headerRight: () => (
           <Button onPress={btnPressed} title="Go!!" />
         ),
  
     })
  },[navigation])



  const btnPressed = () => {
       navigation.navigate("Second Screen")
  }
  return(
     <View style={styles.container}>
        <Text style={styles.text}>
         Here is the Screen1
        </Text>
        <Button title="Go to next screen" onPress={btnPressed}/>
     </View>
  )
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     justifyContent:"center",
     alignItems:"center",
  },
  text:{
   fontSize:20,
  }
});


export default Screen1  
```
---

### Example: Adding an additional button to the header

```js
import { StyleSheet, Text, View, Button } from 'react-native';
import {useEffect, useState} from "react"


const Screen1 = ({navigation}) => {
   const [resultLabel, setResultLabel] = useState()


  // this function will execute when the navigation variable changes (updates)
  useEffect(()=>{
     // add the configuration for your header inside here
     navigation.setOptions({
        title:"My Custom Title",
        headerTintColor:"orange",
        headerRight: () => (
           <View style={styles.row}>
              <Button onPress={btnPressed} title="Go!!" />
              <Button onPress={generateNumber} title="Random" />
           </View>
         ),
     })
  },[navigation])


  const generateNumber = () => {
     const random = Math.floor(Math.random() * (100 - 50 + 1) + 50)     
     setResultLabel(random)
  }

  const btnPressed = () => {
       navigation.navigate("Second Screen")
  }
  return(
     <View style={styles.container}>
        <Text style={styles.text}>
         Here is the Screen1
        </Text>
        <Text style={styles.text}>
         {resultLabel}
        </Text>
        <Button title="Go to next screen" onPress={btnPressed}/>
     </View>
  )
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     justifyContent:"center",
     alignItems:"center",
  },
  text:{
   fontSize:20,
  },
  row : {
     flexDirection:"row"
  }
});


export default Screen1
```
---

### Example: Putting an icon in the top bar

Choose an icon here: https://icons.expo.fyi/Index

```js
import { StyleSheet, Text, View, Button } from 'react-native';
import {useEffect, useState} from "react"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const Screen1 = ({navigation}) => {
   const [resultLabel, setResultLabel] = useState()


  // this function will execute when the navigation variable changes (updates)
  useEffect(()=>{
     // add the configuration for your header inside here
     navigation.setOptions({
        title:"My Custom Title",
        headerTintColor:"orange",
        headerRight: () => (
           <View style={styles.row}>
              <Button onPress={btnPressed} title="Go" />
              <Button onPress={generateNumber} title="Random" />
              <FontAwesome5 name="search" size={24} color="black" />
           </View>
         ),
     })
  },[navigation])


  const generateNumber = () => {
     const random = Math.floor(Math.random() * (100 - 50 + 1) + 50)     
     setResultLabel(random)
  }

  const btnPressed = () => {
       navigation.navigate("Second Screen")
  }
  return(
     <View style={styles.container}>
        <Text style={styles.text}>
         Here is the Screen1
        </Text>
        <Text style={styles.text}>
         {resultLabel}
        </Text>
        <Button title="Go to next screen" onPress={btnPressed}/>
     </View>
  )
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     justifyContent:"center",
     alignItems:"center",
  },
  text:{
   fontSize:20,
  },
  row : {
     flexDirection:"row",
     alignItems:"center",
  }
});


export default Screen1
```
---

### Customizing the Tab Bar Icons

1.	Choose icons from here:   

`https://icons.expo.fyi/Index`


2.	Add the screenOptions property to the Tab.Navigator. Set the property to a function with an object parameter.

`<Tab.Navigator screenOptions={()=>({})}>`   

3.	Add the route prop:

`<Tab.Navigator screenOptions={()=>({route})}>   

![alt text](image-1.png)


4.	Set the tabBarIcon property:

```js
import { StyleSheet, Text, View } from "react-native";

import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";

const Tab = createBottomTabNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator screenOptions={({ route })=>({
       tabBarIcon:({ focused, color, size }) => {
         if (route.name == "Home") {
           return(
               <Feather name="home" size={24} color="magenta" />
           )
         } else if (route.name == "Detail") {
           return(
             <MaterialCommunityIcons name="account-details" size={24} color="black" />
           )
         }
       }
     })}>     
       <Tab.Screen name="Home" component={HomeScreen} />
       <Tab.Screen name="Detail" component={DetailScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
});

```
---

### Example: Add icons to your tab 

```js

import { StyleSheet, Text, View } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>        
       <Stack.Screen
         name="First Screen"
         component={Screen1}         
       />
       <Stack.Screen
         name="Second Screen"
         component={Screen2}
         options={() => ({          
           headerTintColor:"magenta",
           headerStyle:{backgroundColor:"yellow"}           
           })}
       />
   </Stack.Navigator>
 )
}

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator
        screenOptions={({route}) => ({          
         headerTintColor:"white",
         headerStyle:{backgroundColor:"black"},
         tabBarIcon: ({focused, color, size})=> {
           // your if statement goes here
           if (route.name === "My Home Page") {
             return (
               <FontAwesome name="home" size={24} color="black" />
             )
           } else if (route.name === "Demo") {
             return (
               <MaterialIcons name="goat" size={24} color="black" />
             )
           } else if (route.name === "Account Settings") {
             return (
               <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" />
             )
           }
         }

       })}
     >
       <Tab.Screen name="My Home Page" component={HomeScreen} />
       <Tab.Screen name="Demo"
         component={StackContainerComponent}
         options={() => ({         
           headerShown:false
           })}/>
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})
```
---

### Example: UPdating the badge when a button is clicked        

![alt text](image-2.png)
```js

import { StyleSheet, Text, View, Button } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

import {useState} from "react"


// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>        
       <Stack.Screen
         name="First Screen"
         component={Screen1}         
       />
       <Stack.Screen
         name="Second Screen"
         component={Screen2}
         options={() => ({          
           headerTintColor:"magenta",
           headerStyle:{backgroundColor:"yellow"}           
           })}
       />
   </Stack.Navigator>
 )
}

export default function App() {


 const [num, setNum] = useState(2)

 const testGenerator = () => {
   const random = Math.floor(Math.random() * (100 - 50 + 1) + 50)     
   setNum(random)
}


 return (
   <NavigationContainer>
     <Tab.Navigator
        screenOptions={({route}) => ({          
        
         tabBarIcon: ({focused, color, size})=> {
           // your if statement goes here
           if (route.name === "My Home Page") {
             return (
               <FontAwesome name="home" size={24} color="black" />
             )
           } else if (route.name === "Demo") {
             return (
               <MaterialIcons name="goat" size={24} color="black" />
             )
           } else if (route.name === "Account Settings") {
             return (
               <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" />
             )
           }
         }

       })}
     >
       <Tab.Screen
         name="My Home Page"
         component={HomeScreen}
         options={() => ({         
           tabBarBadge:num,
           headerRight:()=>{
             return <Button onPress={testGenerator} title="Click!"/>
           }
          })}/>
       <Tab.Screen name="Demo"
         component={StackContainerComponent}
         options={() => ({         
           headerShown:false
           })}/>
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})
```
---

    
    




