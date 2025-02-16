// Required component imports 
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (    
    // Root View container - automatically a flex container in Native Mobile
    <View style={styles.container}>
        {/* First row container - now using StyleSheet styles
            - Removed duplicate justifyContent
            - Added gap for consistent spacing
            - Using reusable styles for better maintainability */}
        <View style={styles.rowContainer}>
          {/* Text items now use consistent styling from StyleSheet */}
          <Text style={styles.menuItem}>Discover</Text>         
          <Text style={styles.menuItem}>Quests</Text>         
          <Text style={styles.menuItem}>Safety</Text>          
        </View>   

        {/* Second row container - also using StyleSheet styles
            - Maintains consistent styling with first row
            - Uses space-around via StyleSheet */}
        <View style={[styles.rowContainer, styles.spaceAround]}>
          <Text style={styles.menuItem}>Wanto</Text>         
          <Text style={styles.menuItem}>Goto</Text>         
          <Text style={styles.menuItem}>There</Text>          
        </View>           
    </View>
  );
}

// Enhanced StyleSheet with all styles moved from inline
const styles = StyleSheet.create({
  container: {
    // Flex properties for main container
    flex: 1,                    // Takes full available space
    flexDirection:"column",     // Default in Native Mobile, items stack vertically
    backgroundColor: '#fff',
    alignItems: 'center',       // Centers items horizontally
    justifyContent: 'center',   // Centers items vertically
  },  
  // New reusable row container style
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: "magenta",
    gap: 20, // Added gap for consistent spacing
    justifyContent: "flex-end" // Default alignment
  },
  // Separate style for space-around variant
  spaceAround: {
    justifyContent: "space-around"
  },
  // Enhanced menu item styling
  menuItem: {
    borderWidth: 1,
    padding: 10, // Added padding for better touch targets
    borderRadius: 4, // Added rounded corners
    fontSize: 16, // Added consistent font size
    color: '#333', // Added text color
    backgroundColor: '#f5f5f5', // Added background color
  }
});
