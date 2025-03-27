import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

/**
 * FLEXBOX LAYOUT: flexDirection
 * 
 * flexDirection is a fundamental property in React Native's Flexbox layout system that determines
 * the primary axis along which items are placed in a container.
 * 
 * flexDirection can have four values:
 * - row: Items are placed horizontally from left to right (default in web)
 * - row-reverse: Items are placed horizontally from right to left
 * - column: Items are placed vertically from top to bottom (default in React Native)
 * - column-reverse: Items are placed vertically from bottom to top
 * 
 * The primary axis (determined by flexDirection) affects how justifyContent works:
 * - When flexDirection is "row", justifyContent aligns items horizontally
 * - When flexDirection is "column", justifyContent aligns items vertically
 * 
 * The secondary/cross axis is perpendicular to the main axis and controlled by alignItems.
 */

/**
 * This application demonstrates fundamental React Native layout concepts using Flexbox.
 * It displays three rows of colored text boxes, each showing a different horizontal alignment
 * using the justifyContent property while maintaining the same flexDirection.
 */
export default function App() {
return (
   <ScrollView style={styles.container}> 
   {/*Section 1*/}   
      <TouchableOpacity 
        style={styles.innerContainerA}
        onPress={() => console.log("Section 1: Basic Inline Styles clicked!")}
      >  
      <Text style={styles.sectionTitle}>1: Basic Inline Styles</Text>
      {/* 
        * Row 1: justifyContent="flex-end"
        * This aligns all child elements to the right side of the container.
        * The flexDirection="row" places items horizontally from left to right.
        * With flex-end, all items are pushed to the end of the available space.
        */}
      <View style={{flexDirection:"row", justifyContent:"flex-end", borderWidth:1, marginVertical:10}}>       
        <Text style={{backgroundColor:"#12CBC4", height:50, width:50, fontSize:20, margin:8}}>One</Text>
        <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
        <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
      </View>

      {/* 
        * Row 2: justifyContent="center"
        * This centers the child elements horizontally within the container.
        * While maintaining flexDirection="row", all items are positioned with equal
        * space on the left and right sides of the group.
        */}
      <View style={{flexDirection:"row", justifyContent:"center", borderWidth:1, marginVertical:10}}>
        <Text style={{backgroundColor:"#12CBC4", height:50, width:50, fontSize:20, margin:8}}>One</Text>
        <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
        <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
      </View>

      {/* 
        * Row 3: justifyContent="flex-start"
        * This aligns child elements to the left side of the container.
        * This is actually the default behavior if justifyContent wasn't specified.
        * With flexDirection="row", items start from the beginning of the container.
        */}
      <View style={{flexDirection:"row", justifyContent:"flex-start", borderWidth:1, marginVertical:10}}>
        <Text style={{backgroundColor:"#12CBC4", height:50, width:50, fontSize:20, margin:8}}>One</Text>
        <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
        <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
      </View>
    </TouchableOpacity>
    
    {/*Section 2: Creating a reusable style for the blue box*/}
    <TouchableOpacity 
      style={styles.innerContainerB}
      onPress={() => console.log("Section 2: Reusable Box Style clicked!")}
    >    
      <Text style={styles.sectionTitle}>2: Reusable Box Style</Text>
      {/* 
       * This section demonstrates the use of a reusable style component.
       * Instead of repeating the same inline style for each "One" text box,
       * we've created a reusable 'blueBox' style in the StyleSheet.
       * Benefits:
       * - Improved code readability
       * - Centralized styling that can be updated in one place
       * - Reduced code duplication
       * - Better performance as StyleSheet styles are optimized by React Native
       */}    
      <View style={{flexDirection:"row", justifyContent:"flex-end", borderWidth:1, marginVertical:10}}>       
        <Text style={styles.blueBox}>One</Text>
        <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
        <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
      </View>
      <View style={{flexDirection:"row", justifyContent:"center", borderWidth:1, marginVertical:10}}>
        <Text style={styles.blueBox}>One</Text>
        <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
        <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
      </View>
      <View style={{flexDirection:"row", justifyContent:"flex-start", borderWidth:1, marginVertical:10}}>
        <Text style={styles.blueBox}>One</Text>
        <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
        <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
      </View>
    </TouchableOpacity>

    {/*Section 3: Combining reusable and inline styles*/}
    <TouchableOpacity 
      style={styles.innerContainerC}
      onPress={() => console.log("Section 3: Combined Styles with Array Notation clicked!")}
    >    
      <Text style={styles.sectionTitle}>3: Combined Styles with Array Notation</Text>
      {/* 
       * This section demonstrates the combination of reusable styles with inline styles.
       * We're now using two StyleSheet components:
       * 1. 'blueBox' for the first text element in each row
       * 2. 'myRow' for the container View styling
       * 
       * The array notation style={[styles.myRow, {justifyContent:"flex-end"}]} allows us to:
       * - Apply the consistent row styling from myRow (flexDirection, border, margin)
       * - Override or add specific properties with inline styles (justifyContent)
       * 
       * This approach offers the perfect balance between reusability and flexibility,
       * making the code more maintainable while preserving the ability to customize
       * individual instances.
       */}    
     <View style={[styles.myRow, {justifyContent:"flex-end"}]}>       
       <Text style={styles.blueBox}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
    
     <View style={[styles.myRow, {justifyContent:"center"}]}>             
       <Text style={styles.blueBox}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
    
     <View style={[styles.myRow, {justifyContent:"flex-start"}]}>
       <Text style={styles.blueBox}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
    </TouchableOpacity>

    {/*Section 4: Fully Abstracted Styles with Inheritance*/}
    <TouchableOpacity 
      style={styles.innerContainerD}
      onPress={() => console.log("Section 4: Fully Abstracted Styles with Inheritance clicked!")}
    >    
    <Text style={styles.sectionTitle}>4: Fully Abstracted Styles with Inheritance</Text>
    
    {/* 
     * This section demonstrates the highest level of style abstraction and reusability.
     * We've extracted all repeating style properties into StyleSheet components:
     * 1. 'blueBox' for the first text element (fully defined style)
     * 2. 'box' for the base style of boxes (height, width, fontSize, margin, border)
     * 3. 'myRow' for the container View styling
     * 
     * The array notation allows for style inheritance and specific overrides:
     * - style={[styles.box, {backgroundColor:"#D980FA"}]} inherits all 'box' properties
     *   but adds/overrides the backgroundColor property
     * 
     * This approach creates the most maintainable and DRY (Don't Repeat Yourself) code,
     * with maximum reusability while preserving the flexibility to customize
     * individual instances as needed.
     */}

     <View style={[styles.myRow, {justifyContent:"flex-end"}]}>       
       <Text style={styles.blueBox}>One</Text>
       <Text style={[styles.box, {backgroundColor:"#D980FA"}]}>Two</Text>     
       <Text style={[styles.box, {backgroundColor:"#F79F1F"}]}>Three</Text>     
     </View>
    
     <View style={[styles.myRow, {justifyContent:"center"}]}>             
       <Text style={styles.blueBox}>One</Text>
       <Text style={[styles.box, {backgroundColor:"#D980FA"}]}>Two</Text>  
       <Text style={[styles.box, {backgroundColor:"#F79F1F"}]}>Three</Text>     
     </View>
    
     <View style={[styles.myRow, {justifyContent:"flex-start"}]}>
       <Text style={styles.blueBox}>One</Text>
       <Text style={[styles.box, {backgroundColor:"#D980FA"}]}>Two</Text>  
       <Text style={[styles.box, {backgroundColor:"#F79F1F"}]}>Three</Text>     
     </View>
    </TouchableOpacity>

  </ScrollView>
  
);
}

/**
 * App Styling
 * The container has specific margins and borders to better visualize the layout effects.
 * - marginTop:60 - Provides space from the top of the screen (avoiding status bar)
 * - marginHorizontal:10 - Creates space on left and right sides
 * - borderWidth and borderColor - Visually indicates the container boundaries
 */
const styles = StyleSheet.create({
container: {
  marginTop:60,
  marginHorizontal:10,
  borderWidth:1,
  borderColor:"blue",
},
innerContainerA: {
  marginBottom: 20,
  borderBottomWidth: 2,
  borderBottomColor: "#ccc",
  paddingBottom: 10,
}, // Section 1: Basic inline styles container
innerContainerB: {
  marginBottom: 20,
  borderBottomWidth: 2,
  borderBottomColor: "#ccc",
  paddingBottom: 10,
}, // Section 2: Reusable box style container
innerContainerC: {
  marginBottom: 20,
  paddingBottom: 10,
}, // Section 3: Combined styles container
innerContainerD: {
  marginBottom: 20,
  borderBottomWidth: 2,
  borderBottomColor: "#ccc",
  paddingBottom: 10,
}, // Section 4: Fully abstracted styles container
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginVertical: 10,
  backgroundColor: '#f0f0f0',
  padding: 8,
  borderRadius: 5,
}, // Title style for each section
blueBox: {
  backgroundColor:"lightblue",
  height:50,
  width:50,
  fontSize:20,
  margin:8
 }, // Blue box style used for the "One" text elements
 myRow: {
  flexDirection:"row",
  borderWidth:10,
  marginVertical:10
 }, // Common row container style with horizontal layout
 box: {
  borderWidth:5,
  borderColor:"green",
  height:50,
  width:50,
  fontSize:20,
  margin:8
 } // Base box style with green border used for text elements
});