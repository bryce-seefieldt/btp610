//apps/w02s02-flexbox/App.js

import { StyleSheet, Text, View } from 'react-native';
/*
Space between each flex items:
By default, there is no space between each flex item. The space can be controlled using the properties:

gap → sets the space to a fixed amount
justifyContent: space-between | space-around | space-evenly → automatically calculates the space between each flex item → the spacing is responsive (so if screen size changes, then space adjusts)
OR
stifyContent: flex-start | center | flex-end → the flex items are aligned to the start, center, or end of the container
*/
export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{flexDirection:"row",
                     gap:10,
                     borderWidth:1,
                     borderColor:"magenta",
                     width:"100%",
                     justifyContent:'center',
                     paddingVertical:20}}>
         <Text style={{borderWidth:1}}>Apple</Text>        
         <Text style={{borderWidth:1}}>Banana</Text>        
         <Text style={{borderWidth:1}}>Carrot</Text>        
       </View>
       <View style={{flexDirection:"column",
                     gap:10,
                     borderWidth:1,
                     borderColor:"magenta",
                     width:"100%",
                     justifyContent:'start',
                     paddingVertical:20}}>
         <Text style={{borderWidth:1}}>other text</Text>        
         <Text style={{borderWidth:1}}>other text</Text>        
         <Text style={{borderWidth:1}}>other text</Text>        
       </View>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection:"column",
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',   
 }, 
});
