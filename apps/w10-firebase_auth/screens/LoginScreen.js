import { StyleSheet, Text, View, TextInput, TextView, Switch, Pressable} from 'react-native';
import {useState} from "react"
/* Recording: How to create user login and signup 
 https://senecapolytechnic.zoom.us/rec/share/h0rxwk0ICCMAvEL9ZKCGk0v8ksYOeo0hEODUvdpyT7pe9VgNR-huY42MLAcXKmsj.LzBg58FymJnXe_M9
  */
// 1. TODO: import the required service  (db, auth, etc) from FirebaseConfig.js
import {auth} from "../firebaseConfig"

// 2. TODO: import the specific functions from the service (import ___ from "firebase/firebase auth)
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({navigation}) => {

   // form fields
   const [emailFromUI, setEmailFromUI] = useState("bryce.seefieldt@gmail.com")
   const [passwordFromUI, setPasswordFromUI] = useState("123456")
   const [errorMessageLabel, setErrorMessageLabel] = useState("Error messages go here")

  const loginPressed = async () => {
       console.log("Attempting to login")
   }

   

   const [isProducerInUI, setIsProducerInUI] = useState(false)
   const [genreFromUI, setGenreFromUI] = useState("Pop")
   const [artistFromUI, setArtistFromUI] = useState("Michael Jackson")

 
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
      paddingVertical:16,
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
