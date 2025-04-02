import { StyleSheet, Text, View, TextInput, Switch, Pressable} from 'react-native';
import {useState} from "react"

// Firebase configuration and required services
import { db } from '../firebaseConfig'
import { collection, addDoc } from "firebase/firestore";

const EntryFormScreen = () => {
   // State management for form inputs
   const [nameFromUI, setNameFromUI] = useState("") // Student name
   const [gpaFromUI, setGPAFromUI] = useState("")   // Student GPA
   const [isPGFromUI, setIsPGFromUI] = useState(true) // Post-graduate status

   /**
    * Handles form submission and Firebase document creation
    * Creates a new student record in the 'students' collection
    */
   const buttonPressed = async () => {
    console.log('EntryForm: Starting form submission process')
    console.log('EntryForm: Form data:', {
      name: nameFromUI,
      gpa: gpaFromUI,
      isPostGrad: isPGFromUI
    })

    // Convert GPA string to number for database storage
    const gpaAsNumber = parseFloat(gpaFromUI)
    console.log('EntryForm: Converted GPA to number:', gpaAsNumber)

    // Prepare student data object for Firebase
    const studentToInsert = {
        name: nameFromUI,
        gpa: gpaAsNumber,
        isPostGrad: isPGFromUI
    }

    try {
        console.log('EntryForm: Attempting to insert document into Firebase')
        // Insert document into Firebase 'students' collection
        const docRef = await addDoc(collection(db, "students"), studentToInsert)
        console.log('EntryForm: Document successfully inserted', {
          documentId: docRef.id,
          collectionPath: 'students',
          insertedData: studentToInsert
        })
        alert("Data inserted, check console for output")
    } catch (err) {
        console.error('EntryForm: Error inserting document:', {
          error: err.message,
          errorCode: err.code,
          stackTrace: err.stack
        })
    }
   }

   // Render form interface
   console.log('EntryForm: Rendering form component')
   return(
   <View style={styles.container}> 
        {/* name tb */}
        <TextInput placeholder="Enter name" onChangeText={setNameFromUI} value={nameFromUI} style={styles.tb}/>
     
        {/* gpa tb */}
        <TextInput placeholder="Enter gpa" keyboardType="numeric" onChangeText={setGPAFromUI} value={gpaFromUI} style={styles.tb}/>
     
        {/* is post graduate student */}
        <Text>Is a post graduate student?</Text>
        <Switch onValueChange={setIsPGFromUI} value={isPGFromUI} style={{alignSelf:"flex-start"}}/>
      
        {/* button */}
        <Pressable onPress={buttonPressed} style={styles.btn}>
            <Text style={styles.btnLabel}>Insert to database</Text>
        </Pressable>
   </View>
)
}
export default EntryFormScreen


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
} 
});
