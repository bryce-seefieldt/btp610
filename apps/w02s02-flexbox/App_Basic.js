import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    //flex container > flex container > 4 flex items
     <View style={styles.container}>
  {/* total number of flex items is 4 */}
      <View>
        <Text>Apple</Text>         
        <Text>Banana</Text>
        <Text>Carrot</Text>
        <Text>Carrot</Text>
      </View>   

      <View style={{flexDirection:"row"}}>
         {/* total number of flex items is 2 */}
         <Text>Toronto</Text>
         <Text>Montreal</Text>
       </View>


     </View>   


  );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection:"column-reverse",
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
   borderWidth:10,
   borderColor:"yellow",
 },
});