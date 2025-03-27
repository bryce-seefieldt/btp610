import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={{height:"100%", justifyContent:"space-between"}}>
      <Text style={{fontSize:28, textAlign:"center"}}>SkillUp</Text>
       <Text style={{fontSize:60, textAlign:"center"}}>Choose from 2100 courses</Text>
       <Text style={{fontSize:28, textAlign:"center"}}>Find us at SkillUp.com</Text>
      </View>
    </View>
  );
 }
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6A2E8",
    borderWidth:10,
    borderColor:"magenta", 
    padding:20
  },
 });