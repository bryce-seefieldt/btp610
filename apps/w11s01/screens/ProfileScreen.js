import { StyleSheet, Text, View, Button, TextInput, TextView, Switch, Pressable} from 'react-native';
import {useState, useEffect} from "react"

import {db, auth} from "../firebaseConfig"
import { doc, getDoc } from "firebase/firestore"

const ProfileScreen = ({navigation}) => {

    useEffect(()=>{
      navigation.setOptions({
          headerRight: () => (
          <Button onPress={logoutUser} title="Logout"/>
          ),
      })
    }, [navigation])

    const logoutUser = () => {        
        auth.signOut() 
        // go back to previous screen
        navigation.goBack()       
    }
    return(
        <View style={styles.container}> 
            <Text style={styles.heading}>Welcome User!</Text>
            
            <Text>Name: </Text>
        </View>
    )
}
export default ProfileScreen


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
