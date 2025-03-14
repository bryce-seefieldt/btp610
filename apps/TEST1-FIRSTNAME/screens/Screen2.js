import { StyleSheet, Text, View, FlatList } from 'react-native';
import {useState, useEffect} from "react"

export default function Screen2() {

    const listData = [
        {id:1, name:"Item A"},
        {id:2, name:"Item B"},
        {id:3, name:"Item C"},
        {id:4, name:"Item D"},
    ]

    return(
        <View style={styles.container}>            
            <FlatList
                data={listData}
                key={(item)=>{return item.id}}
                renderItem={(
                    {item})=>{
                        return(
                            <View style={styles.row}>
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                        )
                    }
                }
                ItemSeparatorComponent={()=>{
                    return (
                        <View style={styles.line}></View>
                    )
                }}
            />
            
            <View style={styles.box}>
                <Text style={styles.btnText}>This is screen #2</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
    padding:20,
  },
  box: {
    borderWidth:1,
    backgroundColor:"#30336b",
    borderRadius:5,
    paddingVertical:12,
    marginVertical:8,    
    height:100,
    justifyContent:"center"
  },
  btnText: {
    textAlign:"center",
    color:"white",
    fontWeight:"bold",
    fontSize:20,
  },    
  row: {
    paddingVertical:10,
  },
  text:{
    fontSize:16,
  },
  line: {
    borderWidth:1,
    borderColor:"#ccc"
  },  
  
});
