import { StyleSheet, Text, View, Pressable, TextInput, FlatList} from 'react-native';
import { useState } from "react"
import EntryFormScreen from './EntryFormScreen';

// TODO: import the required service from FirebaseConfig.js

// TODO: import the specific functions from the service


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
