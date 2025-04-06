/*
\owner\screens\LoginScreen.js
*/
import { StyleSheet, Text, View, TextInput, TextView, Switch, Pressable} from 'react-native';
import {useState} from "react"

// Import the required service  (db, auth, etc) from FirebaseConfig.js
import {db, auth} from "../firebaseConfig"

// Import the specific functions from the service (import ___ from "firebase/firebase auth)
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = ({navigation}) => {
   // form fields
   const [emailFromUI, setEmailFromUI] = useState("owner@test.com")
   const [passwordFromUI, setPasswordFromUI] = useState("123456")
   const [errorMessageLabel, setErrorMessageLabel] = useState("")
   const [showWrongAppMessage, setShowWrongAppMessage] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const getUserType = async (uid) => {
       console.log('getUserType: Starting user type verification', { uid })
       try {
           console.log('getUserType: Attempting to fetch user document')
           const userDoc = await getDoc(doc(db, "users", uid));
           
           if (userDoc.exists()) {
               const userData = userDoc.data()
               console.log('getUserType: User document found', { 
                   userData,
                   userType: userData.type
               })
               return userData.type;
           }
           
           console.log('getUserType: No user document found')
           return null;
       } catch (err) {
           console.error('getUserType: Error fetching user type:', {
               error: err.message,
               errorCode: err.code,
               stackTrace: err.stack
           });
           return null;
       }
   }

   const validateLogin = () => {
       if (!emailFromUI.trim()) {
           setErrorMessageLabel("Email is required")
           return false
       }
       if (!passwordFromUI.trim()) {
           setErrorMessageLabel("Password is required")
           return false
       }
       return true
   }

   const loginPressed = async () => {
       setErrorMessageLabel("")
       if (!validateLogin()) return

       setIsLoading(true)
       try {
           const userCredential = await signInWithEmailAndPassword(auth, emailFromUI, passwordFromUI)
           const userType = await getUserType(userCredential.user.uid)
           
           if (userType === 'owner') {
               navigation.navigate("Home")
           } else {
               setShowWrongAppMessage(true)
               await auth.signOut()
           }
       } catch (err) {
           let message = "Login failed"
           if (err.code === 'auth/invalid-credential') {
               message = "Invalid email or password"
           } else if (err.code === 'auth/network-request-failed') {
               message = "Network error. Please check your connection"
           }
           setErrorMessageLabel(message)
       } finally {
           setIsLoading(false)
       }
   }

   const createAccountPressed = async () => {
      console.log("Creating account...")
      try {                          
          const userCredential = await createUserWithEmailAndPassword(auth, emailFromUI, passwordFromUI)
          alert("account created")
          // debug
          console.log(userCredential)
          
         // navigate you to the next screen of the app
         // navigation.navigate("Home")


      } catch (err) {           
          console.log("Error when creating user")
          console.log(`Error code: ${err.code}`)
          console.log(`Error message: ${err.message}`)
      }         
  }

  // If showing wrong app message, render different UI
  if (showWrongAppMessage) {
      console.log('Rendering: Wrong app message screen')
      return (
          <View style={styles.container}>
              <Text style={styles.heading}>Wrong Application</Text>
              <Text style={styles.text}>Please use the Renter app instead.</Text>
              <Pressable 
                  style={styles.btn}
                  onPress={() => setShowWrongAppMessage(false)}>
                  <Text style={styles.btnLabel}>Return to Login</Text>
              </Pressable>
          </View>
      )
  }

  console.log('Rendering: Login screen')
  return(
      <View style={styles.container}> 
           <Text style={styles.heading}>Welcome to Car Rental!</Text>
           <Text style={styles.text}>Owner Login</Text>
           {/* email tb */}
           <TextInput 
               placeholder="Enter email"
               value={emailFromUI}
               onChangeText={(text) => {
                   setEmailFromUI(text)
                   setErrorMessageLabel("")
               }}
               style={[styles.tb, errorMessageLabel && styles.inputError]}
               keyboardType="email-address"
               autoCapitalize="none"
               editable={!isLoading}
           />
        
           {/* password tb */}
           <TextInput 
               placeholder="Enter password"
               value={passwordFromUI}
               onChangeText={(text) => {
                   setPasswordFromUI(text)
                   setErrorMessageLabel("")
               }}
               style={[styles.tb, errorMessageLabel && styles.inputError]}
               secureTextEntry
               editable={!isLoading}
           />

      

           {/* button */}
  
           <Pressable 
               onPress={loginPressed} 
               style={[styles.btn, isLoading && styles.btnDisabled]}
               disabled={isLoading}
           >
               <Text style={styles.btnLabel}>
                   {isLoading ? "Logging in..." : "Login"}
               </Text>
           </Pressable>

           {errorMessageLabel ? (
               <Text style={styles.error}>{errorMessageLabel}</Text>
           ) : null}
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
  },
  inputError: {
      borderColor: 'red',
      borderWidth: 1,
  },
  btnDisabled: {
      backgroundColor: '#ccc',
      borderColor: '#999',
  },
});
