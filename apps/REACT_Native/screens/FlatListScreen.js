// FlatListScreen.js - Demonstrates FlatList component and data handling
import { StyleSheet, Text, View, FlatList, Image, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';

const FlatListScreen = ({ navigation, route }) => {
  // Check for params passed from other screens (btp610/notes/wk06s01-Multicreen_Apps.md lines 518-525)
  useEffect(() => {
    if (route.params) {
      console.log("Received params:", route.params);
      // You could display this information or use it to modify the screen
    }
  }, [route.params]);
  
  // MOUNTING lifecycle (btp610/notes/wk06s02-lifecycle.md lines 157-158)
  useEffect(() => {
    console.log("FlatListScreen MOUNTING");
    return () => {
      console.log("FlatListScreen UNMOUNTING");
    };
  }, []);

  // Student data for the FlatList (btp610/notes/wk05-Flatlist_component.md lines 21-26)
  const [studentList, setStudentList] = useState([
    {id: '1', name: "Peter", gpa: 3.0, tuitionPaid: true, avatar: "https://randomuser.me/api/portraits/men/1.jpg"},
    {id: '2', name: "Emily", gpa: 4.0, tuitionPaid: true, avatar: "https://randomuser.me/api/portraits/women/2.jpg"},
    {id: '3', name: "Suzy", gpa: 2.5, tuitionPaid: false, avatar: "https://randomuser.me/api/portraits/women/3.jpg"},
    {id: '4', name: "Marco", gpa: 3.2, tuitionPaid: false, avatar: "https://randomuser.me/api/portraits/men/4.jpg"},
    {id: '5', name: "Jasmine", gpa: 3.8, tuitionPaid: true, avatar: "https://randomuser.me/api/portraits/women/5.jpg"},
    {id: '6', name: "Carlos", gpa: 3.5, tuitionPaid: true, avatar: "https://randomuser.me/api/portraits/men/6.jpg"},
    {id: '7', name: "Tina", gpa: 2.7, tuitionPaid: false, avatar: "https://randomuser.me/api/portraits/women/7.jpg"},
    {id: '8', name: "David", gpa: 3.9, tuitionPaid: true, avatar: "https://randomuser.me/api/portraits/men/8.jpg"},
  ]);
  
  // Delete student handler (btp610/notes/wk05-Flatlist_component.md)
  const deleteStudent = (id) => {
    // Show confirmation dialog
    Alert.alert(
      "Delete Student",
      "Are you sure you want to remove this student?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => {
            // Filter out the student with the given id
            const updatedList = studentList.filter(student => student.id !== id);
            setStudentList(updatedList);
          },
          style: "destructive"
        }
      ]
    );
  };
  
  // Item separator component for FlatList (btp610/notes/wk05-Flatlist_component.md lines 265-271)
  const ItemSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };
  
  // Render item for the FlatList (btp610/notes/wk05-Flatlist_component.md lines 124-137)
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.listItem}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        </View>
        
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.name}</Text>
          <View style={styles.detailsRow}>
            <Text style={item.gpa >= 3.5 ? styles.honorGPA : styles.regularGPA}>
              GPA: {item.gpa}
            </Text>
            <Text style={item.tuitionPaid ? styles.paid : styles.unpaid}>
              {item.tuitionPaid ? "Paid" : "Unpaid"}
            </Text>
          </View>
        </View>
        
        <Pressable 
          style={styles.deleteButton}
          onPress={() => deleteStudent(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Show params data if available */}
      {route.params && (
        <View style={styles.paramsContainer}>
          <Text style={styles.paramsText}>
            Navigated from: {route.params.from} at {route.params.timestamp}
          </Text>
        </View>
      )}
      
      <Text style={styles.title}>Student List</Text>
      <Text style={styles.subtitle}>Showing {studentList.length} students</Text>
      
      {/* FlatList implementation (btp610/notes/wk05-Flatlist_component.md) */}
      <FlatList
        data={studentList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No students available</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  paramsContainer: {
    backgroundColor: '#fff8e1',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  paramsText: {
    fontSize: 14,
    color: '#ff9800',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  listContent: {
    flexGrow: 1,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  honorGPA: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  regularGPA: {
    color: '#2196f3',
  },
  paid: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  unpaid: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
    marginTop: 32,
  },
});

export default FlatListScreen; 