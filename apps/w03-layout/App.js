import { StyleSheet, Text, View, Image} from 'react-native';

export default function App() {
 return (
   <View style={[styles.container, {justifyContent:"center", alignItems:"center", gap:10}]}>
     <Image
       source={require("./assets/shape01.png")}
       style={{width:200, height:200, borderRadius:85, borderWidth:10, borderColor:"magenta"}}
     />
     <Text style={{fontSize:40, fontWeight:"bold"}}>Welcome</Text>
     <Text style={{fontSize:20, fontStyle:"italic"}}>We are so glad you are here</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff200",
   borderWidth:10,
   borderColor:"magenta",    
   marginTop:60,
 },
 centered: {
   // textAlign:"center"
 }
});