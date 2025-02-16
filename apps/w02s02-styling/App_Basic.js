// Required component imports 
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (    
    // Root View container - automatically a flex container in Native Mobile
    <View style={styles.container}>
        {/* First row container using inline styles
            - flexDirection:"row" arranges items horizontally
            - width:"100%" ensures full container width
            - Multiple justifyContent values (last one "flex-end" takes precedence)
            - Uses borderWidth/Color for visual debugging */}
        <View style={{flexDirection:"row", 
                      borderWidth:2, 
                      borderColor:"magenta",
                      width:"100%", 
                      paddingVertical:20,
                      justifyContent:"space-evenly",    
                      justifyContent:"flex-end"                                
                      }}>
          {/* Flex items with simple border styling */}
          <Text style={{borderWidth:1}}>Discover</Text>         
          <Text style={{borderWidth:1}}>Quests</Text>         
          <Text style={{borderWidth:1}}>Safety</Text>          
        </View>   

        {/* Second row container
            - Similar structure to first row
            - Uses space-around for automatic spacing
            - Demonstrates alternative justifyContent spacing approach */}
        <View style={{flexDirection:"row", 
                      borderWidth:2, 
                      borderColor:"magenta",
                      width:"100%", 
                      paddingVertical:20,
                      justifyContent:"space-around"                                     
                      }}>
          {/* Identical flex items to first row */}
          <Text style={{borderWidth:1}}>Discover</Text>         
          <Text style={{borderWidth:1}}>Quests</Text>         
          <Text style={{borderWidth:1}}>Safety</Text>          
        </View>           
    </View>
  );
}

// StyleSheet for root container styling
const styles = StyleSheet.create({
  container: {
    // Flex properties for main container
    flex: 1,                    // Takes full available space
    flexDirection:"column",     // Default in Native Mobile, items stack vertically
    backgroundColor: '#fff',
    alignItems: 'center',       // Centers items horizontally
    justifyContent: 'center',   // Centers items vertically
  },  
});
