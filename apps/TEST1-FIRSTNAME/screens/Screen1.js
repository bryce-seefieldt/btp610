import { StyleSheet, Text, View, Pressable } from 'react-native';
import {useState, useEffect} from "react"

export default function Screen1() {

    const buttonPressed = () => {
      alert("Hello!")
    }
    return(
        <View style={styles.container}>
            <Text style={styles.text}>This is screen #1</Text>
            <Pressable style={styles.btn} onPress={buttonPressed}>
              <Text style={styles.btnText}>Press me</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
    paddingTop:20,
    padding:20,
  },
  text: {
    fontSize:16,    
  },
  btn: {
    borderWidth:1,
    backgroundColor:"#30336b",
    borderRadius:10,
    paddingVertical:12,
    marginVertical:8,
    fontSize:16,
  },
  btnText: {
    textAlign:"center",
    color:"white",
    fontWeight:"bold"
  }
});
