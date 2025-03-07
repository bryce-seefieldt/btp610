# WK5 FlatList Implementation Guide

Here's a step-by-step breakdown of the FlatList implementation in App.js:

1. **Initial Setup and Imports**
   - Import required components from react-native
   - Import AntDesign icons for visual indicators
   - Setup basic app structure with container View

2. **Data Source Creation**
   ```javascript
   const studentList = [
     {name: "Peter Smith", gpa: 3.0, tuitionPaid: true, userid: "psmith"},
     // ... more students
   ];
   ```
   - Array of objects representing student data
   - Each object has a unique 'userid' for FlatList key extraction
   - Includes properties for name, GPA, and tuition status

3. **Event Handlers**
   ```javascript
   const handleRowPress = (student) => {
     alert(`Student: ${student.name}\nGPA: ${student.gpa}`);
   };
   const handleButtonPress = (student) => {
     alert(`${student.name} is ${student.gpa >= 3.5 ? '' : 'not '}on the Dean's List`);
   };
   ```
   - Row press handler shows student details
   - Button press handler shows Dean's List status

4. **FlatList Configuration**
   ```javascript
   <FlatList
     style={styles.list}
     data={studentList}
     keyExtractor={(item) => item.userid}
     ItemSeparatorComponent={() => <View style={styles.separator} />}
     renderItem={({item, index}) => (
       // Row content
     )}
   />
   ```
   - Set data source
   - Define key extraction method
   - Add visual separators between items
   - Custom row rendering

5. **Row Item Structure**
   ```javascript
   <Pressable onPress={() => handleRowPress(item)}>
     <View style={styles.rowItem}>
       <View style={styles.studentInfo}>
         // Student information
       </View>
       <View style={styles.rightContent}>
         // Status icon and button
       </View>
     </View>
   </Pressable>
   ```
   - Wrapped in Pressable for touch handling
   - Two-column layout using flexbox
   - Left side shows student info
   - Right side shows status and actions

6. **Conditional Rendering**
   ```javascript
   {item.gpa >= 3.5 && (
     <Text style={styles.honors}>Dean's List</Text>
   )}
   {item.tuitionPaid ? (
     <AntDesign name="checkcircle" size={24} color="green" />
   ) : (
     <AntDesign name="exclamationcircleo" size={24} color="red" />
   )}
   ```
   - Dean's List status using logical AND
   - Tuition status using ternary operator
   - Different icons based on payment status

7. **Styling Implementation**
   ```javascript
   const styles = StyleSheet.create({
     container: { /* ... */ },
     list: { /* ... */ },
     rowItem: { /* ... */ },
     // ... more styles
   });
   ```
   - Container layout with padding and flex
   - List styling with borders
   - Row layout using flexDirection: 'row'
   - Custom styles for text and separators

8. **Visual Feedback**
   - Green checkmark for paid tuition
   - Red exclamation for unpaid tuition
   - Italic green text for Dean's List
   - Visual separators between rows
   - Consistent spacing and alignment

This implementation demonstrates:
- Proper data structure organization
- Efficient list rendering with FlatList
- Touch interaction handling
- Conditional UI elements
- Visual status indicators
- Clean and organized styling
- Proper component hierarchy
