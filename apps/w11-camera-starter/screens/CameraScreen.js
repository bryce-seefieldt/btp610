import {View, Button, ImageView, StyleSheet, Text, useWindowDimensions} from "react-native"
import {useState, useEffect, useRef} from "react"

// camera and media storage imports
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'

const CameraScreen = () => {

    // Used to calculate the size of the <Camera> component
    // Get height and width of device so we can size the <Camera> component
    // useWindowDimension() returns a Javascript object containing the height and width of the device
    const DEVICE_DIMENSIONS = useWindowDimensions();

    // ---------- SECTION 1: PERMISSIONS ----------
    // Permissions related state variables
    const [cameraPermission, checkCameraPermissions] = useCameraPermissions();
    const [writeToMediaLibraryPermission, checkWriteToMediaLibraryPermission] = MediaLibrary.usePermissions();
    
    useEffect(()=>{        
        checkPermissions()      
    },[])

    const checkPermissions = async () =>{
        await checkCameraPermissions()
        await checkWriteToMediaLibraryPermission()
    }

    // ---------- SECTION 2: CAMERA ----------
    // Camera related state and ref variables
    const cameraRef = useRef(null)
    const isCameraReady = useRef(false)
    const [type, setType] = useState("back")

    // this function executes when device's camera is ready to go        
    const checkCameraStatus = () => {        
        console.log("DEBUG: cameraIsReady is firing...")        
        // update variable that tracks the camera readiness
        isCameraReady.current = true
    }
 
    const toggleCameraType = () => {
    }
 
    // ---------- SECTION 3: TAKING A PHOTO ----------
    const takePhoto = async () => {        
        try {
            console.log("Attempting to take a photo")           
            // 1. Assuming you take the picture, the info about the picture will be returned to you as an object
            const photoInfo = await cameraRef.current.takePictureAsync()
            console.log("SUCCESS: See below for photo info")
            console.log(photoInfo)
 
            // 2. Save the file to the photo gallery
            // 3. Save the photo to an albumn in the gallery
        } catch (err) {
            console.log(err)
        }
       
    }
 
    


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Permission Status</Text>
            {/* permissions*/}
            {
                (writeToMediaLibraryPermission !== null && writeToMediaLibraryPermission.granted === false) &&
                <Text>Permission Denied: No access to device storage.</Text>
            }
            {
                (cameraPermission !== null && cameraPermission.granted === false) &&
                <Text>Permission Denied: No access to camera.</Text>
            }
            
            <Text style={styles.heading}>Camera Preview Window</Text>

            <Button onPress={takePhoto} title="Take Photo"/>
            <Button onPress={toggleCameraType} title="Flip Camera"/>

            <View style={{flex:1, width:DEVICE_DIMENSIONS.width, backgroundColor:"rgba(245, 228, 39, 0.52)", borderWidth:1, borderColor:"#ccc"}}>                             
                <Text>
                    This View is here so you can visually see where the Camera component should be placed.
                    In a real app, you don't need this View, you can just directly replace it with the Camera component.
                </Text> 
                {/* // TODO: if permission granted, show the <Camera> component */}
            </View>
        </View>
    )
}
export default CameraScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",      
    },
    heading : {
        fontSize:18,
        marginVertical:8,
        textAlign:"center",
    }
});
