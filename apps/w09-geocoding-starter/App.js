import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Platform, StatusBar } from "react-native";
import { useState } from "react"


export default function App()  {

    const [addressFromUI, setAddressFromUI] = useState("1750 Finch Avenue East, Toronto, ON")
   
    // Starbucks Vancouver: 2505 Granville St, Vancouver, BC V6H 3G7
    const [latFromUI, setLatFromUI] = useState("-49.2470185")
    const [lngFromUI, setLngFromUI] = useState("-123.1692495")

    const [fwdGecodeResultsLabel, setFwdGecodeResultsLabel] = useState("reverse geocoding results go here")
    const [reverseGecodeResultsLabel, setReverseGecodeResultsLabel] = useState("reverse geocoding results go here")
    const [currLocationLabel, setCurrLocationLabel] = useState("curr location results here")

    const doFwdGeocode = () => {
        
    }
    
    const doReverseGeocode = () => {
        
    }

    const getCurrLocation = () => {

    }

    return (
        <SafeAreaView styles={styles.container}>
            <Text style={styles.headingText}>Geocoding Demo</Text>
          
            <TextInput
                style={styles.input}
                onChangeText={setAddressFromUI}
                placeholder="Enter address (example: 123 Main Street)"
                value={addressFromUI}
            />
            <Button title="Forward Geocoding" onPress={doFwdGeocode}/>
            <Text style={styles.text}>{fwdGecodeResultsLabel}</Text>

            <View style={{flexDirection:"row", justifyContent:"center"}}>
                <TextInput
                    style={styles.input}
                    onChangeText={setLatFromUI}
                    placeholder="Enter latitude"
                    value={latFromUI}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setLngFromUI}
                    placeholder="Enter longitude"
                    value={lngFromUI}
                />
            </View>

            <Button title="Reverse Geocoding" onPress={doReverseGeocode}/>
            <Text style={styles.text}>{reverseGecodeResultsLabel}</Text>

            <Button title="Get Current Location" onPress={getCurrLocation}/>
            <Text style={styles.text}>{currLocationLabel}</Text>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: (Platform.OS === "android") ? StatusBar.currentHeight : 0,      
    },
    text: {
        fontSize:18,
        marginVertical:8,
        textAlign:"center"
    }, 
    headingText: {
        fontSize:24,
        marginVertical: 8,
        textAlign:"center",
    },      
    input: {
        height: 40,
        margin: 8,
        borderWidth: 1,
        padding: 10,
    },    
    map : {
      borderWidth:1,
      borderColor:"black",      
      height:300,
    }
});

