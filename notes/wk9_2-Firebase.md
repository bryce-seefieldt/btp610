**Working with Data Persistence**


# Starter Code and Expected Output

Download the starter code:

<img src="images/media9_2/image16.png"
style="width:3.60417in;height:1.06699in" />

Install dependencies

npm install

Run application, check that you have screens like this:

| Screen 1 | Screen 2 |
|----|----|
| <img src="images/media9_2/image41.png"
style="width:3.89583in;height:3.55208in" /> | <img src="images/media9_2/image19.png"
style="width:3.94792in;height:4.14583in" /> |

Familiarize yourself with the starter code:

- Individual screen UI is in the screens/ folder

<img src="images/media9_2/image23.png"
style="width:2.39583in;height:3.22917in" />

- Screens are connected with a Stack Navigator

<img src="images/media9_2/image44.png"
style="width:7.01563in;height:5.29942in" />

- Header button is implemented in App.js, on line 19 and 23

<img src="images/media9_2/image22.png"
style="width:7.05729in;height:5.12379in" />

# Today: Data Persistence 

- Today, we will explore how to persist data to cloud-based storage

- Your database will either be stored locally on the device; or in a
  cloud somewhere

- A modern mobile app is often “one” representation of an application

- To access an “app”, users may use a “mobile” version, “web” version,
  or “desktop” version

- When data is stored in the cloud, it can be retrieved and used
  anywhere, regardless of what *type* of app the user is using.

# Cloud-Based Database System

There are many cloud based services available on the Internet that you
can use to enable cloud-based data persistence in your app.

The database will either be a:

- Cloud based SQL (relational) database; or,

<!-- -->

- Cloud based NoSQL database

Most large, enterprise-grade app (Bank, Amazon, Netflix) use both

- Certain of the application use SQL

- Certain parts of the app with use NoSQL

# Process for Including a Cloud Service in Your App

1.  Signup for the cloud service & configure your project IN THE cloud

2.  Configure your React Native application to communicate with the
    cloud-based service (project in the cloud)

# Introduction to Firebase Firestore

In the course, we will use Firebase Firestore, a cloud-based no-SQL
database provided by Google.

Firebase is a collection of service that make it easy to include common
tasks in your mobile application.

Examples of firebase services include:

- No-SQL database

- Web hosting

- Cloud-based file hosting

- Easy integration of machine learning

- Serverless functions

- App analytics

- Crash reporting

- Etc.

See here for a full list of services:

[<u>https://firebase.google.com/products-build</u>](https://firebase.google.com/products-build)

# Firebase setup

## 1. Signup for a Firebase Account

Click here to signup

[<u>https://firebase.google.com/</u>](https://firebase.google.com/)

After signing up, click on the “Go to Console” option:

<img src="images/media9_2/image28.png"
style="width:7.50521in;height:3.70871in" />

## 2. Create a new project

- Follow the on-screen steps to create a new project

<img src="images/media9_2/image18.png"
style="width:5.35417in;height:4.14711in" />

- Give project a name

<img src="images/media9_2/image46.png"
style="width:5.91257in;height:3.91676in" />

- Turn off Google Analytics

<img src="images/media9_2/image35.png"
style="width:4.99479in;height:4.12533in" />

- Wait for project to finish

<img src="images/media9_2/image21.png"
style="width:3.64583in;height:2.73958in" />

- Click CONTINUE

<img src="images/media9_2/image51.png"
style="width:3.66667in;height:4.02083in" />

- When done, you will be sent to the Project Overview page:

<img src="images/media9_2/image10.png"
style="width:21.33333in;height:10.48958in" />


# Configure your Firebase Project

To configure your firebase project:

- Decide what firebase services do you want to include in your mobile
  application?

  - Answer: Cloud Firestore, and later on Firebase Authentication

<!-- -->

- After you decide which FB services to use, you have to add it to the
  project

# How to Add Firestore to the Project

- In the Project Overview page, click Build \> Firestore Database

<img src="images/media9_2/image38.png"
style="width:2.59375in;height:4.21875in" />

- On the next screen, choose CREATE DATABASE

<img src="images/media9_2/image34.png"
style="width:13.53125in;height:6.03125in" />

- In the popup, choose a location (or use the default value)

<img src="images/media9_2/image49.png"
style="width:6.94854in;height:4.67004in" />

- On the next screen, choose “Start in Test mode”

- Press CREATE

<img src="images/media9_2/image27.png"
style="width:8.27083in;height:5.85417in" />

- Wait for the Firestore project to initialize

<img src="images/media9_2/image33.png"
style="width:4.11458in;height:2.66667in" />

- After some time, the screen will update to look like this

- If this screen does not load, then press REFRESH on your browser

<img src="images/media9_2/image48.png"
style="width:9.72017in;height:5.5086in" />

# Add Data to Firestore Using the Console

- In the Firestore console, choose “Start CollectioN”

<img src="images/media9_2/image25.png"
style="width:4.40625in;height:1.80208in" />

- Give the collection a name

- In this example, we call the collection **students**

<img src="images/media9_2/image12.png"
style="width:7.09375in;height:3.94792in" />

- Generate an ID for your document → this will automatically create a
  unique document id for your item

<img src="images/media9_2/image32.png"
style="width:5.52292in;height:3.99286in" />

- Insert a document into the collection

<img src="images/media9_2/image11.png"
style="width:5.55701in;height:5.37178in" />

- When added, screen will update like this:

<!-- -->

- Use the Add document option to add more document

<img src="images/media9_2/image45.png"
style="width:9.09751in;height:3.37876in" />

- Add a few more students, so you have a minimum of 4 students

<img src="images/media9_2/image40.png"
style="width:8.85185in;height:2.82657in" />

#  

# 

# Get your project credentials

1/ Go to project settings

<img src="images/media9_2/image24.png"
style="width:5.54167in;height:2.39583in" />

<img src="images/media9_2/image43.png"
style="width:9in;height:4.97222in" />

# <img src="images/media9_2/image1.png"
style="width:7.92708in;height:6.625in" />

Leave this screen open in your browser because we’re coming back to it
later

<img src="images/media9_2/image2.png" style="width:9in;height:7.88889in" />

#  

# Connect your React Native Project to Firebase Project1. Get a React Native Project

Use the starter code from the course webpage:

<img src="images/media9_2/image20.png"
style="width:4.85417in;height:1.27083in" />

After downloading, run npm install to install all the default Expo
libraries:

npm install

## 

## 2. Install Firebase <u>libraries</u> into the React Native project

Instructions / Documentation:
[<u>https://docs.expo.dev/guides/using-firebase/#install-the-sdk</u>](https://docs.expo.dev/guides/using-firebase/#install-the-sdk)

Command for installing:

npx expo install firebase

However, if you get an error, try:

npm install expo

npx expo install firebase

After installing, check that the package.json contains the firebase
dependency:

<img src="images/media9_2/image42.png"
style="width:4.37674in;height:5.19858in" />

##  

## 3. Create a file called “firebaseConfig.js”

In the React Native project, create a file called “firebaseConfig.js”

<img src="images/media9_2/image13.png"
style="width:7.12081in;height:3.60397in" />

## 4. Find your Firebase project <u>configuration</u> information

THis is from the firebase website

## 5. Copy and Paste Firebase Configuration code 

- In the firebaseConfig.js file, copy and paste your Firebase project’s
  configuration code

- The file should look like this:

<img src="images/media9_2/image15.png"
style="width:7.05671in;height:4.68977in" />

# Add Firebase <u>Services</u> to the React Native Project

Now that your React Native project is configured to connect to your
Firebase project, you need to import, initialize, and export your
required Firebase services (Firestore, FirebaseAuth, Realtime Database,
etc) to the rest of your project

- Documentation: Initializing Firestore service:

> [<u>https://firebase.google.com/docs/firestore/quickstart#initialize</u>](https://firebase.google.com/docs/firestore/quickstart#initialize)

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

 


This completes the process of enabling the screen to access Firestore.

Next, write the code to perform CRUD operations on Firestore (insert,
update, delete, read)

# Inserting a Document into Firestore

To insert a new document, use the addDoc() function:

The **addDoc()** function will insert a new document and auto-generate a
document id.

- Documentation:
 https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document

<!-- -->

- Notice there are several functions used to insert a document. Choose
  the appropriate function for your use case!

<!-- -->

*Image describing what the adDoc() function does:*
```js
<img src="images/media9_2/image31.png"
style="width:7.70217in;height:3.59856in" />
```

Here’s an example of the addDoc() function usage:

##  

## Code Demo: Inserting a document
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

Result:

- Enter the student details

<img src="images/media9_2/image14.png"
style="width:3.98958in;height:3.54167in" />

- In the React Native (VSCode) Terminal, the code will output the id of
  the newly inserted document

| **LOG** Id of inserted document is: aGej9PvL0QRmvxG8<span class="mark">firE</span> |
|----|

- In the web console, look for the document you inserted

<img src="images/media9_2/image29.png"/>
 

### FirebaseError: MIssing or insufficient permissions

- If your terminal shows this error:

<img src="images/media9_2/image8.png" />

- It can be fixed by adjusting the “Rules” section of your Cloud
  Firestore console.


- In the “Rules” section, check for the false keyword

<img src="images/media9_2/image50.png"
style="width:7.2498in;height:3.24237in" />

- Change the false keyword to true

- Then press PUBLISH
```
<img src="images/media9_2/image4.png"
style="width:7.33854in;height:2.79008in" />
```
- After the changes are saved, try inserting into the database again
```
### Retrieve All Documents

**Use the **getDocs()** function to retrieve all documents from a
collection
**
Documentation:
  https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection)

Required Imports:

```js
import { <span class="mark">collection</span>, <span class="mark">getDocs</span> } from "firebase/firestore"
```
#### Code Excerpt:
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
```

#### Code Example:
```js
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
##### Result:

<img src="images/media9_2/image26.png"
style="width:7.72917in;height:3.61458in" />


## What is a Query Snapshot?

- Data structure that represents the documents retrieved from querying
  Firestore

- In addition to the matching documents, the Query Snapshot object also
  includes

  - Metadata about the query

  - Information about whether the query completed successfully or is
    still in progress

  - A list of changes that have occurred *since* you executed the query.

### Code example: Update the List after retrieving documents**

```js
const btnGetStudentsPressed = async () => {
       alert(`Textbox value is: ${nameFromUI}`)

       // 1. retrieve data from database
       try {          
           // 2. after retrieving data, save data to a state variable
           const querySnapshot = await getDocs( collection(db, "students") )


           // temporary array that contains all the documents that
           const tempArray = []

           // loop through the search results
           querySnapshot.forEach(
               // for each document in the search results:
               (currDoc) => {
                   // a. debug - output the id
                   console.log(`Document id: ${currDoc.id}`)
                   console.log("Document data:")
                   // b. debug - output the document contents
                   console.log(currDoc.data())
                  
                   const document = currDoc.data()
                   // c. debug -- output the gpa
                   console.log(document.gpa)
                   console.log("---------")

                   // d -add the document information to the temp array
                   tempArray.push(currDoc.data())
               }
           )
       
           // 3. when the state variable updates, the list will auto update
           setStudentList(tempArray)        // expects you to providei t with ana rrary of data

       } catch (err) {
           console.log(err)
       }
      
   }
```



#### Full Code:

```js
import { StyleSheet, Text, View, Pressable, TextInput, FlatList} from 'react-native';
import { useState } from "react"

// TODO: import the required service from FirebaseConfig.js
import { db } from '../firebaseConfig'

// TODO: import the specific functions from the service
import { collection, query, where, getDocs } from "firebase/firestore";

export default StudentListScreen = () => {

   // state variable for the text box
   const [nameFromUI, setNameFromUI] = useState("")

   // state variable to store students
   const [studentList, setStudentList] = useState([])
     
   // button click handler
   const btnGetStudentsPressed = async () => {
       alert(`Textbox value is: ${nameFromUI}`)

       // 1. retrieve data from database
       try {          
           // 2. after retrieving data, save data to a state variable
           const tempArray = []

           const querySnapshot = await getDocs( collection(db, "students") )
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
### Retrieve Documents When Screen Loads

Use the `useEffect(()=\>{},\[\])` function to execute code immediately
when the screen loads.

In our example, call the function that retrieves documents from the
useEffect()

```js
   useEffect( ()=>{
       getFromDb()
   },[])

   const getFromDb = async () => {
       try {          
           const querySnapshot = await getDocs( collection(db, "students") )
           const tempArray = []

           querySnapshot.forEach(
               (currDoc) => {
                   console.log(`Document id: ${currDoc.id}`)
                   console.log("Document data:")
                   console.log(currDoc.data())
                   const document = currDoc.data()

                   console.log(document.gpa)
                   console.log("---------")
                   const x = {...currDoc.data(), id: currDoc.id}
                   tempArray.push(x)
               }
           )

           console.log(tempArray)
           setStudentList(tempArray)


       } catch (err) {
           console.log(err)
       }
   }
``` 

**Remember**: The reason why we make a helper function to perform await
tasks is because the useEffect function cannot directly be set to async.

For example: If you try to do this,

```js
useEffect(<span class="mark">async</span> ()=\>{},\[\])
```

You will get this error message:

<img src="images/media9_2/image47.png"
style="width:3.90086in;height:2.85139in" />

To resolve this issue, move your async operations into a helper
function, and run the helper functions from the useEffect

```js
const getData = async () =\> {}


useEffect(()=\>{

getData()

},\[\])
```

### Retrieve Documents based on A Query

Documentation:
https://firebase.google.com/docs/firestore/query-data/queries

To filter the documents using a query:

1.  Build a Query object using the **query()** function

2.  Call **getDocs()** with the query object

#### Required imports:

```js
import { collection, <span class="mark">query</span>, <span class="mark">where</span>, getDocs } from "firebase/firestore";
```

#### Code Example: Get all students with a specific name

```js
const q = query( collection(db, "students"), where("name", "==", "Emily Smith") )
const querySnapshot = await getDocs( q )
```

#### Code Example: Get all students with a gpa \>= 2.5

```js
try {
   // create a query
   const q = query(collection(db, "students"), where("gpa", ">=", 2.5));

   // retrieve documents from Firestore based on the query
   const querySnapshot = await getDocs(q);

   // do something with the results
   querySnapshot.forEach((currDoc) => {
       console.log(currDoc.id, " => ", currDoc.data());
   })

} catch (err) {
   console.log(err)
}
```

#### Code Example: Get all students who are post graduate

```js
const q = query(collection(db, "students"), where("gpa", ">=", 88));
const querySnapshot = await getDocs(q);
```

#### Code Example: Get all students with name that matches what you teypd in

```js
const q = query(collection(db, "students"), where("name", "==",
nameFromUI))
```
#### Code Example: Get all students with name that matches what you teypd in
the text box
```js
const q = query(collection(db, "students"), where("name", "==", nameFromUI))
const querySnapshot = await getDocs(q);

```


#### Refactor our code:

- Create a helper function that retrieves data from the collection

- \[DONE\] The function should be used to get the data when the button
  is pressed

- \[DONE\] The function should be used to load data when the screen
  loads - you want to get ALL student
```js
import { StyleSheet, Text, View, Pressable, TextInput, FlatList} from 'react-native';
import { useState, useEffect } from "react"

// TODO: import the required service from FirebaseConfig.js
import { db } from '../firebaseConfig'

// TODO: import the specific functions from the service
import { collection, query, where, getDocs } from "firebase/firestore";

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


### Update a document

1. Add an update button to the row

- Import Button

```js
import { StyleSheet, Text, View, Pressable, TextInput, FlatList, <span class="mark">Button</span>} from 'react-native';
```

- Update FlatList UI

```js
FlatList
   data={studentList}
   keyExtractor={(item)=>{ return item.id }}
   renderItem={
           ({item})=>{
               return(
                   <View>                               
                       <Text>Name: {item.name}</Text>
                       <Text>GPA: {item.gpa}</Text>                               
                       <Button title="Update Grade" onPress={()=>{updatePressed(item)}}/>
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

```
- Attach a click handler
```js
const updatePressed = (item) => {
       console.log("DEBUG: What document was clicked?")
       console.log(item)
}

```

- Expected result when a row clicked
```sh
 LOG  DEBUG: What document was clicked?
 LOG  {"gpa": 3.9, "id": "A1ekIX0r6hSiBmP8sYTX", "isPostGrad": false, "name": "Emily Smith"}
```


2. When the button is pressed, update the student’s gpa to 4.0

- Import required functions

```js
import { collection, getDocs, where, query, <span class="mark">doc, updateDoc</span> } from "firebase/firestore"
```


- Call the updateDoc function
```js
const updatePressed = async (item) => {
       console.log("DEBUG: What document was clicked?")
       console.log(item)
       // updates the gpa of the selected student to 4.0
       try {
           // UPDATE gpa =4.0 WHERE id= item.id
           await updateDoc(doc(db, "students", item.id), {gpa: 4.0})

           // await updateDoc(doc(db, "students", item.id), {gpa: 4.0, isPostGrad:true})
           alert("Update complete!")
       } catch(err) {
           console.log(err)
       }
   }

```

- Result: In the database, the document should update with a new gpa

<img src="images/media9_2/image3.png"
style="width:5.44271in;height:2.29299in" />

3. Update the UI to show the latest changes from the database

- Earlier, we created a function that retrieves all values from the
  database

<!-- -->

- Reuse that function now:
```js
const updatePressed = async (item) => {
       console.log("DEBUG: What document was clicked?")
       console.log(item)
       //
       try {
           await updateDoc(doc(db, "students", item.id), {gpa: 4.0})
           alert("Done!")


           // query the database again, get all documents and show in list
           getFromDb()

       } catch(err) {
           console.log(err)
       }
}

```

#### Full code:
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

```

### Example: Update the gpa and the post grad status

```js
await updateDoc(doc(db, "students", item.id), <span class="mark">{gpa:
4.0, isPostGrad: true}</span>)
```

### Example: Update the student’s post grad status to the opposite value. 
So if their current value is true, then change it to false

```js
const updatePressed = async (item) => {
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
           await updateDoc(doc(db, "students", item.id), {gpa: 4.0, isPostGrad: updatedStatus})
           alert("Done!")
           // query the database again, get all documents and show in list
           getData()

       } catch(err) {
           console.log(err)
       }
   }
```

###  Delete A Document

```js
import { collection, getDocs, where, query, doc, updateDoc, deleteDoc} from "firebase/firestore"
```

Update the FlatList with a delete button:
```js
<Button title="Delete" onPress={()=\>{deletePressed(item)}}/\>
```

Click handler:
```js
const deletePressed = async (item) => {
       console.log("DEBUG: What document was clicked?")
       console.log(item)

       try {
           // delete the specified document
           await deleteDoc(doc(db, "students", item.id))
           alert("Done!")

           // query the database again, get all documents and show in list
           getData()
       } catch(err) {
           console.log(err)
       }
}

```

# Firebase Authentication

Download:

<img src="images/media9_2/image7.png"
style="width:1.77083in;height:0.39583in" />

```js
// App.js

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EntryFormScreen from './screens/EntryFormScreen';
import StudentListScreen from "./screens/StudentListScreen";
import LoginScreen from "./screens/LoginScreen";


const Stack = createNativeStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Login Screen" component={LoginScreen} />
      
       <Stack.Screen
         name="Entry Form"
         component={EntryFormScreen}
         options={ ({ navigation }) => ({
           headerRight: () => (
             <Button onPress={
               () => {
                 navigation.navigate("Student List Screen")
               }
             }
             title="All Students"/>
           )
         }) }
        
       />
       <Stack.Screen name="Student List Screen" component={StudentListScreen} />       

      
      
     </Stack.Navigator>
   </NavigationContainer>
 )
}

```
___


Firebase Console:

<img src="images/media9_2/image39.png"
style="width:2.67708in;height:2.46875in" />

<img src="images/media9_2/image37.png"
style="width:4.53125in;height:2.85417in" />

<img src="images/media9_2/image30.png"
style="width:9in;height:5.65278in" />

<img src="images/media9_2/image36.png"
style="width:9in;height:3.76389in" />

<img src="images/media9_2/image52.png"
style="width:9in;height:2.08333in" />

Add a user:

<img src="images/media9_2/image6.png"
style="width:8.95833in;height:5.67708in" />

<img src="images/media9_2/image17.png"
style="width:7.82292in;height:5.33333in" />

<img src="images/media9_2/image5.png" style="width:9in;height:2.19444in" />

For simplicity of development, change your login screen to default to your user email/password

## Update your firebase config

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyDB5CJcwcueh9DOkBThNOB4w_DsJsXy1Bg",
 authDomain: "mytestproject-88d10.firebaseapp.com",
 projectId: "mytestproject-88d10",
 storageBucket: "mytestproject-88d10.firebasestorage.app",
 messagingSenderId: "1090576590935",
 appId: "1:1090576590935:web:716b7c54ffe02248d65b12"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Initialize Firebase Services (database, auth, etc)
const db = getFirestore(app);
const auth = getAuth(app)

export {db, auth}

```


### Login the user
```js
const loginPressed = async () => {
      console.log("Logging in...")    
     
      try {
         await signInWithEmailAndPassword(auth, emailFromUI, passwordFromUI)
         console.log("DEBUG: LOGIN SUCCESS!")
         alert("LOGIN SUCCESS!")
         navigation.navigate("Home")
      } catch (err) {          
         console.log("Error when doing login")
         console.log(`Error code: ${err.code}`)
         console.log(`Error message: ${err.message}`)
         setErrorMessageLabel(err.message)
      } 
     
  }

``` 
## Final code for checking if user is logged in & loggin out

```js
import { StyleSheet, Text, View, TextInput, TextView, Switch, Pressable} from 'react-native';
import {useState} from "react"

// 1. TODO: import the required service  (db, auth, etc) from FirebaseConfig.js
import {auth} from "../firebaseConfig"

// 2. TODO: import the specific functions from the service (import ___ from "firebase/firebase auth)
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const LoginScreen = ({navigation}) => {

  // form fields
  const [emailFromUI, setEmailFromUI] = useState("peter@gmail.om")
  const [passwordFromUI, setPasswordFromUI] = useState("12345678")
  const [errorMessageLabel, setErrorMessageLabel] = useState("Error messages go here")


  const [isProducerInUI, setIsProducerInUI] = useState(false)
  const [genreFromUI, setGenreFromUI] = useState("Pop")
  const [artistFromUI, setArtistFromUI] = useState("Michael Jackson")

  const loginPressed = async () => {
     console.log("Logging in...")    

     try {
         await signInWithEmailAndPassword(auth, emailFromUI, passwordFromUI)      
         alert("LOGIN SUCCESS!")
         // will give you back some data
         console(auth.currentUser)
     } catch (err) {          
         console.log("Error when doing login")
         console.log(`Error code: ${err.code}`)
         console.log(`Error message: ${err.message}`)
         setErrorMessageLabel(err.message)
     } 
  }


   const checkLoginStatus = () => {
     // if user is logged in, then this will contain an object
     // if no one is logged in, then thsi will be null
     console.log(auth.currentUser)
   }

   const logoutUser = () => {
     // code to logout user     
     auth.signOut()
     alert("User is logged out!")
    
   }


  const createAccountPressed = async () => {
      console.log("Attempting to creating account...")
      try {              
           // TODO:
      } catch (err) {          
          console.log("Error when creating user")
          console.log(`Error code: ${err.code}`)
          console.log(`Error message: ${err.message}`)
      }        
  }

 return(
     <View style={styles.container}>
          <Text style={styles.heading}>Welcome to Music App!</Text>
          <Text style={styles.text}>Login or Signup</Text>
          {/* email tb */}
          <TextInput placeholder="Enter email" onChangeText={setEmailFromUI} value={emailFromUI} style={styles.tb}/>
      
          {/* password tb */}
          <TextInput placeholder="Enter password" onChangeText={setPasswordFromUI} value={passwordFromUI} style={styles.tb}/>

         {/* other data for the user profile */}
         <View style={{borderWidth:1, borderColor:"#ccc", padding:8, marginBottom:16}}>
           <Text style={styles.heading}>Additional Info</Text>           
           <Text>Are you a music producer?</Text>
           <Switch onValueChange={setIsProducerInUI} value={isProducerInUI} />

           <Text>Favorite Genre?</Text>
           <TextInput placeholder="What is your favorite genre?" onChangeText={setGenreFromUI} value={genreFromUI} style={styles.tb}/>

           <Text>Favorite Artist?</Text>
           <TextInput placeholder="What is your favorite artist?" onChangeText={setArtistFromUI} value={artistFromUI} style={styles.tb}/>
         </View>

          {/* button */}
         
          <Pressable onPress={loginPressed} style={styles.btn}>
              <Text style={styles.btnLabel}>Login</Text>
          </Pressable>

          <Pressable onPress={createAccountPressed} style={styles.darkBtn}>
              <Text style={[styles.btnLabel, {color:"#fff"}]}>Create Account</Text>
          </Pressable>
          <Pressable onPress={checkLoginStatus} style={styles.btn}>
              <Text style={[styles.btnLabel, {color:"#000"}]}>Check for logged in user?</Text>
          </Pressable>
          <Pressable onPress={logoutUser} style={styles.btn}>
              <Text style={[styles.btnLabel, {color:"#000"}]}>Logout?</Text>
          </Pressable>

          <Text>{errorMessageLabel}</Text>
     </View>
 )
}
export default LoginScreen


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
     paddingVertical:8,
     marginVertical:8
 },
 darkBtn: {
   borderWidth:1,
   backgroundColor:"#000",   
   borderRadius:8,
   paddingVertical:16,
   marginVertical:8
 },
 btnLabel: {
     fontSize:16,
     textAlign:"center"
 },
 error: {
      fontSize:16,
      textAlign:"center",
      color:"blue"
 },
 heading : {
   fontSize:20,
   textAlign:"center",
 },
 text : {
   fontSize:18,
   marginVertical:8,
 }
});

```


### Exercise:  If the user is already logged in, then the next time they come to the application, skip the login screen, and send them directly to the Student List Screen

```js
useEffect(()=>{
   if (auth.currentUser === null) {
       // no one is logged in
       // do nothing
   } else {
       // send them to the next screen
       navigate.navigate("Student List Screen")
   }

},[])

```
Debug this, this untest 
Create account
```js
const createAccountPressed = async () => {
      console.log("Creating account...")
      try {              
           // todo: write the code to create a user account
           // 1. attempt to create the account with the given email/password
           const userCredential
             = await createUserWithEmailAndPassword(auth, emailFromUI, passwordFromUI)

          // 2. if successful, then a copy of the account information will be store din the
          // userCredential variable
          console.log(userCredential)

          alert("Account created! Check Website!")

          // 3. what is the email address of the created account
          console.log(`Email of account: ${userCredential.user.email}`)
          console.log(`Firebase uid for this account: ${userCredential.user.uid}`)

         // 4. navigate you to the next screen of the app
         // navigation.navigate("Home")


      } catch (err) {          
          console.log("Error when creating user")
          console.log(`Error code: ${err.code}`)
          console.log(`Error message: ${err.message}`)
      }        
  }

```



