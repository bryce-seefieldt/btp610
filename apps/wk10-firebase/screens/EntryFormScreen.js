import { StyleSheet, Text, View, TextInput, Switch, Pressable} from 'react-native';
import {useState} from "react"


// TODO: import the required service from FirebaseConfig.js

// TODO: import the specific functions from the service

const EntryFormScreen = () => {

   // form fields
   const [nameFromUI, setNameFromUI] = useState("")
   const [gpaFromUI, setGPAFromUI] = useState("")
   const [isPGFromUI, setIsPGFromUI] = useState(true)

   const buttonPressed = async () => {
        // convert gpa to number
        const gpaAsNumber = parseFloat(gpaFromUI)


        // DEBUG: show values entered in textbox
        alert(`Name: ${nameFromUI}, GPA: ${gpaAsNumber}, IsPG? ${isPGFromUI}`)



        // create object to insert

        // insert into database
        try {

        } catch (err) {

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
