#BTP610 - Week 9 - Data Persistence


## Install Starter Code

`btp610\apps\w09-firebase-starter`

Install dependencies


npm install

Run application, check that you have screens like this:

## Using GoogleFirebase
Configure your Firebase Project


To configure your firebase project:

- Decide what firebase services do you want to include in your mobile application?
- Answer: Cloud Firestore, and later on Firebase Authentication


After you decide which FB services to use, you have to add it to the project


How to Add Firestore to the Project
In the Project Overview page, click Build > Firestore Database
```powershell
npm install firebase
```

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxA3Jzoy6NsYtnrLjOtW28K-2PML2gb98",
  authDomain: "btp610-w9-data-persistence.firebaseapp.com",
  projectId: "btp610-w9-data-persistence",
  storageBucket: "btp610-w9-data-persistence.firebasestorage.app",
  messagingSenderId: "794778438520",
  appId: "1:794778438520:web:3925e0db725af819e1568d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

```

### Add Firebase Projects and Services to the React Native Project_
1.   Create a file called “firebaseConfig.js”

In the React Native project, create a file called “firebaseConfig.js”
2.   Find your Firebase project configuration information
	THis is from the firebase website
3.   Copy and Paste Firebase Configuration code 

- In the firebaseConfig.js file, copy and paste your Firebase project’s configuration code
- The file should look like this:


Now that your React Native project is configured to connect to your Firebase project, you need to  import,  initialize, and export your required Firebase services (Firestore, FirebaseAuth, Realtime Database, etc) to the rest of your project 

-Documentation: Initializing Firestore service:  
https://firebase.google.com/docs/firestore/quickstart#initialize


4. Add the **Firestore service** to firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
```js
// firebaseConfig.js
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 1. import the firestore service
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyCoraicE8VelLV9ik5X49TeaLqkdeLaLfA",
 authDomain: "week08project-aa167.firebaseapp.com",
 projectId: "week08project-aa167",
 storageBucket: "week08project-aa167.appspot.com",
 messagingSenderId: "484166803174",
 appId: "1:484166803174:web:dc3058aeb68aa23de3a527"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. initialize Firestore service
const db = getFirestore(app)

// 3. export the Firestore service from this js file so other parts of your app can use it
export { db }
```

#### Import the Firebase service on the required screen
On the screen that needs access to the service, import the service from the firebaseConfig.js file

```js
import { db } from '../firebaseConfig'
```


Code Example:  Importing the service on the Entry Screen

The EntryScreen.js file should look something like this:
![alt text](image-11.png)

This completes the process of enabling the screen to access Firestore.
Next, write the code to perform CRUD operations on Firestore (insert, update, delete, read)

#### Inserting a Document into Firestore
To insert a new document, use the addDoc() function:

The addDoc() function will insert a new document and auto-generate a document id.

Documentation: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document

- Notice there are several functions used to insert a document.  Choose the appropriate function for your use case!

Example of the addDoc() function usage:

const someFunction = async () => {
   try {   
       const docRef = await addDoc(collection(db, "students"), {name:"Peter Patel", gpa:2.8, isPostGrad:false})               
   } catch (err) {
       console.log(err)
   }
}

##### Code Demo: Inserting a document

```js
import { StyleSheet, Text, View, TextInput, Switch, Pressable} from 'react-native';
import {useState} from "react"


// TODO: import the required service from FirebaseConfig.js
import { db } from '../firebaseConfig'

// TODO: import the specific functions from the service
import { collection, addDoc } from "firebase/firestore";

const EntryFormScreen = () => {

  // form fields
  const [nameFromUI, setNameFromUI] = useState("")
  const [gpaFromUI, setGPAFromUI] = useState("")
  const [isPGFromUI, setIsPGFromUI] = useState(true)

  const buttonPressed = async () => {
       // convert gpa to number
       const gpaAsNumber = parseFloat(gpaFromUI)


       // DEBUG: show values entered in textbox
       // alert(`Name: ${nameFromUI}, GPA: ${gpaAsNumber}, IsPG? ${isPGFromUI}`)

       // create object literal that represents a document you want to insert into your collection
       const studentToInsert = {
           name: nameFromUI,
           gpa: gpaAsNumber,
           isPostGrad: isPGFromUI
       }


       // insert into database
       try {
           // this code inserts into the "students" collecction
           // addDoc() will return you a copy of the document that was inserted
           const docRef = await addDoc(collection(db, "students"), studentToInsert)
           alert("Data inserted, check console for output")
           console.log(`Id of inserted document is: ${docRef.id}`)
       } catch (err) {
           console.log(err)
       }

  }


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

```



Result:

- Enter the student details

![alt text](image-12.png)
 
-	In the React Native (VSCode) Terminal, the code will output the id of the newly inserted document


 ```sh
 LOG  Id of inserted document is: aGej9PvL0QRmvxG8firE
 ```
- In the web console, look for the document you inserted

![alt text](image-13.png)

FirebaseError: MIssing or insufficient permissions
●	If your terminal shows this error:
![alt text](image-14.png)

●	It can be fixed by adjusting the “Rules” section of your Cloud Firestore console.

●	In the “Rules” section, check for the false keyword
![alt text](image-15.png)

●	Change the false keyword to true
●	Then press PUBLISH

![alt text](image-16.png)

●	After the changes are saved, try inserting into the database again



 
Retrieve All Documents________________________________________

Use the getDocs() function to retrieve all documents from a collection

●	Documentation: https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection


Required Imports:

import { collection, getDocs } from "firebase/firestore"


Code Example:
```js
try {
   // Retrieve all documents from a collection called "students"
   // getDocs() returns a Query Snapshot object   
   const querySnapshot = await getDocs(collection(db, "students"))
  
   // The QuerySnapshot object contains the documents retrieved from the collection
   // Use a forEach() loop to iterate through the documents and output relevant information
   querySnapshot.forEach((currDoc) => {
       console.log(`Document id: ${currDoc.id}`)
       console.log("Document data:")
      console.log(currDoc.data())
   })
} catch (err) {
   console.log(err)
}


 
Code Example:
import { StyleSheet, Text, View, Pressable, TextInput, FlatList} from 'react-native';
import { useState } from "react"


// TODO: import the required service from FirebaseConfig.js
import { db } from '../firebaseConfig'
// TODO: import the specific functions from the service
import { collection, getDocs } from "firebase/firestore"

export default StudentListScreen = () => {

   // state variable for the text box
   const [nameFromUI, setNameFromUI] = useState("")

   // state variable to store students
   const [studentList, setStudentList] = useState([
       {name:"Peter Smith", gpa:3.0, tuitionPaid:true, id:"psmith"},
       {name:"Emily Patel", gpa:4.0, tuitionPaid:true, id:"epatel"},
       {name:"Suzy Lee", gpa:2.5, tuitionPaid:false, id:"slee"},
   ])
     

   // button click handler
   const btnGetStudentsPressed = async () => {
       alert(`Textbox value is: ${nameFromUI}`)

       // 1. retrieve data from database
       try {          
           // 2. after retrieving data, save data to a state variable
           const querySnapshot = await getDocs( collection(db, "students") )
           querySnapshot.forEach((currDoc) => {
               console.log(`Document id: ${currDoc.id}`)
               console.log("Document data:")
               console.log(currDoc.data())
           })
       
           // 3. when the state variable updates, the list will auto update
       } catch (err) {
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
```
Result

![alt text](image-17.png)


### Full code
```js
import { StyleSheet, Text, View, Pressable, TextInput, FlatList} from 'react-native';
import { useState, useEffect } from "react"

// TODO: import the required service from FirebaseConfig.js
import { db } from '../firebaseConfig'

// TODO: import the specific functions from the service
import { collection, query, where, getDocs,  doc, updateDoc } from "firebase/firestore";

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
       // JSON.stinrigy wil fix the [object object] output
       alert(item.id)
       // update the corresponding in the db
       await updateDoc(doc(db, "students", item.id), {gpa: -25.555})

       // refresh the user interface
       getData()
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

 
