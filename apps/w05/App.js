import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Button, 
  Pressable 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  // Data source array of objects (ref: lines 14-21)
  // Each object includes a unique identifier (ref: lines 24-35)
  const studentList = [
    {name: "Peter Smith", gpa: 3.0, tuitionPaid: true, userid: "psmith"},
    {name: "Emily Patel", gpa: 4.0, tuitionPaid: true, userid: "epatel"},
    {name: "Suzy Lee", gpa: 2.5, tuitionPaid: false, userid: "slee"},
    {name: "Peter Diaz", gpa: 2.5, tuitionPaid: false, userid: "pdiaz"},
    {name: "John Doe", gpa: 3.8, tuitionPaid: true, userid: "jdoe"},
  ];

  // Click handler for row items (ref: lines 493-498)
  const handleRowPress = (student) => {
    alert(`Student: ${student.name}\nGPA: ${student.gpa}\nTuition Paid: ${student.tuitionPaid}`);
  };

  // Click handler for buttons (ref: lines 542-548)
  const handleButtonPress = (student) => {
    alert(`${student.name} is ${student.gpa >= 3.5 ? '' : 'not '}on the Dean's List`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student List</Text>

      {/* FlatList implementation (ref: lines 51-62) */}
      <FlatList
        style={styles.list}
        data={studentList}
        // Specify unique key (ref: lines 45-47)
        keyExtractor={(item) => item.userid}
        // Add separator between items (ref: lines 482-489)
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        // Render each row (ref: lines 567-576)
        renderItem={({item, index}) => (
          <Pressable onPress={() => handleRowPress(item)}>
            <View style={styles.rowItem}>
              <View style={styles.studentInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>GPA: {item.gpa}</Text>
                
                {/* Conditional rendering using logical AND (ref: lines 303-306) */}
                {item.gpa >= 3.5 && (
                  <Text style={styles.honors}>Dean's List</Text>
                )}
              </View>

              <View style={styles.rightContent}>
                {/* Conditional icon rendering using ternary (ref: lines 273-280) */}
                {item.tuitionPaid ? (
                  <AntDesign name="checkcircle" size={24} color="green" />
                ) : (
                  <AntDesign name="exclamationcircleo" size={24} color="red" />
                )}
                <Button 
                  title="Details"
                  onPress={() => handleButtonPress(item)}
                />
              </View>
            </View>
          </Pressable>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

// Styles (ref: lines 397-410)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  studentInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  honors: {
    color: 'green',
    fontStyle: 'italic',
    marginTop: 5,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
