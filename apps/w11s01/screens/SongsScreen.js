import { StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {useState, useEffect} from "react"

import {db, auth} from "../firebaseConfig"
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore"

const SongsScreen = () => {
    const [songList, setSonglist] = useState([
        {id:0, name:"song 1", artist:"artist 1", coverArt:"https://picsum.photos/100", producer:null},
        {id:1, name:"song 2", artist:"artist 2", coverArt:"https://picsum.photos/100", producer:null},
    ])
    return(
        <View style={styles.container}>
            <FlatList
            data={songList}
            keyExtractor={(item)=>{ return item.id }}
            renderItem={
                    ({item})=>{
                        return(
                            <View style={styles.row}>
                                <Image
                                    style={{width:64, height:64}}
                                    source={{
                                        uri: item.coverArt,
                                    }}
                                />
                                <View>
                                    <Text>Song Name: {item.title}</Text>
                                    <Text>Artist: {item.artist}</Text>
                                    {
                                        (item.producer === null) ?
                                        <Text>Producer: NONE!</Text> :
                                        <Text>Producer: {item.producer}</Text>
                                    }
                                </View>
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
    row:{
        flexDirection:"row",
        gap:10,
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
  
export default SongsScreen