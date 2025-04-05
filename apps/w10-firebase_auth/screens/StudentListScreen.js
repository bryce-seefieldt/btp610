import { StyleSheet, Text, View, Pressable, TextInput, FlatList, Button} from 'react-native';
import { useState, useEffect } from "react"

// TODO: import the required service from FirebaseConfig.js
import { db } from '../firebaseConfig'

// TODO: import the specific functions from the service
import { collection, query, where, getDocs,  doc, updateDoc, deleteDoc } from "firebase/firestore";

// icon
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default StudentListScreen = () => {

   // state variable for the text box
   const [nameFromUI, setNameFromUI] = useState("")

   // state variable to store students
   const [studentList, setStudentList] = useState([])
     

   // 1. retrieve data from database
   const getData = async (studentName) => {
      
       try {          
           // 2. after retrieving data, save data to a state variable
           const tempArray = []

           // gets all documents from the "students"
           // const querySnapshot = await getDocs( collection(db, "students") )

           // get all documents where the gpa >= 2.5
           //const q = query(collection(db, "students"), where("gpa", ">=", 88));
           // const q = query(collection(db, "students"), where("isPostGrad", "==", true));

           let querySnapshot = undefined
           if (studentName === undefined) {
               // if no value is provided to the parameter, then it will be undefined               
               querySnapshot = await getDocs(collection(db, "students"));
           } else {
               const q = query(collection(db, "students"), where("name", "==", studentName));
               querySnapshot = await getDocs(q);
           }


           querySnapshot.forEach((currDoc) => {
               console.log(`Document id: ${currDoc.id}`)
               console.log("Document data:")
               console.log(currDoc.data())

               // you cannot use the data as is to populate the flatlist
               // create a brand new javascript object that contains the info in the document

               const tempObject = {...currDoc.data(), id: currDoc.id}
               tempArray.push(tempObject)
           })

           setStudentList([...tempArray])


           // 3. when the state variable updates, the list will auto update
       } catch (err) {
           console.log(err)
       }
   }

   // button click handler
   const btnGetStudentsPressed = async () => {
       alert(`Textbox value is: ${nameFromUI}`)
       getData(nameFromUI)
   }
   useEffect(()=>{
       getData()
   },[])

   const updatePressed = async (item) => {
       // JSON.stringify will fix the [object object] output
       console.log("DEBUG: What document was clicked?")
       console.log(item)

       // check what their new post grad status should be
       let updatedStatus = undefined           // undefined = create the variable but do not set an initial value
       if (item.isPostGrad === true) {
           updatedStatus = false
       } else {
           updatedStatus = true
       }

       try {
           // update the corresponding in the db
           await updateDoc(doc(db, "students", item.id), {
               gpa: 4.0, 
               isPostGrad: updatedStatus
           })
           alert("Done!")
           
           // refresh the user interface
           getData()
       } catch (err) {
           console.log(err)
       }
   }
   const deletePressed = async (item) => {
    console.log("DEBUG: What document was clicked?")
    console.log(item)

    try {
        // delete the specified document
        await deleteDoc(doc(db, "students", item.id))
        alert(`${item.name} was deleted`)

        // query the database again, get all documents and show in list
        getData()
    } catch(err) {
        console.log(err)
    }
}

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
                               <Text>Post Grad: {item.isPostGrad ? "Yes" : "No"}</Text>
                               <Button title="Delete" onPress={()=>{deletePressed(item)}}/>
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