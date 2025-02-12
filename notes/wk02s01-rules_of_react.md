# BTP610: Wk2S01
# Rules of REACT

- React is a declarative framework used to create user interfaces

- User interface elements are called a component
- A component can be composed of other component
    -  Components can be basic/individual user interface elements (text, image, button)
    -  Components can be composed of other things (navbar, menu, form)
    -  Components can represent an entire page or a screen

- A component is represented in code as a function
- The function return the user interface elements that make up the component

- A function can only return 1 user interface element
![alt text](./images/wk2/imageA.png)


- If you need to have more than 1 element on your page/screen/component, then your function must return an appropriate container element

	Inside that container element, you put your other components


- In react native, there is only 1 container element to use:  
`<View></View>`
 
## Rules of React Native
- React Native consists of a library of built-in components:
    -  View
    -  Text
    -  Image
    -  ImageBackground
    -  Button
    -  Pressable
    -  Switch
    -  TextInput

To use an element:
1.	Import the element
2.	Use the element in the function’s return statement
 
### Example:
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <Text style={{fontSize:30}}>Hello</Text>
     <Text style={{fontSize:20}}>Hello</Text>     
     <Text style={{fontSize:50}}>Hello</Text> 
     <Text style={{fontSize:20, fontWeight:"bold"}}>Hello - bold</Text>     
     <Text style={{fontSize:20, fontStyle:"italic"}}>Hello - italic</Text>  
     <Text style={{fontSize:20, textDecorationLine:"underline"}}>Hello - underline</Text>     
     <Text style={{fontSize:20, color:"blue"}}>Hello - blue</Text>
     <Text style={{fontSize:20, color:"#00FF00"}}>Hello - blue in hex</Text>  
     <Text style={{fontSize:20, backgroundColor:"yellow"}}>Hello - yellow</Text>     
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
```
 
### Example: Border
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <Text style={{fontSize:30}}>Hello</Text>
     <Text style={{fontSize:20}}>Hello</Text>     
     <Text style={{fontSize:50}}>Hello</Text> 
     <Text style={{fontSize:20, fontWeight:"bold"}}>Hello - bold</Text>     
     <Text style={{fontSize:20, fontStyle:"italic"}}>Hello - italic</Text>  
     <Text style={{fontSize:20, textDecorationLine:"underline"}}>Hello - underline</Text>     
     <Text style={{fontSize:20, color:"blue"}}>Hello - blue</Text>
     <Text style={{fontSize:20, color:"#00FF00"}}>Hello - blue in hex</Text>  
     <Text style={{fontSize:20, backgroundColor:"yellow"}}>Hello - yellow</Text> 

     {/* border */}
     <Text style={{fontSize:20, borderWidth:1}}>Hello - border 1</Text> 
     <Text style={{fontSize:20, borderWidth:5}}>Hello - border 5</Text> 
     <Text style={{fontSize:20, borderWidth:5, borderColor:"magenta"}}>
       Hello - border 5 with magenta
     </Text>
     <Text style={{fontSize:20, borderWidth:5, borderColor:"blue", borderStyle:"dashed"}}>
       Hello - border 5 with magenta
     </Text> 

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
```
 
### Example: Padding
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <Text style={{fontSize:30}}>Hello</Text>
     <Text style={{fontSize:20}}>Hello</Text>     
     <Text style={{fontSize:50}}>Hello</Text> 
     <Text style={{fontSize:20, fontWeight:"bold"}}>Hello - bold</Text>     
     <Text style={{fontSize:20, fontStyle:"italic"}}>Hello - italic</Text>  
     <Text style={{fontSize:20, textDecorationLine:"underline"}}>Hello - underline</Text>     
     <Text style={{fontSize:20, color:"blue"}}>Hello - blue</Text>
     <Text style={{fontSize:20, color:"#00FF00"}}>Hello - blue in hex</Text>  
     <Text style={{fontSize:20, backgroundColor:"yellow"}}>Hello - yellow</Text> 

     {/* border */}
     <Text style={{fontSize:20, borderWidth:1}}>Hello - border 1</Text> 
     <Text style={{fontSize:20, borderWidth:5}}>Hello - border 5</Text> 
     <Text style={{fontSize:20, borderWidth:5, borderColor:"magenta"}}>
       Hello - border 5 with magenta
     </Text>
     <Text style={{fontSize:20, borderWidth:5, borderColor:"blue", borderStyle:"dashed"}}>
       Hello - border 5 with magenta
     </Text> 

     {/* margin / padding */}

     <Text style={{fontSize:20, borderWidth:1, padding:20}}>
       Hello - padding
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, paddingTop:20}}>
       Hello - padding
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, paddingBottom:20}}>
       Hello - padding
     </Text>
     <Text style={{fontSize:20, borderWidth:1, paddingLeft:20}}>
       Hello - padding
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, paddingRight:20}}>
       Hello - padding
     </Text>
     <Text style={{fontSize:20, borderWidth:1, paddingLeft:20, paddingRight:20}}>
       Hello - padding
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, paddingHorizontal:20}}>
       Hello - padding
     </Text>
     <Text style={{fontSize:20, borderWidth:1, paddingVertical:20}}>
       Hello - padding
     </Text> 
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
```
 
### Example: Margin
```js 
<Text style={{fontSize:20, borderWidth:1}}>
       Hello - regular
     </Text> 
    
     <Text style={{fontSize:20, borderWidth:1, marginTop:40, marginBottom:40}}>
       Hello - margin to, margin btoom
     </Text> 

     <Text style={{fontSize:20, borderWidth:1, marginLeft:40}}>
       Hello sdfsdfsdfsdfsdfsdjdjfk jskdf;jsdfkl sjdfkl sd;klfj jsdklfj skldfjsdfdsf
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, marginRight:40}}>
       Hello sdfsdfsdfsdfsdfsdjdjfk jskdf;jsdfkl sjdfkl sd;klfj jsdklfj skldfjsdfdsf
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, marginVertical:40}}>
       margin vertical
     </Text>

     <Text style={{fontSize:20, borderWidth:1, marginHorizontal:40}}>
       margin horizontal margin horizontal margin horizontal margin horizontal margin horizontal margin horizontal margin horizontal margin horizontal
     </Text>

     <Text style={{fontSize:20, borderWidth:1, margin:60}}>
      margin on all 4 sides margin on all 4 sides margin on all 4 sides margin on all 4 sides margin on all 4 sides margin on all 4 sides margin on all 4 sides margin on all 4 sides
     </Text>
```
#### Result:
![alt text](./images/wk2/image-1A.png)


## Layout Styling Properties

Layout is the process of arranging elements on the screen in a desired position.

In React Native, elements can be arranged the following directions:

- Row:  		Arranges a group of elements horizontally
- Column:		Arranges a group of elements vertically.

We use the concept of CSS Flex to arrange elements

In CSS Flex:
1.	Create a container									(flex-container)
2.	In the container (View), add items you want to arrange			(flex-items)
3.	On the container, use flexbox properties to control the layout of the items:

- flexDirection
- gap
- justifyContent
    -  flex-start | center | flex-end
    -  space-between | space-around | space-evenly
- alignItems
    -  flex-start | center | flex-end
    -  space-between | space-around | space-evenly
 
### Starter:
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <Text style={{borderWidth:1, fontSize:20}}>Apple</Text>
     <Text style={{borderWidth:1, fontSize:20}}>Banana</Text>
     <Text style={{borderWidth:1, fontSize:20}}>Carrot</Text>
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
```

### Example:
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>

     <Text style={{borderWidth:1, fontSize:20}}>List of Fruits</Text>

     <View style={{borderWidth:5, borderColor:"magenta", flexDirection:"row"}}>
       <Text style={{borderWidth:1, fontSize:20}}>Apple</Text>
       <Text style={{borderWidth:1, fontSize:20}}>Banana</Text>
       <Text style={{borderWidth:1, fontSize:20}}>Carrot</Text>
     </View>

     <Text style={{borderWidth:1, fontSize:20}}>Donut</Text>
     <Text style={{borderWidth:1, fontSize:20}}>Eggplant</Text>
     <Text style={{borderWidth:1, fontSize:20}}>Fish</Text>
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

```
 