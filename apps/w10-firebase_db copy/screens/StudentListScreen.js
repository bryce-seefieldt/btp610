import { StyleSheet, Text, View, Pressable, TextInput, FlatList} from 'react-native';
import { useState, useEffect } from "react"

// TODO: import the required service from FirebaseConfig.js
import { db } from '../firebaseConfig'

// TODO: import the specific functions from the service
import { collection, query, where, getDocs,  doc, updateDoc } from "firebase/firestore";

// icon
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// Screen component for displaying and managing student records
export default StudentListScreen = () => {
   // State management
   const [nameFromUI, setNameFromUI] = useState("") // Search query
   const [studentList, setStudentList] = useState([]) // Student records
     
   /**
    * Retrieves student data from Firebase based on optional name filter
    * @param {string} studentName - Optional name to filter results
    */
   const getData = async (studentName) => {
       console.log('StudentList: Initiating data fetch', {
         searchName: studentName,
         isFilteredSearch: studentName !== undefined
       })

       try {          
           const tempArray = []
           let querySnapshot = undefined

           // Execute appropriate query based on search parameters
           if (studentName === undefined) {
               console.log('StudentList: Fetching all students')
               // Fetch all students if no name provided
               querySnapshot = await getDocs(collection(db, "students"));
           } else {
               console.log('StudentList: Fetching filtered students', {
                 filterName: studentName
               })
               // Filter students by name if provided
               const q = query(collection(db, "students"), where("name", "==", studentName));
               querySnapshot = await getDocs(q);
           }

           console.log('StudentList: Processing query results', {
             resultCount: querySnapshot.size
           })

           // Process query results
           querySnapshot.forEach((currDoc) => {
               // Create new object with document data and ID
               const tempObject = {...currDoc.data(), id: currDoc.id}
               console.log('StudentList: Processing document', {
                 documentId: currDoc.id,
                 documentData: tempObject
               })
               tempArray.push(tempObject)
           })

           console.log('StudentList: Updating state with fetched data', {
             recordCount: tempArray.length
           })
           // Update state with retrieved data
           setStudentList([...tempArray])
       } catch (err) {
           console.error('StudentList: Error fetching data:', {
             error: err.message,
             errorCode: err.code,
             stackTrace: err.stack
           })
       }
   }

   /**
    * Handles search button press
    * Initiates search based on current name input
    */
   const btnGetStudentsPressed = async () => {
       console.log('StudentList: Search button pressed', {
         searchQuery: nameFromUI
       })
       alert(`Textbox value is: ${nameFromUI}`)
       getData(nameFromUI)
   }

   /**
    * Load initial data on component mount
    */
   useEffect(()=>{
       console.log('StudentList: Component mounted, fetching initial data')
       getData()
   },[])

   /**
    * Handles student record updates
    * @param {Object} item - Student record to update
    */
   const updatePressed = async (item) => {
       console.log('StudentList: Update initiated for student', {
         studentId: item.id,
         currentData: item
       })
       alert(item.id)
       
       try {
           console.log('StudentList: Attempting to update student GPA')
           // Update student GPA (currently hardcoded)
           await updateDoc(doc(db, "students", item.id), {gpa: -25.555})
           console.log('StudentList: Successfully updated student GPA', {
             studentId: item.id,
             newGPA: -25.555
           })
           // Refresh display
           getData()
       } catch (err) {
           console.error('StudentList: Error updating student:', {
             error: err.message,
             errorCode: err.code,
             stackTrace: err.stack
           })
       }
   }

   // Render list interface
   console.log('StudentList: Rendering component', {
     currentStudentCount: studentList.length
   })
   return(
       <View style={styles.container}> 
          <TextInput placeholder="Enter name" onChangeText={setNameFromUI} text={nameFromUI} style={styles.tb}/>
          <Pressable style={styles.btn} onPress={btnGetStudentsPressed}>
               <Text style={styles.btnLabel}>Get from Database</Text>
          </Pressable>
         
          <Text style={styles.text}>Class List</Text>
          <FlatList
            data={studentList}
            keyExtractor={(item)=>{ return item.id }}
            renderItem={
                    ({item})=>{
                        return(
                            <View>
                                <Text>Name: {item.name}</Text>
                                <Text>GPA: {item.gpa}</Text>
                                <Pressable onPress={()=>{updatePressed(item)}}>
                                    <FontAwesome5 name="edit" size={24} color="black" />
                                </Pressable>
                            </View>
                        )
                    }
                } 
            ItemSeparatorComponent={
                ()=>{
                  return(
                    <View style={{borderWidth:1, borderColor:"#ccc", marginVertical:4}}></View>
                  )
                }
              }

            />
      </View>

   )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
    padding:20,
  },
  tb: {
      width:"100%",  
      borderRadius:5,
      backgroundColor:"#efefef",
      color:"#333",
      fontWeight:"bold",
      paddingHorizontal:10,
      paddingVertical:15,
      marginVertical:10,      
  },
  btn: {
      borderWidth:1,
      borderColor:"#141D21",
      borderRadius:8,
      paddingVertical:16,
      marginVertical:20
  },
  btnLabel: {
      fontSize:16,
      textAlign:"center"
  },
  text: {
   fontSize:20,
   textAlign:"center",
   marginVertical:8,
  }
 
});
