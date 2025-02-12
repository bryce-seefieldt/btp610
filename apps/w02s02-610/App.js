import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (    
    <View style={styles.container}>
        <View style={{flexDirection:"row", 
                      borderWidth:2, 
                      borderColor:"magenta",
                      width:"100%", 
                      paddingVertical:20,
                      justifyContent:"space-evenly",    
                      justifyContent:"flex-end"                                
                      }}>
          <Text style={{borderWidth:1}}>Discover</Text>         
          <Text style={{borderWidth:1}}>Quests</Text>         
          <Text style={{borderWidth:1}}>Safety</Text>          
        </View>   
        <View style={{flexDirection:"row", 
                      borderWidth:2, 
                      borderColor:"magenta",
                      width:"100%", 
                      paddingVertical:20,
                      justifyContent:"space-around"                                     
                      }}>
          <Text style={{borderWidth:1}}>Discover</Text>         
          <Text style={{borderWidth:1}}>Quests</Text>         
          <Text style={{borderWidth:1}}>Safety</Text>          
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
