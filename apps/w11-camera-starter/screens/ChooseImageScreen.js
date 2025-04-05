import {View, Button, Image, StyleSheet, Text} from "react-native"
import {useState, useEffect} from "react"

// Import for the ImagePicer
import * as ImagePicker from "expo-image-picker"

// Import your Firebase Storage service
import { storage } from "../firebaseConfig"
import { ref, uploadBytesResumable} from "firebase/storage"

const ChooseImageScreen = () => {

    const [resultsLabel, setResultsLabel] = useState("")

    // TODO: state variable to save the image
    const [imageFromGallery, setImageFromGallery] = useState(null)

    const chooseImage = async () => { 
        //TODO: Choose image from gallery  
        try {

            // 1. Attempt to open the image gallery
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            console.log(`DEBUG: The image information is`)
            console.log(result)

            // 2. if the person cancelled, then show an message
            if (result.canceled === true) {                
                setResultsLabel("ERROR: User did not choose a photo")
                setImageFromGallery(null)
                return
            }

            // 3. otherwise, display the image in the UI
            // a. retrivinv the Uri proprerty
            const filePath = result.assets[0].uri 
            // b. update teh <Image> component with the photo
            setImageFromGallery(filePath)
            // debugging, not required for actual app
            setResultsLabel(filePath)
             
        }  catch (err) {
            console.log(err)
        }  
    }

    const saveToCloud = async () => {    
        // 0. error checking make sure a photo is selected
        if (imageFromGallery === null) {
            alert("No photo selected")
            return
        }

        // 1. get the filename of the photo from the device
        // extract the file name from the path
        // - look for the last "/" symbol
        // - get all text that comes after the / sybmol
        const filename = imageFromGallery.substring(imageFromGallery.lastIndexOf('/') + 1, imageFromGallery.length);
        
        console.log(`DEBUG:  File name is: ${filename}`)


        // 2. Tell firebase where to save the photo in Firebase Stroage
        // storage = the export from fireBase config
        // filename is the name of the file we want to use in Firebase Storage
        const photoRef = ref(storage, filename)

        try {
            // 3. "download" the file from the device
            console.log("DEBUG: Downloading the file from the device")
            const response = await fetch(imageFromGallery)

            // 4. convert the file to a "blob"
            console.log("DEBUG: Converting to a blob")
            const blob = await response.blob()

            // 5. upload the "blob" to firebase storage
            console.log("DEBUG: Upload to firebase storage")
            await uploadBytesResumable(photoRef, blob)

            alert("DONE: Upload Complete")
            console.log("Upload done")
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <View style={styles.container}>
            <Button title="Pick Image" onPress={chooseImage}/>
            <Text>{ resultsLabel } </Text>
            <Image source={{uri: imageFromGallery}} style={styles.image}/>
            <Button title="Save To Cloud" onPress={saveToCloud}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {      
      backgroundColor: "#eee",
      padding:16,
      flex:1
    },
    image : {
        height:263,
        width:350,
        borderWidth:1,
        borderColor:"#000000",
        marginBottom:16
    }
});

export default ChooseImageScreen
