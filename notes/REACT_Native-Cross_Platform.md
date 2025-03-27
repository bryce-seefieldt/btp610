# 01-REACT_Native-Expo-Introduction.md

# React Native & Expo Introduction

## Core Principles
### 1. Declarative Programming

- Uses declarative rather than imperative approach
- You specify what the UI should look like, not how to create it step-by-step
- The framework handles the implementation details

### 2. Component-Based Architecture
- Everything is built from reusable components
- Components can be basic UI elements or complex compositions
- Components are represented as JavaScript functions that return UI elements
- A component function can only return one root element

## Key Rules
### 1. Container Requirements
- Multiple elements must be wrapped in a container
- `<View>` is the primary container element in React Native
- Every `<View>` is automatically a flex container

### 2. Component Import Rules
- UI elements must be imported before use (unlike web HTML)
- Common imports include: `<View>`, `<Text>`, `<Image>`, `<Button>`, `<Pressable>`, `<Switch>`, `<TextInput>`

## 3. Styling System
### 1. Basic Styling
- Uses JavaScript objects for styles
- Can be inline or defined in `StyleSheet.create()`
- Properties use camelCase naming (unlike CSS)

### 2. Text Styling Properties
- `fontSize`, `color`, `backgroundColor`
- `fontWeight`, `fontStyle`, `textAlign`            
- `textDecorationLine`

### 3. Layout Properties
- `padding`, `margin` (with variants like `paddingTop`, `marginLeft`)
- `borderWidth`, `borderColor`, `borderStyle`
- `height`, `width`

### 4. Flexbox Layout System
- Primary layout mechanism
- Components:
  - Flex Container (<View>)
  - Flex Items (elements inside the container)
- Key Properties:
  - `flexDirection`: "row" | "column" (default is "column")
  - `justifyContent`: Controls positioning and spacing
  - `gap`: Fixed spacing between items
  - `flex`: Proportional space allocation

## Image Handling
- Network images require explicit height/width
- `resizeMode` property controls scaling
- Options include: "contain", "center", "cover"

## Best Practices
- Use `<SafeAreaView>` for iOS notch compatibility
- Import only needed components
- Structure complex layouts using nested flex containers
- Use responsive spacing with `justifyContent` over fixed `gap` when possible
-Maintain clear component hierarchy

This methodology emphasizes a structured, component-based approach with heavy reliance on flexbox for layouts and a JavaScript-based styling system.

# expo-emulator-setup.md

# Running React Native with Expo on Emulators in WSL2 Ubuntu

Running emulators with WSL2 requires a specific setup because WSL2 doesn't natively support GUI applications like Android emulators. Here's a comprehensive guide for your environment:

## Setup WSL2 Ubuntu Development Environment

### 1. Install Node.js in WSL2

```bash
# Update your package list
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Install NVM for better Node.js version management
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc

# Install and use a newer Node.js version
nvm install 21
nvm use 21

# Verify installation
node -v
npm -v
```

### 2. Install Expo CLI in WSL2

```bash
npm install -g expo-cli
```

## Android Emulator Setup (Windows Host)

Since running Android emulators directly in WSL2 is challenging, you'll install the emulator on the Windows host and connect to it from WSL2.

### 1. Install Android Studio on Windows
1. Download Android Studio from [developer.android.com](https://developer.android.com/studio)
2. Run the installer and follow the setup wizard
3. During installation, ensure "Android Virtual Device" is selected

### 2. Create an Android Virtual Device
1. Open Android Studio
2. Click on "More Actions" > "Virtual Device Manager" (or Tools > AVD Manager)
3. Click "Create Device"
4. Select a phone definition (e.g., Pixel 4)
5. Select a system image (recommend API 30 or newer)
   - If you need to download an image, click "Download" next to the image name
6. Name your AVD and click "Finish"

### 3. Test the Emulator on Windows
1. In Android Virtual Device Manager, click the play button next to your AVD
2. The emulator should start up successfully

## Connecting WSL2 to Windows Android Emulator

### 1. Configure WSL2 to Connect to Windows Services

```bash
# Add this to your ~/.bashrc or ~/.zshrc
export ADB_SERVER_SOCKET=tcp:127.0.0.1:5037
export ANDROID_SDK_ROOT=/mnt/c/Users/YourUsername/AppData/Local/Android/Sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

Replace `YourUsername` with your Windows username.

### 2. Install ADB in WSL2

```bash
sudo apt update
sudo apt install adb
```

### 3. Configure Network Route

```bash
# Get WSL2 IP address
export WSL_HOST=$(hostname -I | awk '{print $1}')

# Run this in PowerShell as Administrator on Windows
powershell.exe "New-NetFirewallRule -DisplayName 'WSL' -Direction Inbound -LocalPort 19000-19006 -Action Allow -Protocol TCP"
```

## Running Your React Native App

### 1. Start the Android Emulator on Windows
Use AVD Manager in Android Studio or run this PowerShell command:

```powershell
& "C:\Program Files\Android\Android Studio\emulator\emulator.exe" -avd YourAVDName
```

Replace `YourAVDName` with the name of your Android Virtual Device.

### 2. Start Your Expo App in WSL2

```bash
cd apps/wk08-api
npx expo start
```

### 3. Connect to the Emulator
You have several options:

#### Option A: Using the Metro QR Code
1. Press 'w' to open in a browser
2. In the browser interface, click "Run on Android device/emulator"

#### Option B: Direct ADB Command

```bash
adb connect 127.0.0.1:5555
adb devices  # Verify connection
```

#### Option C: Expo CLI Command

```bash
npx expo run:android
```

## Troubleshooting WSL2 and Emulator Issues

### Issue: ADB Connection Problems

```bash
# Kill any existing ADB servers on both Windows and WSL2
adb kill-server

# Start ADB server on Windows first
# Then in WSL2:
adb -a nodaemon server start
```

### Issue: Metro Bundler Not Connecting

```bash
# Ensure correct IP address
export REACT_NATIVE_PACKAGER_HOSTNAME=$(hostname -I | awk '{print $1}')
npx expo start --clear
```

### Issue: Port Forwarding
If the emulator can't connect to Metro Bundler:

```bash
# In PowerShell (as Administrator):
netsh interface portproxy add v4tov4 listenport=19000 listenaddress=127.0.0.1 connectport=19000 connectaddress=$(wsl.exe hostname -I | awk '{print $1}')
```

### Issue: Hot Reloading Not Working
Try using the Expo Go app instead:

```bash
# Enable LAN access
npx expo start --lan
```

## Note on iOS Simulation

iOS simulation is **not possible** in WSL2 or Windows as it requires macOS. If you need to test on iOS:
- Use Expo Snack for web-based testing
- Consider a Mac or Mac cloud service (like MacStadium)
- Use Expo's Preview service

## For Your Specific Project

```bash
# Navigate to your project
cd apps/wk08-api

# Start with specific connection settings
export REACT_NATIVE_PACKAGER_HOSTNAME=$(hostname -I | awk '{print $1}')
npx expo start
```

This setup gives you the best of both worlds: Linux-based development environment with WSL2 Ubuntu while leveraging Windows for emulation capabilities.

# react-native-setup.md

# Software Installation and React Native Project Setup



## Software Installation

If you do not already have these tools installed, then please download and install NodeJS and Visual Studio Code.

1.	Visual Studio Code: https://code.visualstudio.com/
2.	NodeJS (LTS version): https://nodejs.org/en.


________________________________________


## Creating a new React Native Project with Expo


After installing VSCode and NodeJS, create new React Native project using your operating systemâ€™s command line prompt application (Terminal, cmd.exe, Powershell.exe, ect)


![alt text](./images/image.png)

Open your computerâ€™s command line application

`npx create-expo-app --template`


Using your keyboard UP and DOWN keys, select the Blank option and press ENTER

![alt text](./images/image-1.png)

Follow the on-screen instructions and wait for it to complete.

â—	You may be asked to install â€œcreate-expo-appâ€. If so, then type â€œyâ€, then press ENTER
![alt text](./images/image-2.png)

â—	You may be asked to enter the name of your app. If so, type a name for your project, then press ENTER. In the example below, we choose the name â€œsession01â€

 ![alt text](./images/image-3.png)

â—	Wait for the process to complete.

â—	When finished, the screen will look something like this:

![alt text](image-4.png)
________________________________________


## Run the React Native Project

After creating the project, we open the project and compile it into a format that can be deployed ot your phone.


1. Locate the folder that was created by the â€œnpx create-expo-appâ€ command


2. Open folder in Visual Studio Code:

 




â€ƒ
3. In VSCode, open the Terminal (Terminal > New Terminal)

 

4.  In Terminal, type:

`npx expo start`


You will see message like this:
```md
Starting project at /Users/jsmith/Desktop/my-app
Starting Metro Bundler

â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„â–„
â–ˆ â–„â–„â–„â–„â–„ â–ˆ â–€â–€â–„ â–„â–ˆâ–ˆâ–„â–ˆ â–„â–„â–„â–„â–„ â–ˆ
â–ˆ â–ˆ   â–ˆ â–ˆâ–ˆâ–ˆ â–„â–„ â–ˆâ–€â–ˆâ–ˆ â–ˆ   â–ˆ â–ˆ
â–ˆ â–ˆâ–„â–„â–„â–ˆ â–ˆ â–„â–„ â–ˆâ–ˆâ–ˆâ–ˆâ–„â–ˆ â–ˆâ–„â–„â–„â–ˆ â–ˆ
â–ˆâ–„â–„â–„â–„â–„â–„â–„â–ˆ â–ˆ â–€ â–ˆâ–„â–€ â–ˆâ–„â–„â–„â–„â–„â–„â–„â–ˆ
â–ˆ  â–„â–ˆâ–ˆ â–„â–€   â–ˆâ–ˆâ–€  â–ˆ  â–„â–„â–ˆâ–ˆ  â–ˆ
â–ˆâ–„ â–ˆ â–€ â–„  â–€â–ˆâ–„â–ˆâ–ˆâ–„â–„â–ˆ â–„ â–€â–„â–„â–ˆâ–„â–ˆ
â–ˆâ–ˆ â–€â–„â–€ â–„ â–€â–„â–ˆâ–„ â–ˆ â–€â–ˆ  â–„â–ˆâ–ˆâ–€ â–€â–ˆ
â–ˆâ–„â–„â–ˆ â–€ â–„â–ˆâ–€â–„â–„â–€ â–„ â–„â–ˆâ–ˆ â–„â–„â–„â–ˆâ–€â–„â–ˆ
â–ˆâ–„â–„â–ˆâ–„â–ˆâ–ˆâ–„â–ˆ â–„â–€â–ˆâ–„â–€   â–„â–„â–„  â–€â–ˆ â–ˆ
â–ˆ â–„â–„â–„â–„â–„ â–ˆâ–€â–„â–„â–„â–„â–„ â–ˆ â–ˆâ–„â–ˆ â–ˆâ–ˆâ–€â–„â–ˆ
â–ˆ â–ˆ   â–ˆ â–ˆâ–ˆâ–€â–€ â–ˆâ–ˆ â–„ â–„â–„   â–€ â–ˆâ–ˆ
â–ˆ â–ˆâ–„â–„â–„â–ˆ â–ˆ  â–„â–„â–„â–„â–„â–ˆâ–€â–€â–ˆ â–„â–ˆâ–ˆâ–„â–„â–ˆ
â–ˆâ–„â–„â–„â–„â–„â–„â–„â–ˆâ–„â–„â–„â–„â–ˆâ–ˆâ–„â–„â–„â–„â–„â–„â–„â–ˆâ–ˆâ–ˆâ–„â–ˆ


â€º Metro waiting on exp://10.164.196.18:19000
â€º Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

â€º Press a â”‚ open Android
â€º Press i â”‚ open iOS simulator
â€º Press w â”‚ open we

â€º Press j â”‚ open debugger
â€º Press r â”‚ reload app
â€º Press m â”‚ toggle menu

â€º Press ? â”‚ show all commands

```
________________________________________


## Running project on your real Android / IOS device:

1. Download â€œExpo Goâ€ from your phoneâ€™s App Store:

Use this link to find the app:
https://expo.dev/client

![alt text](./images/image-5.png)
 


2. After installation, connect your PHONE and COMPUTER to the same Wifi network

â—	In this example, we are connecting both the phone and laptop to a network called â€œCollegeWifi-GUESTâ€

| Computer	| Phone  |
 	 


3.  Scan the QR code that appears in the Terminal
â—	REMEMBER! Your computer and phone must be connected to the same Wifi Network!
â—	See below for instructions on Android vs. IOS!

 
### Android Users:
â—	Open the Expo Go App
â—	Choose Scan QR Code
![alt text](./images/image-6.png)
 


### IOS Users:

-	Open your Camera app\
-	Using your CAMERA app, scan the QR code
-	IOS may ask you if it can open the app using Expo Go. If yes, allow it to open in Expo Go.
n open the app using Expo Go. If yes, allow it to open in Expo Go.

4. App will download and install on your phone



If you see these messages, press â€œxâ€ to dismiss the popups

![alt text](./images/image-8.png)

Eventually, you will see the project output

 

________________________________________


Troubleshooting

You may encounter a message like this:

 

â—	Typically this happens when you are on a corporate internet (network that require you to sign in)

â—	If you see this message, try using â€œnpx expo start --tunnelâ€ to run the code
â—	If asked to install ngrok, then choose â€œyesâ€


 ```
npx expo start --tunnel
```
```
Starting project at /Users/zebra/Desktop/rn-gb/ui-demo
Some dependencies are incompatible with the installed expo version:
  @react-native-picker/picker@2.4.10 - expected version: 2.4.8
Your project may not work correctly until you install the correct versions of the packages.
Install individual packages by running npx expo install @react-native-picker/picker@2.4.8
Starting Metro Bundler
âœ” The package @expo/ngrok@^4.1.0 is required to use tunnels, would you like to install it globally? â€¦ yes
Installing @expo/ngrok@^4.1.0...
> npm install --global @expo/ngrok@^4.1.0
```




# react_native_app_summary.md

# React Native App Development Methodology Summary

## Core Principles

### 1. Declarative Programming
- Specifies what UI should look like, not how to create it
- Framework handles implementation details
- Components return UI elements directly
- Example: `apps/w01s02/App_Basic.js` shows basic declarative structure

### 2. Component-Based Architecture
- Everything is a reusable component
- Components are JavaScript functions returning UI elements
- Must return single root element
- Components can be basic or complex compositions
- Reference: `apps/w02s01-rules_of_react/App_Basic.js`

## Key Development Rules

### 1. Container Requirements
- Multiple elements must be wrapped in a container
- `<View>` is primary container element
- Every `<View>` is automatically a flex container
- Example: `apps/w02s02-flexbox/App_Basic.js`

### 2. Component Import Rules
- UI elements must be explicitly imported
- Common imports: View, Text, Image, Button, Pressable, Switch, TextInput
- Example: `apps/w01s02/App_Basic.js`

## Styling System

### 1. Basic Styling Methods
- Uses JavaScript objects for styles
- Can be inline or in StyleSheet.create()
- Properties use camelCase
- Reference: `apps/w02s02-styling/App_Basic.js`

### 2. Layout System (Flexbox)
- Primary layout mechanism
- Components:
  - Flex Container (`<View>`)
  - Flex Items (child elements)
- Key Properties:
  - flexDirection: "row" | "column"
  - justifyContent: Controls positioning
  - alignItems: Controls alignment
  - flex: Proportional space allocation
- Example: `apps/w02s02-flexbox/App_Basic.js`

## Navigation

### 1. Stack Navigation
- Sequential screen navigation
- Forward/backward movement
- Uses `@react-navigation/stack`
- Example: `apps/w07s01/App.js`

### 2. Tab Navigation
- Parallel screen switching
- No sequential movement
- Uses `@react-navigation/bottom-tabs`
- Example: `apps/w07s02-Final/App.js`

### 3. Nested Navigation
- Combines multiple navigation patterns
- Example: Stack within Tabs
- Reference: `apps/w07s02-Final/screens/HomeScreen.js`

## State Management

### 1. useState Hook
- Manages component-level state
- Triggers re-renders on updates
- Used for user input and UI updates
- Example: `apps/w07s02-Final/screens/AddScreen.js`

### 2. Component Lifecycle
- useEffect for side effects
- useFocusEffect for screen focus
- Cleanup functions for unmounting
- Reference: `apps/w07s02-Final/screens/HomeScreen.js`

## Lists and Data Display

### 1. FlatList Component
- Efficient list rendering
- Requires data array and renderItem
- Supports item separation and keys
- Example: `apps/w07s02-Final/screens/HomeScreen.js`

### 2. Conditional Rendering
- Uses ternary operators or logical AND
- Controls visibility of UI elements
- Based on state or props
- Reference: `apps/w07s02-Final/screens/HomeScreen.js`

## Platform Considerations

### 1. SafeAreaView
- Handles iOS notch spacing
- Platform-specific styling
- Example: `apps/w07s02-Final/App.js`

### 2. Platform-Specific Code
- Platform.OS checks
- Conditional styling
- Reference: `apps/w07s02-Final/screens/HomeScreen.js`

## Best Practices

### 1. Project Structure
- Separate screens directory
- Common modules for shared code
- Navigation configuration in App.js
- Example: `apps/w07s02-Final/` project structure

### 2. Component Organization
- Clear hierarchy
- Reusable components
- Proper prop passing
- Reference: All example projects

### 3. Style Organization
- StyleSheet.create() for reusable styles
- Inline styles for dynamic properties
- Consistent naming conventions
- Example: All example projects

## Dependencies


Here are the key dependencies used in the materials:

### 1. Core Navigation Dependencies:
```js
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/stack
npx expo install react-native-gesture-handler
npm install @react-navigation/bottom-tabs
```

- `@react-navigation/native`: Core navigation library for React Native apps
- `react-native-screens`: Provides native navigation screen containers
- `react-native-safe-area-context`: Handles safe area insets for different devices
- `@react-navigation/stack`: Enables stack-based navigation between screens
- `react-native-gesture-handler`: Provides native-driven gesture management
- `@react-navigation/bottom-tabs`: Implements bottom tab navigation

### 2. Icon Libraries:
```js
npm install @expo/vector-icons
```
- Provides access to various icon sets through Expo

### 3. Additional Expo Utilities:
- Enables tunneling for Expo development
```js
npm install @expo/ngrok
```


# wk02-styling.md

# BTP600 Wk2: Styling

## How to Add Styles to Elements

### Using inline styling
Styling applies to only the specified element, not any other element.
```js
<Text style={{ backgroundColor:"cyan", fontSize:40, padding:20}}>
Hello world!
</Text>
```

### Using the StyleSheet object
Styles can be reused on different elements.

1. Define a style in the StyleSheet object:
```js
const styles = StyleSheet.create({
   myText: {
    fontSize: 24,
    color: "#ff00ff",
    backgroundColor:"yellow",
    fontWeight:"bold",
    fontStyle:"italic",
    textAlign:"right"
  }
});
```
2. Apply the style to an element

```js
<Text style={styles.myText}>Open up App.js to start working on your app!</Text>
```

### Combining inline and reusable styles
An element can have both resuable and inline styles:
1. Create an array
```js
<Text style={ [] }>Hello</Text>
```

2. Add the reusable style
```js
<Text style={ [styles.myText] }>Hello</Text>
```

3. Add the inline style
```js
<Text style={ [styles.myText, {padding:20}] }>Hello</Text>
```

## Common Styling Properties

### Styling Text
fontSize:20
- Adjusts font size
- Uses the "sp" unit of measurement. 
- sp = scale independent pixels (https://m1.material.io/layout/units-measurements.html)
color:"#fff000"
- Sets the text color
- Can use predefined web colors or hex colors
backgroundColor:"#fff000"
- Sets the text color
- Can use predefined web colors or hex colors
textAlign:"left"|"center"|"right"|"justify"
- Aligns text within a container
textDecorationLine:"underline"
- Add an underline to the text
fontWeight:"bold"
- Sets the text to bold 
fontStyle:"italic"
- Adds italics to the text

### Controlling Whitespacing and Borders
padding:20
- Adds the same padding to all 4 sides of an element
- Use paddingLeft, paddingRight, paddingTop, paddingLeft to individually control the padding on each side of the element.
margin:20
- Adds the same margin to all 4 sides of an element
- Use marginLeft, marginRight, marginTop, marginBottom properties to individually control the margin on each side
borderWidth:1, borderColor:"#000000"
- Adds a border of the specified color with the specified thickness (width)

### Heights and Widths
height:20
- Adjusts the height of an element
- Uses dp (density independent pixels) as the unit of measurement (https://m1.material.io/layout/units-measurements.html)
width:20
- Adjusts the width of an element
- Uses dp (density independent pixels) as the unit of measurement (https://m1.material.io/layout/units-measurements.html)

### Images
resizeMode:"center"
- Controls how the image is scaled within the <Image/> element
- See options here: https://reactnative.dev/docs/image-style-props#resizemode
- Examples of different resize mode options: (credit: https://www.oreilly.com/library/view/learning-react-native/9781491929049/ch04.html)
![alt text](./images/wk2/B/image.png)

#### Contain vs. Center
-  contain will scale the image (up or down) so that the whole image is â€œcontainedâ€ in the view component at the maximum scale possible.
- center will scale the image down only if itâ€™s bigger than the component. Otherwise, it will just show the image in the original scale.
 

Credit: https://medium.com/@nima-ahmadi/react-native-image-resizemode-a-visual-guide-f1958d27c615


### Layout
Layout is controlled using a system similar to CSS Flexbox

To use flexbox:
1. Identify the elements that should be repositioned
- These elements are known as flex items
2. Surround elements in a container element (example: <View>)
- The container is known as a flex container
3. Apply the flex properties to control the flex items

#### Layout Properties:
`flexDirection:"row"|"column"|"column-reverse"|"row-reverse"`
- Sets the direction of the flex items to a single row or a single column
- Column reverse and row reverse will position the flex items in the reverse order that the code is written in

`justifyContent:"flex-start"|"center"|"flex-end"`
- Describes the position within the container that flex items will be placed
- flex-start: put flex items at beginning of the container
- flex-end: put flex items at the end of the container
- center: If direction = row, then put flex items in the horizontal center of the container. If direction="column", then put items in the vertical center of the container

`justifyContent:"space-between"|"space-evenly"|"space-around"`
- Automatically positions items with whitespacing between each element

![alt text](./images/wk2/B/image-1.png)
Credit: https://www.samanthaming.com/flexbox30/12-justify-content-row/

![alt text](./images/wk2/B/image-2.png)
Credit: https://www.samanthaming.com/flexbox30/14-space-around-vs-space-evenly/

`flex:8`

- Sets the percentage or proportion of the screen or parent element that a flex element will occupy
- Must be applied to the flex item
- Assume you have 3 flex items with: flex:1, flex:2, flex:1
- The total is 1+2+1 = 3
- Item #1 will occupy 1/4 of the parent container
- Item #2 will occupy 2/4 of the parent container
- Item #3 will occupy 1/4 of the parent container




# wk02s01-rules_of_react.md

# BTP610: Wk2S01
# Rules of REACT

- React is a declarative framework used to create user interfaces

- User interface elements are called a component
- A component can be composed of other component
    -  Components can be basic/individual user interface elements (text, image, button)
    -  Components can be composed of other things (navbar, menu, form)
    -  Components can represent an entire page or a screen

- A component is represented in code as a function
- The function return the user interface elements that make up the component

- A function can only return 1 user interface element
![alt text](./images/wk2/imageA.png)


- If you need to have more than 1 element on your page/screen/component, then your function must return an appropriate container element

	Inside that container element, you put your other components


- In react native, there is only 1 container element to use:  
`<View></View>`
â€ƒ
## Rules of React Native
- React Native consists of a library of built-in components:
    -  View
    -  Text
    -  Image
    -  ImageBackground
    -  Button
    -  Pressable
    -  Switch
    -  TextInput

To use an element:
1.	Import the element
2.	Use the element in the functionâ€™s return statement
â€ƒ
### Example:
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <Text style={{fontSize:30}}>Hello</Text>
     <Text style={{fontSize:20}}>Hello</Text>     
     <Text style={{fontSize:50}}>Hello</Text> 
     <Text style={{fontSize:20, fontWeight:"bold"}}>Hello - bold</Text>     
     <Text style={{fontSize:20, fontStyle:"italic"}}>Hello - italic</Text>  
     <Text style={{fontSize:20, textDecorationLine:"underline"}}>Hello - underline</Text>     
     <Text style={{fontSize:20, color:"blue"}}>Hello - blue</Text>
     <Text style={{fontSize:20, color:"#00FF00"}}>Hello - blue in hex</Text>  
     <Text style={{fontSize:20, backgroundColor:"yellow"}}>Hello - yellow</Text>     
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
```
â€ƒ
### Example: Border
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <Text style={{fontSize:30}}>Hello</Text>
     <Text style={{fontSize:20}}>Hello</Text>     
     <Text style={{fontSize:50}}>Hello</Text> 
     <Text style={{fontSize:20, fontWeight:"bold"}}>Hello - bold</Text>     
     <Text style={{fontSize:20, fontStyle:"italic"}}>Hello - italic</Text>  
     <Text style={{fontSize:20, textDecorationLine:"underline"}}>Hello - underline</Text>     
     <Text style={{fontSize:20, color:"blue"}}>Hello - blue</Text>
     <Text style={{fontSize:20, color:"#00FF00"}}>Hello - blue in hex</Text>  
     <Text style={{fontSize:20, backgroundColor:"yellow"}}>Hello - yellow</Text> 

     {/* border */}
     <Text style={{fontSize:20, borderWidth:1}}>Hello - border 1</Text> 
     <Text style={{fontSize:20, borderWidth:5}}>Hello - border 5</Text> 
     <Text style={{fontSize:20, borderWidth:5, borderColor:"magenta"}}>
       Hello - border 5 with magenta
     </Text>
     <Text style={{fontSize:20, borderWidth:5, borderColor:"blue", borderStyle:"dashed"}}>
       Hello - border 5 with magenta
     </Text> 

   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
```
â€ƒ
### Example: Padding
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <Text style={{fontSize:30}}>Hello</Text>
     <Text style={{fontSize:20}}>Hello</Text>     
     <Text style={{fontSize:50}}>Hello</Text> 
     <Text style={{fontSize:20, fontWeight:"bold"}}>Hello - bold</Text>     
     <Text style={{fontSize:20, fontStyle:"italic"}}>Hello - italic</Text>  
     <Text style={{fontSize:20, textDecorationLine:"underline"}}>Hello - underline</Text>     
     <Text style={{fontSize:20, color:"blue"}}>Hello - blue</Text>
     <Text style={{fontSize:20, color:"#00FF00"}}>Hello - blue in hex</Text>  
     <Text style={{fontSize:20, backgroundColor:"yellow"}}>Hello - yellow</Text> 

     {/* border */}
     <Text style={{fontSize:20, borderWidth:1}}>Hello - border 1</Text> 
     <Text style={{fontSize:20, borderWidth:5}}>Hello - border 5</Text> 
     <Text style={{fontSize:20, borderWidth:5, borderColor:"magenta"}}>
       Hello - border 5 with magenta
     </Text>
     <Text style={{fontSize:20, borderWidth:5, borderColor:"blue", borderStyle:"dashed"}}>
       Hello - border 5 with magenta
     </Text> 

     {/* margin / padding */}

     <Text style={{fontSize:20, borderWidth:1, padding:20}}>
       Hello - padding
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, paddingTop:20}}>
       Hello - padding
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, paddingBottom:20}}>
       Hello - padding
     </Text>
     <Text style={{fontSize:20, borderWidth:1, paddingLeft:20}}>
       Hello - padding
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, paddingRight:20}}>
       Hello - padding
     </Text>
     <Text style={{fontSize:20, borderWidth:1, paddingLeft:20, paddingRight:20}}>
       Hello - padding
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, paddingHorizontal:20}}>
       Hello - padding
     </Text>
     <Text style={{fontSize:20, borderWidth:1, paddingVertical:20}}>
       Hello - padding
     </Text> 
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
```
â€ƒ
### Example: Margin
```js 
<Text style={{fontSize:20, borderWidth:1}}>
       Hello - regular
     </Text> 
    
     <Text style={{fontSize:20, borderWidth:1, marginTop:40, marginBottom:40}}>
       Hello - margin to, margin btoom
     </Text> 

     <Text style={{fontSize:20, borderWidth:1, marginLeft:40}}>
       Hello sdfsdfsdfsdfsdfsdjdjfk jskdf;jsdfkl sjdfkl sd;klfj jsdklfj skldfjsdfdsf
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, marginRight:40}}>
       Hello sdfsdfsdfsdfsdfsdjdjfk jskdf;jsdfkl sjdfkl sd;klfj jsdklfj skldfjsdfdsf
     </Text> 
     <Text style={{fontSize:20, borderWidth:1, marginVertical:40}}>
       margin vertical
     </Text>

     <Text style={{fontSize:20, borderWidth:1, marginHorizontal:40}}>
       margin horizontal margin horizontal margin horizontal margin horizontal margin horizontal margin horizontal margin horizontal margin horizontal
     </Text>

     <Text style={{fontSize:20, borderWidth:1, margin:60}}>
      margin on all 4 sides margin on all 4 sides margin on all 4 sides margin on all 4 sides margin on all 4 sides margin on all 4 sides margin on all 4 sides margin on all 4 sides
     </Text>
```
#### Result:
![alt text](./images/wk2/image-1A.png)


## Layout Styling Properties

Layout is the process of arranging elements on the screen in a desired position.

In React Native, elements can be arranged the following directions:

- Row:  		Arranges a group of elements horizontally
- Column:		Arranges a group of elements vertically.

We use the concept of CSS Flex to arrange elements

In CSS Flex:
1.	Create a container									(flex-container)
2.	In the container (View), add items you want to arrange			(flex-items)
3.	On the container, use flexbox properties to control the layout of the items:

- flexDirection
- gap
- justifyContent
    -  flex-start | center | flex-end
    -  space-between | space-around | space-evenly
- alignItems
    -  flex-start | center | flex-end
    -  space-between | space-around | space-evenly
â€ƒ
### Starter:
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <Text style={{borderWidth:1, fontSize:20}}>Apple</Text>
     <Text style={{borderWidth:1, fontSize:20}}>Banana</Text>
     <Text style={{borderWidth:1, fontSize:20}}>Carrot</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
```

### Example:
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>

     <Text style={{borderWidth:1, fontSize:20}}>List of Fruits</Text>

     <View style={{borderWidth:5, borderColor:"magenta", flexDirection:"row"}}>
       <Text style={{borderWidth:1, fontSize:20}}>Apple</Text>
       <Text style={{borderWidth:1, fontSize:20}}>Banana</Text>
       <Text style={{borderWidth:1, fontSize:20}}>Carrot</Text>
     </View>

     <Text style={{borderWidth:1, fontSize:20}}>Donut</Text>
     <Text style={{borderWidth:1, fontSize:20}}>Eggplant</Text>
     <Text style={{borderWidth:1, fontSize:20}}>Fish</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});

```
â€ƒ

# wk02s02-flexbox.md


# BTP610
# Wk02S02: Flexbox

## Flexbox Review

- Use the style attribute to apply styles to individual elements

- Layout is configured using CSS Flexbox. 

- In Flexbox:

a.	In your code, locate the elements you want to arrange in a row or column

b.	Surround the elements in a <View></View> element. 
-  The <View> element becomes known as a flex container
-  The elements inside the container are known as flex items

c.	On the flex container, apply flexbox properties to control the look and feel of the flex items
- flexDirection: "row" | "column"		
â†’ layout in a row or column
â†’ If you do NOT specify the flexDirection property, then in React Native, the default will be set to column
- gap:20					â†’ add a space between the items of 20
- justify-content				â†’ automatically position items in the container
â€ƒ
## What is a Flex Container?

In HTML, a container element becomes a â€œflex containerâ€ when the display:flex property is applied:

**Not a flex container**	
```html
<div>
     <p>a</p>
     <p>b</p>
     <p>c</p>
</div>	
```
**Is a flex container:**
```html
<div style="display: flex;">
     <p>a</p>
     <p>b</p>
     <p>c</p>
</div>
```

In React Native, all <View> elements are flex containers.

This is because the <View> element automatically has the display:flex; property attached to it.

### Example:  Flex Containers and Flex items
```js
export default function App() {
 return (
   {/* flex container*/}
   <View style={styles.container}>
       {/* flex container*/}
       <View>
         {/* total number of flex items is 3 */}
         <Text>Apple</Text>         
         <Text>Banana</Text>
         <Text>Carrot</Text>
       </View>   

       {/* flex container */}
       <View style={{flexDirection:"row"}}>
         {/* total number of flex items is 2 */}
         <Text>Toronto</Text>
         <Text>Montreal</Text>
       </View>

   </View>
 );
}
```
#### Result
![alt text](./images/wk2/image.png)

Because every <View> automatically has the display:flex property applied, then every <View> is a flex container. In the example above:

- There are 3 <Views>.  Therefore, there are 3 flex containers
- The elements in each <View> is considered a flex item.

![alt text](./images/wk2/image-1.png)
![alt text](./images/wk2/image-2.png)

![alt text](./images/wk2/image-3.png)

### Excercise

**How many flex items are in each flex containerHow many flex items are in each flex container?**


1.	How many flex containers are present?
2.	How many flex items are in each container?

```js

import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   // {When you look at the code for a View,
   // they already put display:flex on that element
   // they also put flexDirection:"column"}
   <View style={styles.container}>
       <View style={{borderWidth:1, borderColor:"magenta"}}>
         <Text>Hello world</Text>
         {/* total number of flex items is 3 */}
         <Text>Apple</Text>         
         <Text>Banana</Text>
         <Text>Carrot</Text>
         <View style={{flexDirection:"row", borderWidth:1, borderColor:"brown"}}>
           {/* total number of flex items is 2 */}
           <Text>Toronto</Text>
           <Text>Montreal</Text>
           <View style={{flexDirection:"row", borderWidth:1, borderColor:"brown"}}>
             {/* total number of flex items is 2 */}
             <Text>Toronto</Text>
             <Text>Montreal</Text>
           </View>
         </View>
       </View>   
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection:"column-reverse",
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
   borderWidth:10,
   borderColor:"yellow",
 },
});
```
## Positioning and Spacing

In this section, we discuss:
1.	How to position elements inside the flex container
2.	How to control the spacing between elements in the flex container

Use this starter code to follow along:

```js
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{flexDirection:"row",
                     borderWidth:1,
                     borderColor:"magenta",
                     width:"100%",
                     paddingVertical:20}}>
         <Text style={{borderWidth:1}}>Apple</Text>        
         <Text style={{borderWidth:1}}>Banana</Text>        
         <Text style={{borderWidth:1}}>Carrot</Text>        
       </View>          
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection:"column",
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',   
 }, 
});
```
![alt text](./images/wk2/image-4.png) 

NOTE: The following examples assume the the flexDirection = row!!!!!

### Space between each flex item:

By default, there is no space between each flex item. The space can be controlled using the properties:

- gap		
â†’ sets the space to a fixed amount
- justifyContent: space-between | space-around | space-evenly
â†’ automatically calculates the space between each flex item
â†’ the spacing is responsive (so if screen size changes, then space adjusts)

#### 1. Fixed spacing

- To set the space to a fixed amount, use the gap property. 

`<View style={{flexDirection:"row", gap:45}}></View>`

- The amount of space is fixed. This means that gap:45 will appear differently on devices with smaller  versus. larger screen sizes.


##### Example:  Add a space of 20 between each flex item

```js
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{flexDirection:"row",
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     paddingVertical:20,
                     gap:20}}>
         <Text style={{borderWidth:1}}>Apple</Text>        
         <Text style={{borderWidth:1}}>Banana</Text>        
         <Text style={{borderWidth:1}}>Carrot</Text>        
       </View>          
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection:"column",
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',   
 }, 
});

```
![alt text](./images/wk2/image-5.png)

#### Responsive spacing

The justifyContent property is use to automatically calculate the amount of space between each flex item.  

This is useful when you want the spacing to be responsive to the device screen size.

##### `justifyContent:"space-between"`

- First item goes to the start of the container
- Last item goes to the end of the container
- All other items are equally distributed in between the first and last item

![alt text](./images/wk2/image-6.png)

##### `justifyContent:"space-evenly"`
- Same amount of space around each element

![alt text](./images/wk2/image-7.png)

##### `justifyContent:"space-around"`
- Similar to space-evenly, but uses a different formula for calculating the space around the first and last item.

![alt text](./images/wk2/image-8.png)

### Position of flex items inside the flex container

`justifyContent` is also used to position flex items within the container.   There are 3 possible values:
`justifyContent: flex-start | center | flex-end`

When flex-direction = row, the default position of the flex items is at the beginning of the flex 
container.

- Beginning is usually the left side
- This is known as the flex-start position

![alt text](./images/wk2/image-9.png)

#### Example:  Demonstrating the default position is flex-start


- If you include flex-start, then the items are positioned at the beginning of the container
- If you do NOT include flex-start, you get the same result
- This demonstrates that the default position of items is flex-start.
```js
export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{flexDirection:"row",
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     paddingVertical:20,
                     justifyContent:"flex-start"}}>
         <Text style={{borderWidth:1}}>Apple</Text>        
         <Text style={{borderWidth:1}}>Banana</Text>        
         <Text style={{borderWidth:1}}>Carrot</Text>        
       </View>          
   </View>
 );
}
```

##### `justifyContent:"center"`

- Items are automatically moved to the center of the flex container:
![alt text](./images/wk2/image-10.png)

```js
export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{flexDirection:"row",
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     paddingVertical:20,
                     justifyContent:"center"}}>
         <Text style={{borderWidth:1}}>Apple</Text>        
         <Text style={{borderWidth:1}}>Banana</Text>        
         <Text style={{borderWidth:1}}>Carrot</Text>        
       </View>          
   </View>
 );
}

```

##### `justifyContent:"flex-end"`
- Items are automatically moved to the end of the flex container:

```js
export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{flexDirection:"row",
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     paddingVertical:20,
                     justifyContent:"flex-end"}}>
         <Text style={{borderWidth:1}}>Apple</Text>        
         <Text style={{borderWidth:1}}>Banana</Text>        
         <Text style={{borderWidth:1}}>Carrot</Text>        
       </View>          
   </View>
 );
}
```
![alt text](./images/wk2/image-11.png)

#### justifyContent for positioning AND spacing
NOTE:  The justify-content values for positioning CANNOT be combined with the justify-content values for spacing.


##### Example: This will NOT work
```js
export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{flexDirection:"row",
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     paddingVertical:20,
                     justifyContent:"flex-end"
  justifyContent:"space-around"}}>
         <Text style={{borderWidth:1}}>Apple</Text>        
         <Text style={{borderWidth:1}}>Banana</Text>        
         <Text style={{borderWidth:1}}>Carrot</Text>        
       </View>          
   </View>
 );
}
```
In this example, ReactNative will choose the last definition of justifyContent (justifyContent:space-around) and ignore flex-end.


â€ƒ
## Practice #1: Combining gap and justify content

- Using justify-content and gap, create a menu that is centered & with space between each item
- For the menu items, use <Text> elements
- You only need 3-4 menu items

![alt text](./images/wk2/image-12.png)

```js
export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{flexDirection:"row",
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     paddingVertical:20,
                     justifyContent:"center",
                     gap:30}}>
         <Text style={{borderWidth:1}}>Discover</Text>        
         <Text style={{borderWidth:1}}>Quests</Text>        
         <Text style={{borderWidth:1}}>Safety</Text>
         <Text style={{borderWidth:1}}>Support</Text>
       </View>          
   </View>
 );
}
```

## Practice #2: Using only justify-content

Using only justify-content, create this menu:
![alt text](./images/wk2/image-13.png)
```js
export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{flexDirection:"row",
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     paddingVertical:20,
                     justifyContent:"space-evenly"}}>
         <Text style={{borderWidth:1}}>Discover</Text>        
         <Text style={{borderWidth:1}}>Quests</Text>        
         <Text style={{borderWidth:1}}>Safety</Text>
         <Text style={{borderWidth:1}}>Support</Text>
       </View>          
   </View>
 );
}
```

## What happens if `flexDirection:column`?

To visualize the gap and the justifycontent properties, you must ensure your flex container has a height

### Example:
```js
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     height:"50%",
                     paddingVertical:20,
                     flexDirection:"column",                         
                     }}>
         <Text style={{borderWidth:1}}>Discover</Text>        
         <Text style={{borderWidth:1}}>Quests</Text>        
         <Text style={{borderWidth:1}}>Safety</Text>         
       </View>         
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection:"column",
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',   
 }, 
});
```
![alt text](./images/wk2/image-14.png)

### Gap
```js
<View style={styles.container}>
       <View style={{
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     height:"50%",
                     paddingHorizontal:20,
                     flexDirection:"column",
                     gap:100,                                              
                     }}>
         <Text style={{borderWidth:1}}>Discover</Text>        
         <Text style={{borderWidth:1}}>Quests</Text>        
         <Text style={{borderWidth:1}}>Safety</Text>         
       </View>         
   </View>
```
![alt text](./images/wk2/image-15.png)

### justify content + column

flex-start:		top of the container
flex-end:		bottom of the container
center:		middle of the container

```js
<View style={styles.container}>
       <View style={{
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     height:"50%",
                     paddingHorizontal:20,
                     flexDirection:"column",
                     justifyContent:"flex-end"                                          
                     }}>
         <Text style={{borderWidth:1}}>Discover</Text>        
         <Text style={{borderWidth:1}}>Quests</Text>        
         <Text style={{borderWidth:1}}>Safety</Text>         
       </View>         
   </View>
```
![alt text](./images/wk2/image-16.png)

### justify-content for spacing + column

space-between
space-evenly
space-around
```js
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{
                     borderWidth:2,
                     borderColor:"magenta",
                     width:"100%",
                     height:"50%",
                     paddingHorizontal:20,
                     flexDirection:"column",
                     justifyContent:"space-around"
                     }}>
         <Text style={{borderWidth:1}}>Discover</Text>        
         <Text style={{borderWidth:1}}>Quests</Text>     
         <Text style={{borderWidth:1}}>Quests</Text>        
         <Text style={{borderWidth:1}}>Safety</Text>         
       </View>         
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection:"column",
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',   
   borderWidth:10,
   borderColor:"orange",
 }, 
});
```
![alt text](./images/wk2/image-17.png)

Which property controls the height of the parent container (orange box)?

The flex:1 property is used to automatically calculate the amount of space the element will occupy on the screen

Direction = column, space = height (flex:1 controls the height of the that element)
Direction = row, space = width (flex:1 controls the width of the element)

![alt text](./images/wk2/image-18.png)

![alt text](./images/wk2/image-19.png)

![alt text](./images/wk2/image-20.png)

#### Final Code:
```js
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (   
   <View style={styles.container}>
       <View style={{backgroundColor:"orange", width:"100%", flex:25}}>
         <Text>Box 1</Text>
       </View>
       <View style={{backgroundColor:"cyan", width:"100%", flex:5}}>
         <Text>Box 2</Text>
       </View>
       <View style={{backgroundColor:"#7158e2", width:"100%", flex:45}}>
         <Text>Box 2</Text>
       </View> 
       <View style={{backgroundColor:"#32ff7e", width:"100%", flex:7}}>
         <Text>Box 2</Text>
       </View> 
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
 
   flexDirection:"column",
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',   
   borderWidth:10,
   borderColor:"magenta",
   height:500,
   height:"100%",   
   flex:1   
 }, 
});
```



# wk03-layout_excercises.md

# BTP610: Layout Exercises

## Starter Code:

```js
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <Text>Open up App.js to start working on your app!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   marginTop:60,
   marginHorizontal:10,
   borderWidth:1,
   borderColor:"blue",
 },
});
```

### Review:
1.	Find the elements that you want to arrange in a row or column
2.	Surround the elements in a container element (example: <View>)
3.	On the container element (`<View>`), apply the flexbox properties:
	- flexDirection: row | column
	- justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly
	- align-items: center
	- gap:25

## Exercise 1: Colored Boxes

Create a row with 3 boxes 
- Label the boxes â€œOneâ€, â€œTwoâ€, and â€œThreeâ€
- Each box is is 50 width and 50 height
- Each box has a different background color 
- Around each box, apply a margin of 8
- Position the boxes at the end of the row.
![alt text](./images/wk3/image.png)

### Solution:

1. Create the boxes

Choose colors from here: https://flatuicolors.com/

2. Update the layout of the boxes
â€ƒ
## Exercise 2: Three Rows of Colored Boxes

Create 3 rows.

- Each row should have 3 boxes as described in the previous exercise.
- Each row should have a different main axis alignment (justify-content)
![alt text](./images/wk3/image-1.png)

### Solution:
```js
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
return (
  <View style={styles.container}>    
     <View style={{flexDirection:"row", justifyContent:"flex-end", borderWidth:1, marginVertical:10}}>       
       <Text style={{backgroundColor:"#12CBC4", height:50, width:50, fontSize:20, margin:8}}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
     <View style={{flexDirection:"row", justifyContent:"center", borderWidth:1, marginVertical:10}}>
       <Text style={{backgroundColor:"#12CBC4", height:50, width:50, fontSize:20, margin:8}}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
     <View style={{flexDirection:"row", justifyContent:"flex-start", borderWidth:1, marginVertical:10}}>
       <Text style={{backgroundColor:"#12CBC4", height:50, width:50, fontSize:20, margin:8}}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
  </View>
);
}


const styles = StyleSheet.create({
container: {
  marginTop:60,
  marginHorizontal:10,
  borderWidth:1,
  borderColor:"blue",
},
});
```

### Creating a reusable style for the blue box (box#1 in each row)
```js
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
return (
  <View style={styles.container}>    
     <View style={{flexDirection:"row", justifyContent:"flex-end", borderWidth:1, marginVertical:10}}>       
       <Text style={styles.blueBox}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
     <View style={{flexDirection:"row", justifyContent:"center", borderWidth:1, marginVertical:10}}>
       <Text style={styles.blueBox}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
     <View style={{flexDirection:"row", justifyContent:"flex-start", borderWidth:1, marginVertical:10}}>
       <Text style={styles.blueBox}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
  </View>
);
}


const styles = StyleSheet.create({
container: {
  marginTop:60,
  marginHorizontal:10,
  borderWidth:1,
  borderColor:"blue",
},
blueBox: {
 backgroundColor:"#0a3d62",
 height:50,
 width:50,
 fontSize:20,
 margin:8
}
});

```
### Combining reusable and inline styles

```js
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
return (
  <View style={styles.container}>    
     <View style={[styles.myRow, {justifyContent:"flex-end"}]}>       
       <Text style={styles.blueBox}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
    
     <View style={[styles.myRow, {justifyContent:"center"}]}>             
       <Text style={styles.blueBox}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
    
     <View style={[styles.myRow, {justifyContent:"flex-start"}]}>
       <Text style={styles.blueBox}>One</Text>
       <Text style={{backgroundColor:"#D980FA", height:50, width:50, fontSize:20, margin:8}}>Two</Text>
       <Text style={{backgroundColor:"#F79F1F", height:50, width:50, fontSize:20, margin:8}}>Three</Text>     
     </View>
  </View>
);
}


const styles = StyleSheet.create({
container: {
  marginTop:60,
  marginHorizontal:10,
  borderWidth:1,
  borderColor:"blue",
},
blueBox: {
 backgroundColor:"#0a3d62",
 height:50,
 width:50,
 fontSize:20,
 margin:8
},
myRow: {
 flexDirection:"row",
 borderWidth:1,
 marginVertical:10
}

});
```
### Example 2: 
```js
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
return (
  <View style={styles.container}>    
     <View style={[styles.myRow, {justifyContent:"flex-end"}]}>       
       <Text style={styles.blueBox}>One</Text>
       <Text style={[styles.box, {backgroundColor:"#D980FA"}]}>Two</Text>     
       <Text style={[styles.box, {backgroundColor:"#F79F1F"}]}>Three</Text>     
     </View>
    
     <View style={[styles.myRow, {justifyContent:"center"}]}>             
       <Text style={styles.blueBox}>One</Text>
       <Text style={[styles.box, {backgroundColor:"#D980FA"}]}>Two</Text>  
       <Text style={[styles.box, {backgroundColor:"#F79F1F"}]}>Three</Text>     
     </View>
    
     <View style={[styles.myRow, {justifyContent:"flex-start"}]}>
       <Text style={styles.blueBox}>One</Text>
       <Text style={[styles.box, {backgroundColor:"#D980FA"}]}>Two</Text>  
       <Text style={[styles.box, {backgroundColor:"#F79F1F"}]}>Three</Text>     
     </View>
  </View>
);
}


const styles = StyleSheet.create({
container: {
  marginTop:60,
  marginHorizontal:10,
  borderWidth:1,
  borderColor:"blue",
},
blueBox: {
 backgroundColor:"#0a3d62",
 height:50,
 width:50,
 fontSize:20,
 margin:8
},
myRow: {
 flexDirection:"row",
 borderWidth:1,
 marginVertical:10
},
box: {
 height:50,
 width:50,
 fontSize:20,
 margin:8
}

});
```
## Exercise 3: Skillup

Create an â€œAbout Usâ€ page for an education app.  

The screen contains a column with:
- The name of the app 		(Skillup)
- Description of the app		(Choose from 210,000 courses)
- App Website			(Find us at www.skillup.com)

The Column has padding on all sides.
![alt text](./images/wk3/image-2.png)

Credit: https://dribbble.com/shots/24507418-Skills-Up-branding

![alt text](./images/wk3/image-3.png)

1. Create the elements and add some borders so you can see where the containers are:

```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <View style={{borderWidth:1}}>
       <Text>SkillUp</Text>
       <Text>Choose from 2100 courses</Text>
       <Text>Find us at SkillUp.com</Text>
     </View>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
   borderWidth:10,
   borderColor:"magenta",
 },
});
```
![alt text](./images/wk3/image-4.png)


2. Delete the justifycontent and alignitems properties form teh .container, because they are not helping us:

```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <View style={{borderWidth:1, height:"100%"}}>
       <Text>SkillUp</Text>
       <Text>Choose from 2100 courses</Text>
       <Text>Find us at SkillUp.com</Text>
     </View>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   borderWidth:10,
   borderColor:"magenta", 
 },
});
```
![alt text](./images/wk3/image-5.png)


3. Create the space between each element

After much trial and error, we concluded that on an iPhone15, the gap of 385 looks correct:
- It may not look the same on other phones
- If you change the text size, the gap will change as well

You will encounter similar issues if you use marginVertical on the #2 <Text>
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <View style={{borderWidth:1, height:"100%", gap:385}}>
       <Text>SkillUp</Text>
       <Text>Choose from 2100 courses</Text>
       <Text>Find us at SkillUp.com</Text>
     </View>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   borderWidth:10,
   borderColor:"magenta", 
 },
});
```
â€ƒ
**Redo with justify content**
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <View style={{borderWidth:1, height:"100%", justifyContent:"space-between"}}>
       <Text>SkillUp</Text>
       <Text>Choose from 2100 courses</Text>
       <Text>Find us at SkillUp.com</Text>
     </View>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   borderWidth:10,
   borderColor:"magenta", 
 },
});
```

![alt text](./images/wk3/image-6.png)

**Padding around the entire container**
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <View style={{borderWidth:1, height:"100%", justifyContent:"space-between"}}>
       <Text>SkillUp</Text>
       <Text>Choose from 2100 courses</Text>
       <Text>Find us at SkillUp.com</Text>
     </View>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   borderWidth:10,
   borderColor:"magenta",
   padding:20,
 },
});
```

**Apply a text size and background color**
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 return (
   <View style={styles.container}>
     <View style={{borderWidth:1, height:"100%", justifyContent:"space-between"}}>
       <Text style={{fontSize:28, textAlign:"center"}}>SkillUp</Text>
       <Text style={{fontSize:60, textAlign:"center"}}>Choose from 2100 courses</Text>
       <Text style={{fontSize:28, textAlign:"center"}}>Find us at SkillUp.com</Text>
     </View>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#D6A2E8",
   borderWidth:10,
   borderColor:"magenta",
   padding:20,
 },
});
```
![alt text](./images/wk3/image-7.png)

## Exercise

**What is the code to produce this layout?**

- For the outside <View>:		
    - justify-content:â€centerâ€;
- For the yellow <View>:
    - flexDirection:â€rowâ€
    - justify-content:â€flex-endâ€

![alt text](./images/wk3/image-8.png)

## Exercise 4:   Welcome Screen

Create a Welcome screen for a mobile application:
![alt text](./images/wk3/image-9.png)

The screen must display a column containing:
- A image file 		(choose any image that is local on your computer)
- A â€œWelcomeâ€ text
- A welcome message

All elements must be centered on the screen. You must use justifyContent and/or alignItems to center the items.

### Solution:
1. Put the images in the assets folder:
![alt text](./images/wk3/image-10.png)
2. Write the code:

```js 
import { StyleSheet, Text, View, Image} from 'react-native';

export default function App() {
 return (
   <View style={[styles.container, {justifyContent:"center", alignItems:"center", gap:10}]}>
     <Image
       source={require("./assets/shape01.png")}
       style={{width:200, height:200, borderWidth:1}}
     />
     <Text style={{borderWidth:1, fontSize:40, fontWeight:"bold"}}>Welcome</Text>
     <Text style={{borderWidth:1, fontSize:20, fontStyle:"italic"}}>We are so glad you are here</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff200",
   borderWidth:10,
   borderColor:"magenta",    
   marginTop:60,
 },
 centered: {
   // textAlign:"center"
 }
});
```

## Exercise 5: Game Box

Create a screen that displays information about a game

The screen must show:
- Game Image
- Category (action, adventure, sports, etc)
- Game name 	

Enclose the game information in a container that has:
- A black border
- Padding 
- White background 

Here is a sample image:
https://www.cbc.ca/kids/images/bouncing_ball_v2_thumb_1050.jpg
![alt text](./images/wk3/image-11.png)
	 
## Exercise 6: Google Search Page Header

Create a screen that mimics the homepage of the Google search app:
The screen contains 2 rows.

Row 1 shows:
- Text labeled â€œGmailâ€
- Text labeled â€œImagesâ€
- Image for the â€œappsâ€
- Text containing the initials of a personâ€™s name. In the example below, the personâ€™s initials are â€œKPâ€
    - The Text should be styled a a circle with a background color
	
Row 2 shows:
- A Google â€œdoodleâ€ image: https://www.google.com/logos/doodles/2023/2023-womens-world-cup-opening-day-6753651837110060-2xa.gif


Icons come form here:
https://icons.expo.fyi/Index
![alt text](./images/wk3/image-12.png)

### Solution

1.	Put elements on the car
```js
import { StyleSheet, Text, View, Image} from 'react-native';

export default function App() {
 return (
   <View style={[styles.container]}>
     <View>
       <Text>Gmail</Text>
       <Text>Images</Text>
       <Text>Dots</Text>
       <Text>KP</Text>
     </View>
     <Image
       source={{uri:"https://www.google.com/logos/doodles/2023/2023-womens-world-cup-opening-day-6753651837110060-2xa.gif"}}
       style={{height:100, width:100}} 
     />
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,   
   borderWidth:10,
   borderColor:"magenta",    
   marginTop:60,
 },
 centered: {
   // textAlign:"center"
 }
});
```

2. Put in an icon

```js
import { StyleSheet, Text, View, Image} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function App() {
 return (
   <View style={[styles.container]}>
     <AntDesign name="rightcircleo" size={24} color="black" style={{fontSize:50, color:"orange"}}/>
     <View style={{borderWidth:1, flexDirection:"row", justifyContent:"flex-end", gap:20}}>
       <Text>Gmail</Text>
       <Text>Images</Text>
       <MaterialCommunityIcons name="dots-grid" size={50} color="black" />
       <Text>KP</Text>
     </View>
     <Image
       source={{uri:"https://www.google.com/logos/doodles/2023/2023-womens-world-cup-opening-day-6753651837110060-2xa.gif"}}
       style={{height:100, width:100}} 
     />
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,   
   borderWidth:10,
   borderColor:"magenta",    
   marginTop:60,
 },
 centered: {
   // textAlign:"center"
 }
});
```
3. Final styling for the top bar:
```js
import { StyleSheet, Text, View, Image} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function App() {
 return (
   <View style={[styles.container]}>
     <AntDesign name="rightcircleo" size={24} color="black" style={{fontSize:50, color:"orange"}}/>
     <View style={{borderWidth:3, borderColor:"blue", flexDirection:"row", gap:20,
       justifyContent:"flex-end",      // left, middle, right
       alignItems:"flex-start", // top
       alignItems:"flex-end",    // bottom
       alignItems:"center",    //center       
       }}>
       <Text style={{borderWidth:1}}>Gmail</Text>       
       <MaterialCommunityIcons name="dots-grid" size={50} color="black" style={{borderWidth:1}} />
       <View style={{borderWidth:1, height:50, width:50, borderRadius:25, justifyContent:"center", alignItems:"center", backgroundColor:"#18dcff"}}>
         <Text style={{borderWidth:1}}>KP</Text>       
       </View>
     </View>
     <Image
       source={{uri:"https://www.google.com/logos/doodles/2023/2023-womens-world-cup-opening-day-6753651837110060-2xa.gif"}}
       style={{height:100, width:100}} 
     />
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,   
   borderWidth:10,

   marginTop:60,
 },
 centered: {
   // textAlign:"center"
 }
});
```




# wk04-user-input_and_output.md

#BTP610; Wk4: User Input and Output

## What is User Interactivity?

Mobile apps are interactive. This means that users can perform actions in the application and the app will respond. The goal of interactivity is to create an experience where users can easily navigate, make choices, and get the results they expect.

Here are examples of interactivity in an app:

### Buttons on a form

You are presented with a login form. The interactivity occurs when you enter your login details and press the â€œLoginâ€ button. When the button is pressed, the app will respond by validating your login details. If correct, then the app will navigate you to the next screen. Otherwise, the screen updates to show an error message.
![alt text](./images/wk4/image.png)

### Sliding Controls on a Smartphone:
Interactivity occurs when you adjust the brightness on your smartphone by moving a slider back and forth. Your action (sliding) causes the phone to change the screen's brightness level.

![alt text](./images/wk4/image-1.png)

### Website links or buttons.

You can interact with a websiteâ€™s navigation links by clicking on a link or button.  When you click, the website responds by taking you to the appropriate section of the website or app.
![alt text](./images/wk4/image-2.png)

### Video Player Controls:

When you're watching a video online and you can pause, play, rewind, or adjust the volume using the on-screen controls, this is another form of user interactivity. The video player responds immediately to your inputs.
![alt text](./images/wk4/image-3.png)

## Implementing Interactivity in a Mobile App

In a mobile app, interactivity is implemented by creating a user interface that responds to user actions, such as taps, swipes, or text input.  Common responses to user actions include:
- Displaying a new message on the screen
- Refreshing the contents of the screen 
- Navigating the user to another screen
- Performing a calculation and displaying the result

React Native uses state variables to create interactivity.


### What is a State Variable?

In React Native, a state variable is a special type of variable that is used to manage user interactivity.

State variables are responsible for:
1. Managing State
State variables maintain a state object that holds information that can change during the lifetime of the widget. This is essential for tracking user input and other dynamic changes.
2. Rebuilding the UI
When the value of a state variable changes, React Native will automatically refresh the user interface. This ensures that the user interface always consistent with the underlying data.
3. Handling User Input or output messages to screen
State variables can capture user input and make the data available to the application for processing.


â€ƒ
### Creating a State Variable

State variables need to be created

State variables need to be assigned an initial value

To create a state variable:

1. Import the `useState()` function

This function is used to create state variables.

`import {useState} from "react"`


2. Use the useState() variable to create the state variable

This code creates a state variable called â€œxâ€, and a state update function called setX()
`const [x, setX] = useState()`

A state variable consists of two parts:
a.	The state variable			â†’	Stores the variableâ€™s value (access the variableâ€™s value)
b.	The state update function	â†’ 	Function used to update the value of the state variable

3. Use the state variable in your logic

Common uses of state variables include:
- Used to output messages to the screen
- Used to capture user input


#### Example:
```js
import { StyleSheet, Text, View, Button } from 'react-native';
import {useState} from "react"

export default function App() {

 // declare your state variables here
 // create a state variable that is
 // initially set to a string
 // create a string state variable
 const [x, setX] = useState("abcdefgh")
 // setY = is a function
 // you can call the function anything you want
 const [y, setY] = useState(3.14159)
 // const [abcdef, setAbcdef] = useState()
 const [z, setZ] = useState(true)

 // create an array state variable
 // (state variable that is initialzed to an array)
 const [a, setA] = useState(["Apple","Banana"])

 // object literals (objects)
 const [b, setB] = useState(
   {model:"Tesla Model X", licensePlate:"ABDF253"}
 )

 console.log(b)
 console.log(b.model)
 console.log(b.licensePlate)



 // click handler for the button
 const buttonPressed = () => {
   console.log("Hello") 
   // one of teh properites of state variables is that you can't directly update it 
   // x = 5   // ERROR:
   // react native will provide you with a different method to update that variable
   // (because as we can see , using the = sign doesn't work)

   // instead, use the state update function
   setX(999)     //  equivalent of doing x = 999
                 // setX also will refresh the screen
   console.log(x)
 }

 return (
   <View style={styles.container}>
     <Text style={styles.heading}>User Input and Output</Text>
     <Text style={styles.text}>Press the button to see output:</Text>
     <Button onPress={buttonPressed} title="Click Me!"/>          
     <Text style={styles.text}></Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   marginTop:60,   
 },
 heading: {
   fontSize:20, 
   marginVertical:8, 
   textAlign:"center",
 },
 text: {
   fontSize:16,
   marginVertical:8,
   textAlign:"center"
 }
});
```

#### Starter Code:
```js

import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

 // click handler for the button
 const buttonPressed = () => {
   console.log("Hello")   
 }


 return (
   <View style={styles.container}>
     <Text style={styles.heading}>User Input and Output</Text>
     <Text style={styles.text}>Press the button to see output:</Text>
     <Button onPress={buttonPressed} title="Click Me!"/>          
     <Text style={styles.text}></Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   marginTop:60,   
 },
 heading: {
   fontSize:20, 
   marginVertical:8, 
   textAlign:"center",
 },
 text: {
   fontSize:16,
   marginVertical:8,
   textAlign:"center"
 }
});
```

![alt text](./images/wk4/image-4.png)

#### Native button:
```js
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

// click handler for the button
const buttonPressed = () => {
  console.log("Hello")  
}

return (
  <View style={styles.container}>
    <Text style={styles.heading}>User Input and Output</Text>
    <Text style={styles.text}>Press the button to see output:</Text>
    <Button
     onPress={buttonPressed}
     title="Click Me!"
     style={{backgroundColor:"yellow", fontSize:20, borderWidth:5}}/>         
    <Text style={styles.text}></Text>
  </View>
);
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  marginTop:60,  
},
heading: {
  fontSize:20,
  marginVertical:8,
  textAlign:"center",
},
text: {
  fontSize:16,
  marginVertical:8,
  textAlign:"center"
}
});

```
### Styled Button

1. Basic code to create a pressable (style dbutton)
```js
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
export default function App() {

// click handler for the button
const buttonPressed = () => {
  console.log("Hello")  
}

const buttonPressed2 = () => {
 alert("Clicked!")
}

return (
  <View style={styles.container}>
    <Text style={styles.heading}>User Input and Output</Text>
    <Text style={styles.text}>Press the button to see output:</Text>
    <Button
     onPress={buttonPressed}
     title="Click Me!"
     style={{backgroundColor:"yellow", fontSize:20, borderWidth:5}}/>         
   
   <Pressable
     onPress={buttonPressed2}
     style={{borderWidth:1}}>
     <Text style={{backgroundColor:"yellow"}}>sdfsdfs</Text>
   </Pressable>
   
   
    <Text style={styles.text}></Text>

  </View>
);
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  marginTop:60,  
},
heading: {
  fontSize:20,
  marginVertical:8,
  textAlign:"center",
},
text: {
  fontSize:16,
  marginVertical:8,
  textAlign:"center"
}
});
```
â€ƒ
### Final code styled:
```js
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
export default function App() {

// click handler for the button
const buttonPressed = () => {
  console.log("Hello")  
}

const buttonPressed2 = () => {
 alert("Clicked!")
}

return (
  <View style={styles.container}>
    <Text style={styles.heading}>User Input and Output</Text>
    <Text style={styles.text}>Press the button to see output:</Text>
    <Button
     onPress={buttonPressed}
     title="Click Me!"
     style={{backgroundColor:"yellow", fontSize:20, borderWidth:5}}/>         
   
   <Pressable
     onPress={buttonPressed2}
     style={styles.btn}>
     <Text style={styles.btnText}>sdfsdfs</Text>
   </Pressable>
   
    <Text style={styles.text}></Text>
  </View>
);
}


const styles = StyleSheet.create({
 btn: {
   width:200,
   backgroundColor:"#2c3e50",
   paddingVertical:10,   
   borderWidth:1,
   borderRadius:5   
 },
 btnText: {
   fontSize:20,  
   color:"white",
   textAlign:"center",
 },
container: {
  flex: 1,
  backgroundColor: '#fff',
  marginTop:60,  
},
heading: {
  fontSize:20,
  marginVertical:8,
  textAlign:"center",
},
text: {
  fontSize:16,
  marginVertical:8,
  textAlign:"center"
}
});
```
## How to output to the screen

1. You need a `<Text>`		â†’ text is going to display your message that you want to output to the screen
```js
<Text style={styles.text}></Text>
```

2. You need a state variable	â†’ state variable will store the message that should go in the <text>
```js
import {useState} from "react"

const [msg, setMsg] = useState("hello")
```

3. Attach the state variable to the `<Text>`
```js
<Text style={styles.text}>
     {msg}
</Text>
```

4. When the button is pressed, assign a value to the state variable
```js
// click handler for the button
const buttonPressed = () => {
  console.log("Hello")  

  // randomly generate a number, and output to the screen
  // 5 - 200
 const randomValue = Math.floor(Math.random() * (200 - 5 + 1) + 5);
 setMsg(`your lucky number is : ${randomValue}`)
}
```


## Exercise 2:  Output the reading rate

Create an app that calculates how long it will take the user to finish reading a book.

Provide a `<Button>` for the user to click
When the `<Button>` is pressed:
1.	Create a book object literal. Every book has a title, author, and number of pages.
2.	Based on the number of pages, calculate the time to finish reading a book. 
Assume a reading rate of 3 pages per minute.
3.	Display the book information and reading rate to the screen in a `<Text>` component

### Sample output:

- Ensure you style the keywords with a yellow background and a blue color

```text
Harry Potter by JK Rowling has 223 pages and will take an estimated 74.33333 minutes to complete.
```

### Possible Solution


1. Create the book literal
```js
const calculateReadingRate = () => {
   // 1. creating an object literal
   const book = {
     title:"Harry Potter",
     author:"JK Rowling",
     numPages:223
   }
   // 2. calculate the reading rate
   // 3 page per minute
   // num pages / page per minute = minuets
   const minutes = book.numPages / 3

   // 3. output
   setResult(`${book.title} by ${book.author} will take ${minutes} minutes to read.`)
}
```

Your Turn:
![alt text](./images/wk4/image-5.png)


### Code:
```js
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import {useState} from "react"

export default function App() {
 // create a state variable
 // variables need a name
 // variables need a initial value
 // const msg = "hello"
 const [msg, setMsg] = useState("hello")
 // the initial value of the state variable is "hello"
 // msg = the name of your state variable
 // setMsg = this a a FUNCTION provided by react that we use to update the value of the state variable

 // regular js
 // let msg = "hello"
 // msg = "world!"

 // react
 // const [msg, setMsg] = useState('hello')
 // setMsg("world!")

 /// msg = "world" // does not work



 // set the initial value to an empty string b/c i don't have anything
 // i want to output initially
 const [result, setResult] = useState("")

 // let result = ""
 // result = `${book.title} by ${book.author} will take ${minutes} minutes to read.`

// click handler for the button
const buttonPressed = () => {
  console.log("Hello")  

  // randomly generate a number, and output to the screen
  // 5 - 200
 const randomValue = Math.floor(Math.random() * (200 - 5 + 1) + 5);
 setMsg(`your lucky number is : ${randomValue}`)
}

const buttonPressed2 = () => {
 alert("Clicked!")
}

const calculateReadingRate = () => {
   // 1. creating an object literal
   const book = {
     title:"Harry Potter",
     author:"JK Rowling",
     numPages:223
   }
   // 2. calculate the reading rate
   // 3 page per minute
   // num pages / page per minute = minuets
   const minutes = book.numPages / 3

   // 3. output
   setResult(`${book.title} by ${book.author} will take ${minutes} minutes to read.`)
}

return (
  <View style={styles.container}>
    <Text style={styles.heading}>User Input and Output</Text>
    <Text style={styles.text}>Press the button to see output:</Text>
    <Button
     onPress={buttonPressed}
     title="Click Me!"
     style={{backgroundColor:"yellow", fontSize:20, borderWidth:5}}/>         
  
   <Text style={styles.text}>
     {msg}
   </Text>

   <Button
     onPress={calculateReadingRate}
     title="What is the reading rate?" />   

   <Text style={styles.text}>
     {result}
   </Text>


{/*
   <Pressable
     onPress={buttonPressed2}
     style={styles.btn}>
     <Text style={styles.btnText}>sdfsdfs</Text>
   </Pressable>
     */}

  </View>
);
}


const styles = StyleSheet.create({
 btn: {
   width:200,
   backgroundColor:"#2c3e50",
   paddingVertical:10,   
   borderWidth:1,
   borderRadius:5   
 },
 btnText: {
   fontSize:20,  
   color:"white",
   textAlign:"center",
 },
container: {
  flex: 1,
  backgroundColor: '#fff',
  marginTop:60,  
},
heading: {
  fontSize:20,
  marginVertical:8,
  textAlign:"center",
},
text: {
  fontSize:16,
  marginVertical:8,
  textAlign:"center"
}
});
```

## Getting Text Input From the User
```js
import { StyleSheet, Text, View, Button, Pressable, TextInput } from 'react-native';
import {useState} from "react"

const [nameFromUI, setNameFromUI] = useState("")

const nameInput = â€œpeterâ€

{/* attached to a state variable */}
   <TextInput
     style={{borderWidth:1, marginHorizontal:20, paddingVertical:10,
       paddingHorizontal:8,fontSize:20}}
     value={nameInput} onChangeText={setNameFromUI}
     placeholder="Enter your name"
     keyboardType="numeric"
   />

```
### Why do you need to attach a state variable to a textbox?

1.	Detect when the user press a key on their keypad/keyboard into the textbox
```js
<TextInput
     style={{borderWidth:1, marginHorizontal:20, paddingVertical:10,
       paddingHorizontal:8,fontSize:20}}
     value={nameInput}
     onChangeText={
       ()=>{
         // when you detect a change, do something
         console.log("something changed")
       }
     }
     placeholder="Enter your name"
     keyboardType="numeric"
   />
```


2.	Save the new value somewhere
3.	Update the textbox to show the new value

### Making a Switch

```js
import { StyleSheet, Text, View, Button, Pressable, TextInput, Switch } from 'react-native';
```

1.	Detect when the person presses the switch 
```js
<Switch value={false} onValueChange={} />
```
2.	Update the value to be the opposite value
3.	And redraw the Switch so it looks different
```js
const [airplaneModeFromUI, setAirplaneModeFromUI] = useState(false)

<Switch value={airplaneModeFromUI} onValueChange={setAirplaneModeFromUI} />
```
4. Bonus, get the value from the switch:
```js
const buttonPressed3 = () => {
 alert(`Hello ${nameFromUI}. Airplane mode on? ${airplaneModeFromUI}`)
 // clear the textbox
 setNameFromUI("")
 // reset the switch to a default value after
 setAirplaneModeFromUI(false)
}
```

#### Full code:

```js
import { StyleSheet, Text, View, Button, Pressable, TextInput, Switch } from 'react-native';
import {useState} from "react"

export default function App() {
 // create a state variable
 // variables need a name
 // variables need a initial value
 // const msg = "hello"
 const [msg, setMsg] = useState("hello")
 // the initial value of the state variable is "hello"
 // msg = the name of your state variable
 // setMsg = this a a FUNCTION provided by react that we use to update the value of the state variable

 // regular js
 // let msg = "hello"
 // msg = "world!"

 // react
 // const [msg, setMsg] = useState('hello')
 // setMsg("world!")

 /// msg = "world" // does not work



 // set the initial value to an empty string b/c i don't have anything
 // i want to output initially
 const [result, setResult] = useState(<Text></Text>)

 const [titleForUI, setTitleForUI] = useState("")
 const [authorForUI, setAuthorForUI] = useState("")
 const [rateForUI, setRateForUI] = useState("")

 // let result = ""
 // result = `${book.title} by ${book.author} will take ${minutes} minutes to read.`

// click handler for the button
const buttonPressed = () => {
  console.log("Hello")  

  // randomly generate a number, and output to the screen
  // 5 - 200
 const randomValue = Math.floor(Math.random() * (200 - 5 + 1) + 5);
 setMsg(`your lucky number is : ${randomValue}`)
}

const buttonPressed2 = () => {
 alert("Clicked!")
}

const calculateReadingRate = () => {
   // 1. creating an object literal
   const book = {
     title:"Atomic Habits",
     author:"James Clear",
     numPages:500
   }
   // 2. calculate the reading rate
   // 3 page per minute
   // num pages / page per minute = minuets
   const minutes = book.numPages / 3

   // 3. output
   setResult(`${book.title} by ${book.author} will take ${minutes} minutes to read.`)

   setAuthorForUI(book.author)
   setTitleForUI(book.title)
   setRateForUI(`${minutes} min`)

   setResult(<>Hello World!</>)

   return(<Text>sdfsdf</Text>)
}

/*  state variable   
state variable update function (setter function) */
const [nameFromUI, setNameFromUI] = useState("abcd")
const [airplaneModeFromUI, setAirplaneModeFromUI] = useState(false)
const buttonPressed3 = () => {
 alert(`Hello ${nameFromUI}. Airplane mode on? ${airplaneModeFromUI}`)
 // clear the textbox
 setNameFromUI("")
 // reset the switch to a default value after
 setAirplaneModeFromUI(false)
}

return (
  <View style={styles.container}>
   {/* attached to a state variable */}
   <TextInput
     style={{borderWidth:1, marginHorizontal:20, paddingVertical:10,
       paddingHorizontal:8,fontSize:20}}
     value={nameFromUI}
     onChangeText={setNameFromUI}
     placeholder="Enter your name"
     keyboardType="numeric"

   />

   <Text>Turn airplane mode on?</Text>
   <Switch value={airplaneModeFromUI} onValueChange={setAirplaneModeFromUI} />
  


   <Button title="Get name!" onPress={buttonPressed3}/>

   <Text style={styles.heading}>User Input and Output</Text>
   <Text style={styles.text}>Press the button to see output:</Text>
   <Button
     onPress={buttonPressed}
     title="Click Me!"
     style={{backgroundColor:"yellow", fontSize:20, borderWidth:5}}
   />         
    <Text style={styles.text}>
     {msg}
   </Text>

   <Button
     onPress={calculateReadingRate}
     title="What is the reading rate?" />   

   <Text style={styles.text}>
     {result}
   </Text>

   <Text style={styles.text}>
     <Text style={{backgroundColor:"yellow"}}>{titleForUI}</Text> by <Text style={{backgroundColor:"yellow"}}>{authorForUI}</Text> will take <Text style={{backgroundColor:"yellow"}}>{rateForUI} min</Text> to read
   </Text>


   <Text>
     Hello world, <Text style={{backgroundColor:"yellow"}}>how</Text> are you?
   </Text>


  


{/*
   <Pressable
     onPress={buttonPressed2}
     style={styles.btn}>
     <Text style={styles.btnText}>sdfsdfs</Text>
   </Pressable>
     */}

  </View>
);
}

const styles = StyleSheet.create({
 btn: {
   width:200,
   backgroundColor:"#2c3e50",
   paddingVertical:10,   
   borderWidth:1,
   borderRadius:5   
 },
 btnText: {
   fontSize:20,  
   color:"white",
   textAlign:"center",
 },
container: {
  flex: 1,
  backgroundColor: '#fff',
  marginTop:60,  
},
heading: {
  fontSize:20,
  marginVertical:8,
  textAlign:"center",
},
text: {
  fontSize:16,
  marginVertical:8,
  textAlign:"center"
}
});
```

### Conditional Styling based on OS


https://stackoverflow.com/questions/51436886/how-to-use-platform-os-to-elements-in-react-native
```js
import { StyleSheet, Text, View, Button, Pressable, TextInput, Switch, Platform } from 'react-native';
import {useState} from "react"

export default function App() {
   const [nameFromUI, setNameFromUI] = useState("abcd")
   const [airplaneModeFromUI, setAirplaneModeFromUI] = useState(false)

   const buttonPressed3 = () => {

   }

   return(
     <View style={styles.container}>
       <TextInput
       style={{borderWidth:1, marginHorizontal:20, paddingVertical:10,
         paddingHorizontal:8,fontSize:20}}
       value={nameFromUI}
       onChangeText={setNameFromUI}
       placeholder="Enter your name"
       />
       <Text>Turn airplane mode on?</Text>
       <Switch value={airplaneModeFromUI} onValueChange={setAirplaneModeFromUI} />
       <Button title="Get name!" onPress={buttonPressed3}/>
     </View>
   )
}

// if the person is using ios,
// then put padding at the top of the screen to pus the content down

const styles = StyleSheet.create({
 container: {

 },
 btn: {
   width:200,
   backgroundColor:"#2c3e50",
   paddingVertical:10,   
   borderWidth:1,
   borderRadius:5   
 },
 btnText: {
   fontSize:20,  
   color:"white",
   textAlign:"center",
 },
heading: {
  fontSize:20,
  marginVertical:8,
  textAlign:"center",
},
text: {
  fontSize:16,
  marginVertical:8,
  textAlign:"center"
}
});
```

#### Code to show different background color depending on ios or android

```js
import { StyleSheet, Text, View, Button, Pressable, TextInput, Switch, Platform } from 'react-native';
import {useState} from "react"

export default function App() {
   const [nameFromUI, setNameFromUI] = useState("abcd")
   const [airplaneModeFromUI, setAirplaneModeFromUI] = useState(false)

   const buttonPressed3 = () => {

   }

   return(
     <View style={styles.container}>
       <TextInput
       style={{borderWidth:1, marginHorizontal:20, paddingVertical:10,
         paddingHorizontal:8,fontSize:20}}
       value={nameFromUI}
       onChangeText={setNameFromUI}
       placeholder="Enter your name"
       />
       <Text>Turn airplane mode on?</Text>
       <Switch value={airplaneModeFromUI} onValueChange={setAirplaneModeFromUI} />
       <Button title="Get name!" onPress={buttonPressed3}/>
     </View>
   )
}

// if the person is using ios,
// then put padding at the top of the screen to pus the content down

const styles = StyleSheet.create({
 container: {
   backgroundColor: (Platform.OS === "ios") ? "#FF00FF" : "#FFFF000",
 },
 btn: {
   width:200,
   backgroundColor:"#2c3e50",
   paddingVertical:10,   
   borderWidth:1,
   borderRadius:5   
 },
 btnText: {
   fontSize:20,  
   color:"white",
   textAlign:"center",
 },
heading: {
  fontSize:20,
  marginVertical:8,
  textAlign:"center",
},
text: {
  fontSize:16,
  marginVertical:8,
  textAlign:"center"
}
});
```

#### Programmatically setting the margin on the top of the device so it looks almost the same on ios and android
```js

import { StyleSheet, Text, View, Button, Pressable, TextInput, Switch, Platform } from 'react-native';
import {useState} from "react"

export default function App() {
   const [nameFromUI, setNameFromUI] = useState("abcd")
   const [airplaneModeFromUI, setAirplaneModeFromUI] = useState(false)

   const buttonPressed3 = () => {

   }

   return(
     <View style={styles.container}>
       <TextInput
       style={{borderWidth:1, marginHorizontal:20, paddingVertical:10,
         paddingHorizontal:8,fontSize:20}}
       value={nameFromUI}
       onChangeText={setNameFromUI}
       placeholder="Enter your name"
       />
       <Text>Turn airplane mode on?</Text>
       <Switch value={airplaneModeFromUI} onValueChange={setAirplaneModeFromUI} />
       <Button title="Get name!" onPress={buttonPressed3}/>
     </View>
   )
}

// if the person is using ios,
// then put padding at the top of the screen to pus the content down

const styles = StyleSheet.create({
 container: {
   backgroundColor: (Platform.OS === "ios") ? "#FF00FF" : "#FFFF000",
   marginTop: (Platform.OS === "android") ? 40 : 0,
 },
 btn: {
   width:200,
   backgroundColor:"#2c3e50",
   paddingVertical:10,   
   borderWidth:1,
   borderRadius:5   
 },
 btnText: {
   fontSize:20,  
   color:"white",
   textAlign:"center",
 },
heading: {
  fontSize:20,
  marginVertical:8,
  textAlign:"center",
},
text: {
  fontSize:16,
  marginVertical:8,
  textAlign:"center"
}
});
```

### Conditionally Rendering elements on the page
#### Example 1: Using the LOGICAL AND approach:

- The condition is true, so the <Text> WILL be shown
```js
{ (50 > 3) &&
<Text style={{backgroundColor:"yellow"}}>Here is some text!</Text>
}
```

- In this case, teh <Text> will NOT be shown because the condition is false
```js
{ (5 > 30000) &&
<Text style={{backgroundColor:"yellow"}}>Here is some text!</Text>
}
```

##### Example:  
**Person types something into the text box and presses button**
If they type in a number is larger than 20, then show the <text> element
Otherwise, show an alert that says a message:

```js
import { StyleSheet, Text, View, Button, Pressable, TextInput, Switch, Platform } from 'react-native';
import {useState} from "react"

export default function App() {
   const [nameFromUI, setNameFromUI] = useState("abcd")
   const [airplaneModeFromUI, setAirplaneModeFromUI] = useState(false)

   // state variable to control whether to show or hide that textbox
   const [showText, setShowText] = useState(false)

   const buttonPressed3 = () => {
     // 1. Get the value in the textbox
     console.log(nameFromUI)
     // 2. Convert the value to a number
     // (all values from textboxes are saved as STRINGS)
     const input = parseInt(nameFromUI)

     // 3. because we want to do math operations (>), compare numbers with numbers
     if (input > 20) {
       // show the textbox yellow
       setShowText(true)
     } else {
       alert("HELLO WORLD!")
       setShowText(false)
     }
    
   }

   return(
     <View style={styles.container}>
       <TextInput
       style={{borderWidth:1, marginHorizontal:20, paddingVertical:10,
         paddingHorizontal:8,fontSize:20}}
       value={nameFromUI}
       onChangeText={setNameFromUI}
       placeholder="Enter your name"
       />
       <Text>Turn airplane mode on?</Text>
       <Switch value={airplaneModeFromUI} onValueChange={setAirplaneModeFromUI} />
       <Button title="Get name!" onPress={buttonPressed3}/>


       {/* conditional rendering based on a logical and */}
       {
         (showText === true) &&
           <Text style={{backgroundColor:"yellow"}}>Here is some text!</Text>
       }

     </View>
   )
}

// if the person is using ios,
// then put padding at the top of the screen to pus the content down

const styles = StyleSheet.create({
 container: {
   // backgroundColor: (Platform.OS === "ios") ? "#FF00FF" : "#FFFF000",
   marginTop: (Platform.OS === "android") ? 40 : 0,
   flex:1,
   borderWidth:5,
   borderColor:"magenta",
 },
 btn: {
   width:200,
   backgroundColor:"#2c3e50",
   paddingVertical:10,   
   borderWidth:1,
   borderRadius:5   
 },
 btnText: {
   fontSize:20,  
   color:"white",
   textAlign:"center",
 },
heading: {
  fontSize:20,
  marginVertical:8,
  textAlign:"center",
},
text: {
  fontSize:16,
  marginVertical:8,
  textAlign:"center"
}
});
```

#### Example 2: Using  TERNARY OPERATOR

Here is an example of a ternary operator in Javascript:
```js
(x > 5) ? console.log("Hello") : console.log("Goodbye")
```
This is equivalent to:
```js
if (x > 5) {
   console.log("HELLO")
 } else {
   console.log("GOODBYE")
 }
```

**Hereâ€™s how the ternary operator works:**

1.	Evaluate the condition:					(x > 5)
2.	If true, execute the code after the ? symbol		console.log("Hello")
3.	If false, execute the code after the : symbol		console.log("Goodbye")
![alt text](./images/wk4/image-6.png)


**How do we apply ternary operators to our user interface?**
```js
{
   (999999 > 100)
   ?
   <Text style={{backgroundColor:"cyan"}}>Hello</Text>
   :
   <Text style={{backgroundColor:"magenta"}}>Goodbye</Text>
}
```

- If the condition is true, show the HELLO 
- Otherwise, show the GOODBYE

#### Conditional Rendering Example with Ternary operator:
```js
import { StyleSheet, Text, View, Button, Pressable, TextInput, Switch, Platform } from 'react-native';
import {useState} from "react"

export default function App() {
   const [nameFromUI, setNameFromUI] = useState("abcd")
   const [airplaneModeFromUI, setAirplaneModeFromUI] = useState(false)

   // state variable to control whether to show or hide that textbox
   const [showText, setShowText] = useState(false)

   const buttonPressed3 = () => {
     // 1. Get the value in the textbox
     console.log(nameFromUI)
     // 2. Convert the value to a number
     // (all values from textboxes are saved as STRINGS)
     const input = parseInt(nameFromUI)

     // 3. because we want to do math operations (>), compare numbers with numbers
     if (input > 20) {
       // show the textbox yellow
       setShowText(true)
     } else {
       alert("HELLO WORLD!")
       setShowText(false)
     }
    
   }

   return(
     <View style={styles.container}>
       <TextInput
       style={{borderWidth:1, marginHorizontal:20, paddingVertical:10,
         paddingHorizontal:8,fontSize:20}}
       value={nameFromUI}
       onChangeText={setNameFromUI}
       placeholder="Enter your name"
       />
       <Text>Turn airplane mode on?</Text>
       <Switch value={airplaneModeFromUI} onValueChange={setAirplaneModeFromUI} />
       <Button title="Get name!" onPress={buttonPressed3}/>


       {/* conditional rendering based on a logical AND */}
       {
         (showText === true) &&
           (
             <View>
               <Text style={{backgroundColor:"yellow"}}>Here is some text!</Text>
               <Text style={{backgroundColor:"yellow"}}>Here is some text!</Text>
               <Text style={{backgroundColor:"yellow"}}>Here is some text!</Text>
               <Text style={{backgroundColor:"yellow"}}>Here is some text!</Text>
               <Text style={{backgroundColor:"yellow"}}>Here is some text!</Text>
             </View>
           )
       }

       {
         (showText === true)
         ?  
           (
             <View>
               <Text style={{backgroundColor:"cyan"}}>Your number is {nameFromUI}</Text>
               <Text style={{backgroundColor:"cyan"}}>This is greater than 20</Text>
             </View>
           )      
          
         :
         <Text style={{backgroundColor:"magenta"}}>Your number is lesss than 20</Text>
       }


     </View>
   )
}

// if the person is using ios,
// then put padding at the top of the screen to pus the content down

const styles = StyleSheet.create({
 container: {
   // backgroundColor: (Platform.OS === "ios") ? "#FF00FF" : "#FFFF000",
   marginTop: (Platform.OS === "android") ? 40 : 100,
   flex:1,
   borderWidth:5,
   borderColor:"magenta",
 },
 btn: {
   width:200,
   backgroundColor:"#2c3e50",
   paddingVertical:10,   
   borderWidth:1,
   borderRadius:5   
 },
 btnText: {
   fontSize:20,  
   color:"white",
   textAlign:"center",
 },
heading: {
  fontSize:20,
  marginVertical:8,
  textAlign:"center",
},
text: {
  fontSize:16,
  marginVertical:8,
  textAlign:"center"
}
});
```





# wk05-Flatlist_component.md

# BTP610; Wk05: Flatlist Component

## What is a List?
A common user interface pattern in mobile development is to display a list of data:
![alt text](./images/wk5/image.png)

## Working with a `<FlatList>`
A `<FlatList>` is a React Native component that displays a list of data
Documentation: https://reactnative.dev/docs/flatlist


1.  Create a data source 

- The data source should be an array of objects that contain the information you want to show in your list
```js
const studentList = [
    {name:"Peter", gpa:3.0, tuitionPaid:true},
    {name:"Emily", gpa:4.0, tuitionPaid:true},
    {name:"Suzy", gpa:2.5, tuitionPaid:false},
    {name:"Peter", gpa:2.5, tuitionPaid:false},
]
```

- Each object in the array needs to have a property that will uniquely identify that object
    - By default, the FlatList searches for an attribute called â€œkeyâ€

_Modify the list of data to include a property that is a unique identifier
You must include 1 property where every value is unique_
```js
const studentList = [
   {name:"Peter", gpa:3.0, tuitionPaid:true, userid:"psmith"},
   {name:"Emily Patel", gpa:4.0, tuitionPaid:true, userid:"epatel"},
   {name:"Suzy Lee", gpa:2.5, tuitionPaid:false, userid:"slee"},
   {name:"Peter", gpa:2.5, tuitionPaid:false, userid:"pdiaz"},
]
```

2. In the screen, import the FlatList from â€˜react-nativeâ€™
```js
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, FlatList} from 'react-native';
```

3. Add properties to the FlatList

- data â†’ provide the array of objects the Flatlist should display
- keyExtractor â†’ use this to specify which property in the data source will uniquely identify each object (required if you donâ€™t have a â€œkeyâ€ property)
- renderItem â†’ specify the layout of each row in the list
- ItemSeparatorComponent â†’ (optional):  displays ui between each row item

```js
<FlatList
   data={studentList}
   keyExtractor={(item)=>{ return item.userid }}
   renderItem={
         ({item})=>{
           return(
             <Text>{item.name}</Text>
           )
         }
       }
/>
```
### Code Example: Displaying a list of student names
![alt text](./images/wk5/image-1.png)

```js
import { StyleSheet, Text, View, FlatList } from 'react-native';

// outside of your component, create a list of data
const studentList = [
 {name:"Peter", gpa:3.0, tuitionPaid:true, userid:"psmith"},
 {name:"Emily Patel", gpa:4.0, tuitionPaid:true, userid:"epatel"},
 {name:"Suzy Lee", gpa:2.5, tuitionPaid:false, userid:"slee"},
 {name:"Peter", gpa:2.5, tuitionPaid:false, userid:"pdiaz"},
]


export default function App() {

  return (
   <View style={styles.container}>
     <Text>test</Text>  
     <FlatList style={{marginVertical:70, borderWidth:1}}
       data={studentList}
       keyExtractor={(item)=>{ return item.userid }}
       renderItem={
        ({item})=>{
          return(
            <Text>{item.name}</Text>
          )
        }
      }
   />
 
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
```

**Warning**
![alt text](./images/wk5/image-2.png)

### Customizing the User Interface for Each Row of the FlatList
#### Example 1: Each row shows a name, gpa, and button. 

- Name and gpa should be on the left
- Button should be on the right
![alt text](./images/wk5/image-3.png)
```js
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

// outside of your component, create a list of data
const studentList = [
 {name:"Peter", gpa:3.0, tuitionPaid:true, userid:"psmith"},
 {name:"Emily Patel", gpa:4.0, tuitionPaid:true, userid:"epatel"},
 {name:"Suzy Lee", gpa:2.5, tuitionPaid:false, userid:"slee"},
 {name:"Peter", gpa:2.5, tuitionPaid:false, userid:"pdiaz"}, 
]

export default function App() {

 return (
   <View style={styles.container}>
     <Text>test</Text>  
     <FlatList style={{marginVertical:70, borderWidth:1}}
       data={studentList}
       keyExtractor={
         (item)=>{       
           return item.userid
         }
       }
       renderItem={
        ({item})=>{
           console.log("What is item?")
           console.log(item)
           return(
             <View style={{flexDirection:"row", justifyContent:"space-between"}}>
               <View style={{borderWidth:1}}>
                 <Text style={styles.text}>Name: {item.name}</Text>
                 <Text style={styles.text}>GPA: {item.gpa}</Text>
               </View>
               <Button title="Click for more details"/>
             </View>
           )
        }
      }
   />
 
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
 text: {
   fontSize:18,
 }
});
```

#### Example 2:  Here is a list of vehicles as developed in class
![alt text](./images/wk5/image-4.png)
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function App() {
 // list of data = Javascript array
 // Step 2 : ensure each item has a property that uniquely identifies it
 // Enables to you prevent "duplicates"
 const studentList = [
   {name:"Peter Patel", userid:"ppatel", studentNo:999, id:1},
   {name:"Emily Lee", userid:"elee", studentNo:100, id:2},
   {name:"Aisha W", userid:"aishaw", studentNo:101, id:3},
   {name:"Peter Patel", userid:"p2p", studentNo:102, id:4},   
 ]

 const cities = [
   {name:"London", id:0, airportCode:"LHR"},
   {name:"London", id:0, airportCode:"YXU"},
   {name:"Paris", id:1, airportCode:"CDG"},
   {name:"Toronto", id:2, airportCode:"YYZ"}  
 ]

 const vehicles = [
   {make:"Tesla", model:"Model X", licensePlate:"TESLA101"},
   {make:"Tesla", model:"Model S", licensePlate:"TESLA102"},
   {make:"Ford", model:"Focus", licensePlate:"FORD999"},
   {make:"Toyota", model:"RAV 4", licensePlate:"TOY000"},
   {make:"Toyota", model:"RAV 4", licensePlate:"TOY133"},
 ]

 return (
   <View style={styles.container}>
     <Text>This is a demo of a flatlist</Text>
     {/* Returning in 2 min to discuss these FlatList attributes */}
     <FlatList
       style={{borderWidth:1}}
       data={vehicles}
       /* Tell the flat list which proeprty in your object is the unique identifier */
       keyExtractor={(item)=>{ return item.licensePlate }}
       /* Controls the appearance of each row in the flat list */
       renderItem={
             ({item})=>{
               return(
                 <View style={styles.rowItem}>
                   <FontAwesome name="car" size={24} color="black" />
                   <Text>{item.make} {item.model}</Text>
                   <Text>{item.licensePlate}</Text>
                 </View>
               )
             }
           }
     />
      <Text>This is a demo of a flatlist</Text>

   </View>
 );
}

const styles = StyleSheet.create({
 rowItem : {
   flexDirection:"row",
   justifyContent:"space-between",
 },
 container: {
   flex: 1,
   backgroundColor: '#fff',   
   justifyContent: 'center',
   marginTop:80,
   marginBottom:20,
   padding:20,
 },
});
```

#### Example 3: Conditional Rendering
Documentation: https://react.dev/learn/conditional-rendering
![alt text](./images/wk5/image-5.png)

**a. Use a ternary operator to produce this output:**
- If the student paid tuition, then show a label that says â€œtutition paid!â€
- Otherwise, show a label that says : â€œNot paid!â€

```js
<FlatList
       style={{borderWidth:1}}
       data={studentList}
       /* Tell the flat list which proeprty in your object is the unique identifier */
       keyExtractor={(item)=>{ return item.userid }}
       /* Controls the appearance of each row in the flat list */
       renderItem={
             ({item})=>{
               return(
                 <View style={styles.rowItem}>
                   <Text>{item.name} {item.gpa}</Text>
                   {/* 3a: conditionally rendering the icon using ternary operators */}
                   {
                     (item.tuitionPaid === true)
                       ?
                       <AntDesign name="checkcircle" size={24} color="black" />
                       :
                       <AntDesign name="exclamationcircleo" size={24} color="black" />
                   }
                 </View>
               )
             }
           }
     />
```
**b. Use the â€œLOGICAL AND &&â€ operator to produce this output:**
- If the student has a GPA of 2.5 or above, then show a â€œPASSâ€ in the text
- Otherwise, show nothing
```js

<FlatList
       style={{borderWidth:1}}
       data={studentList}
       /* Tell the flat list which property in your object is the unique identifier */
       keyExtractor={(item)=>{ return item.userid }}
       /* Controls the appearance of each row in the flat list */
       renderItem={
             ({item})=>{
               return(
                 <View style={styles.rowItem}>
                   <Text>{item.name} {item.gpa}</Text>
                   {
                     (item.gpa >= 2.8) &&
                     <Text>PASS!</Text>
                   }

                   {/* 3a: conditionally rendering the icon using ternary operators */}
                   {
                     (item.tuitionPaid === true)
                       ?
                       <AntDesign name="checkcircle" size={24} color="black" />
                       :
                       <AntDesign name="exclamationcircleo" size={24} color="black" />
                   }
                 </View>
               )
             }
           }
     />
```
#### Final code:  
```js

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {
 // list of data = Javascript array
 // Step 2 : ensure each item has a property that uniquely identifies it
 // Enables to you prevent "duplicates"


 const cities = [
   {name:"London", id:0, airportCode:"LHR"},
   {name:"London", id:0, airportCode:"YXU"},
   {name:"Paris", id:1, airportCode:"CDG"},
   {name:"Toronto", id:2, airportCode:"YYZ"}  
 ]

 const vehicles = [
   {make:"Tesla", model:"Model X", licensePlate:"TESLA101"},
   {make:"Tesla", model:"Model S", licensePlate:"TESLA102"},
   {make:"Ford", model:"Focus", licensePlate:"FORD999"},
   {make:"Toyota", model:"RAV 4", licensePlate:"TOY000"},
   {make:"Toyota", model:"RAV 4", licensePlate:"TOY133"},
 ]

 // outside of your component, create a list of data
 const studentList = [
 {name:"Peter", gpa:3.0, tuitionPaid:true, userid:"psmith"},
 {name:"Emily Patel", gpa:4.0, tuitionPaid:true, userid:"epatel"},
 {name:"Suzy Lee", gpa:2.5, tuitionPaid:false, userid:"slee"},
 {name:"Peter", gpa:2.5, tuitionPaid:false, userid:"pdiaz"},
]
 return (
   <View style={styles.container}>
     <Text>This is a demo of a flatlist</Text>
     {/* Returning in 2 min to discuss these FlatList attributes */}
     <FlatList
       style={{borderWidth:1}}
       data={studentList}
       /* Tell the flat list which proeprty in your object is the unique identifier */
       keyExtractor={(item)=>{ return item.userid }}
       /* Controls the appearance of each row in the flat list */
       renderItem={
             ({item})=>{
               return(
                 <View style={styles.rowItem}>
                   <Text>{item.name} {item.gpa}</Text>
                   {
                     (item.gpa >= 2.8) &&
                     <Text>PASS!</Text>
                   }

                   {/* 3a: conditionally rendering the icon using ternary operators */}
                   {
                     (item.tuitionPaid === true)
                       ?
                       <AntDesign name="checkcircle" size={24} color="black" />
                       :
                       <AntDesign name="exclamationcircleo" size={24} color="black" />
                   }
                 </View>
               )
             }
           }
     />
      <Text>This is a demo of a flatlist</Text>

   </View>
 );
}

const styles = StyleSheet.create({
 rowItem : {
   flexDirection:"row",
   justifyContent:"space-between",
 },
 container: {
   flex: 1,
   backgroundColor: '#fff',   
   justifyContent: 'center',
   marginTop:80,
   marginBottom:20,
   padding:20,
 },
});
```
#### Example 3: Adding a separator between each row

Add the ItemSeparatorComponent property and set it to a arrow function
```js
ItemSeparatorComponent={
  ()=>{}
}
```

Inside the function, you will return the user interface elements you want to include in between each row item
```js
ItemSeparatorComponent={
 ()=>{
   return(
     <View style={{flexDirection:"row", justifyContent:"center", gap:20}}>
       <Text>+++++++++++++</Text>
       <Text>â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸</Text>
     </View>
 )
}
```
 
```js
<FlatList
       style={{borderWidth:1}}
       data={studentList}
       /* Tell the flat list which proeprty in your object is the unique identifier */
       keyExtractor={(item)=>{ return item.userid }}
       ItemSeparatorComponent={
         ()=>{
           return (             
             <View>
               <Text>â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸â¤ï¸</Text>
               {/* this does not make sense but showing it as an example to you */}
               <Button title="CLICK"/>
             </View>
           )
         }
       }
       /* Controls the appearance of each row in the flat list */
       renderItem={
             ({item})=>{
               return(
                 <View style={styles.rowItem}>
                   <Text>{item.name} {item.gpa}</Text>
                   {
                     (item.gpa >= 2.8) &&
                     <Text>PASS!</Text>
                   }

                   {/* 3a: conditionally rendering the icon using ternary operators */}
                   {
                     (item.tuitionPaid === true)
                       ?
                       <AntDesign name="checkcircle" size={24} color="black" />
                       :
                       <AntDesign name="exclamationcircleo" size={24} color="black" />
                   }
                 </View>
               )
             }
           }
     />
```
â€ƒ
#### Example 4: Creating a â€œtraditionalâ€ looking separator

Update the ItemSeparatorComponent so it displays a thin grey line between each row
![alt text](./images/wk5/image-6.png)
```js
ItemSeparatorComponent={
         ()=>{
           return (             
             <View style={{borderWidth:1, borderColor:"#cccccc", marginVertical:16}}></View>
           )
         }
       }
```
##### Accessing the current row item in a click handler
You can access the object that belongs to row using a click handler function

1.	Create a click handler function that accepts 1 parameter
```js
const btnPressed = (myObject) => {
console.log(myObject)
}
```

2.	When calling the function, pass the item into the function parameter
```js
<Button onPress={()=>{btnPressed(item)}} title="Click for more details"/>
```
![alt text](./images/wk5/image-7.png)

- When you pass the â€œitemâ€ into the function parameter, you are sending the entire object to the function
- The function can then access the object and its properties
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {
 // list of data = Javascript array
 // Step 2 : ensure each item has a property that uniquely identifies it
 // Enables to you prevent "duplicates"


 const cities = [
   {name:"London", id:0, airportCode:"LHR"},
   {name:"London", id:0, airportCode:"YXU"},
   {name:"Paris", id:1, airportCode:"CDG"},
   {name:"Toronto", id:2, airportCode:"YYZ"}  
 ]

 const vehicles = [
   {make:"Tesla", model:"Model X", licensePlate:"TESLA101"},
   {make:"Tesla", model:"Model S", licensePlate:"TESLA102"},
   {make:"Ford", model:"Focus", licensePlate:"FORD999"},
   {make:"Toyota", model:"RAV 4", licensePlate:"TOY000"},
   {make:"Toyota", model:"RAV 4", licensePlate:"TOY133"},
 ]

 // outside of your component, create a list of data
 const studentList = [
 {name:"Peter", gpa:3.0, tuitionPaid:true, userid:"psmith"},
 {name:"Emily Patel", gpa:4.0, tuitionPaid:true, userid:"epatel"},
 {name:"Suzy Lee", gpa:2.5, tuitionPaid:false, userid:"slee"},
 {name:"Peter", gpa:2.5, tuitionPaid:false, userid:"pdiaz"},
]
const btnPressed = (objFromFlatList) => {
   console.log("DEBUG: WHat object did i receive?")
   console.log(objFromFlatList)
   // if you click on row #4, then
   // objFromFlatList = {name:"Peter", gpa:2.5, tuitionPaid:false, userid:"pdiaz"
   alert(`Hello ${objFromFlatList.name}! Did you pay? ${objFromFlatList.tuitionPaid}`)
}

 return (
   <View style={styles.container}>
     <Text>This is a demo of a flatlist</Text>
     {/* Returning in 2 min to discuss these FlatList attributes */}
     <FlatList
       style={{borderWidth:1}}
       data={studentList}
       /* Tell the flat list which proeprty in your object is the unique identifier */
       keyExtractor={(item)=>{ return item.userid }}
       ItemSeparatorComponent={
         ()=>{
           return (             
             <View style={{borderWidth:1, borderColor:"#cccccc", marginVertical:16}}></View>
           )
         }
       }
       /* Controls the appearance of each row in the flat list */
       renderItem={
             ({item})=>{
               return(
                 <View style={styles.rowItem}>
                   <Text>Row demo: {item.userid}</Text>
                   <Button onPress={()=>{btnPressed(item)}} title="Click for more details"/>
                 </View>
               )
             }
           }
     />
      <Text>This is a demo of a flatlist</Text>

   </View>
 );
}

const styles = StyleSheet.create({
 rowItem : {
   flexDirection:"row",
   justifyContent:"space-between",
 },
 container: {
   flex: 1,
   backgroundColor: '#fff',   
   justifyContent: 'center',
   marginTop:80,
   marginBottom:20,
   padding:20,
 },
});
```
#### Review: How to call a function with parameter

1.	Define the function with parameters
```js
 const addNumbers = (a,b) => {
   alert(`The sum is ${a+b}`)
  }
```
2.	Set the onPress to an anonymous function
```js
<Button onPress={()=>{}} title="Add"/>
```
3.	Inside the anonymous function, call your function with parameters
```js
<Button onPress={()=>{addNumbers(10, 5)}} title="Add"/>
```

##### Example 1:  Clicking on a button in the row

In our example, each row has a button
```js
<Button onPress={btnPressed} title="Click for more details"/>
```
![alt text](./images/wk5/image-8.png)

When button pressed, show an alert with the student name and information about whether they are on the Deanâ€™s Honors List
![alt text](./images/wk5/image-9.png)

##### Example 2:  Click on the entire row
![alt text](./images/wk5/image-10.png)

Follow the same process as Example 1, but attach your click handler to a <Pressable>

- Review: <Pressable> is a generic container (similar to  a <view>), but it can be styled, and it is primarily used to detect gestures / clicks from the user


1. Surround your row user interface code with a <Pressable>

```js
<Pressable>
<View style={styles.row}>
</View>
</Pressable>
```
2. Attach the click handler to the <Pressable>
```js
<Pressable onPress={rowClicked}>
<View style={styles.row}>
</View>
</Pressable>
```

3. If you want the click handler to get access to the row data, pass the item to the click handler
```js
<Pressable onPress={()=>{rowClicked2(item)}}>
<View style={styles.row}>
</View>
</Pressable>â€ƒ
```
##### Final Code

```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {
 // list of data = Javascript array
 // Step 2 : ensure each item has a property that uniquely identifies it
 // Enables to you prevent "duplicates"


 const cities = [
   {name:"London", id:0, airportCode:"LHR"},
   {name:"London", id:0, airportCode:"YXU"},
   {name:"Paris", id:1, airportCode:"CDG"},
   {name:"Toronto", id:2, airportCode:"YYZ"}  
 ]

 const vehicles = [
   {make:"Tesla", model:"Model X", licensePlate:"TESLA101"},
   {make:"Tesla", model:"Model S", licensePlate:"TESLA102"},
   {make:"Ford", model:"Focus", licensePlate:"FORD999"},
   {make:"Toyota", model:"RAV 4", licensePlate:"TOY000"},
   {make:"Toyota", model:"RAV 4", licensePlate:"TOY133"},
 ]

 // outside of your component, create a list of data
 const studentList = [
 {name:"Peter", gpa:3.0, tuitionPaid:true, userid:"psmith"},
 {name:"Emily Patel", gpa:4.0, tuitionPaid:true, userid:"epatel"},
 {name:"Suzy Lee", gpa:2.5, tuitionPaid:false, userid:"slee"},
 {name:"Peter", gpa:2.5, tuitionPaid:false, userid:"pdiaz"},
]
const btnPressed = (objFromFlatList) => {
   console.log("DEBUG: WHat object did i receive?")
   console.log(objFromFlatList)
   // if you click on row #4, then
   // objFromFlatList = {name:"Peter", gpa:2.5, tuitionPaid:false, userid:"pdiaz"
   alert(`Hello ${objFromFlatList.name}! Did you pay? ${objFromFlatList.tuitionPaid}`)
}

 return (
   <View style={styles.container}>
     <Text>This is a demo of a flatlist</Text>
     {/* Returning in 2 min to discuss these FlatList attributes */}
     <FlatList
       style={{borderWidth:1}}
       data={studentList}
       /* Tell the flat list which proeprty in your object is the unique identifier */
       keyExtractor={(item)=>{ return item.userid }}
       ItemSeparatorComponent={
         ()=>{
           return (             
             <View style={{borderWidth:1, borderColor:"#cccccc", marginVertical:16}}></View>
           )
         }
       }
       /* Controls the appearance of each row in the flat list */
       renderItem={
             ({item})=>{
               return(
                 <Pressable onPress={()=>{btnPressed(item)}}>
                   <View style={styles.rowItem}>
                     <Text>Row demo: {item.userid}</Text>
                     <Button onPress={()=>{btnPressed(item)}} title="Click for more details"/>
                   </View>
                 </Pressable>
               )
             }
           }
     />
      <Text>This is a demo of a flatlist</Text>

   </View>
 );
}

const styles = StyleSheet.create({
 rowItem : {
   flexDirection:"row",
   justifyContent:"space-between",
 },
 container: {
   flex: 1,
   backgroundColor: '#fff',   
   justifyContent: 'center',
   marginTop:80,
   marginBottom:20,
   padding:20,
 },
});
```

##### Getting the position of the row
- Update  the renderItem property:
```js
renderItem={(rowData) => {
   console.log(rowData)
   return (
      <View style={styles.listItemRow}>
         <Text>{rowData.item.name}</Text>   
         <Button title="Delete" onPress={deleteStudent}/>
      </View>
   )
}}
```

- Rerun the application and observe the output in the Terminal
![alt text](./images/wk5/image-11.png)

- Notice the rowData variable contains the complete information that is being used to draw the row on the screen:
```js
{"index": 1, "item": {"id": "kw515", "name": "Kwame"}, "separators": {"highlight": [Function highlight], "unhighlight": [Function unhighlight], "updateProps": [Function updateProps]}}
```

# wk06s01-Multicreen_Apps.md

# BTP610; Wk06: Multicreen Apps

## Intro to Multiscreen Apps

### Learning outcomes:

- What are navigators?
- How to add additional screens to your app
- Stack Navigation: How to navigate between your screens 
- Stack Navigation: How to pass data (communicate information) between the screens of your application
- Nested Navigators


### What is a Navigator?

A navigator is a component that implements a navigation pattern.

A navigation pattern is a design pattern that describes how screens are linked together.

In mobile applications, there are typically two types of navigation patterns:

1.	Stack Navigation Pattern

    - The user navigates sequentially through a series of screens
    - The user can move â€œforwardâ€ and â€œbackwardsâ€ through the screens


2.	Tab Navigation Pattern

    - The user â€œflipsâ€ between screens
    - There is no concept of â€œforwardâ€ or â€œbackwardsâ€

![alt text](./images/wk6/image.png)
[Image Credit](https://medium.com/@panktip85/react-navigation-stack-navigation-with-tab-navigation-25578d653632)

Where To Get a Navigator Component?

The React Navigation plugin provides components, objects, and functions to implement stack or tab based navigation.

Documentation:  https://reactnavigation.org/

![alt text](./images/wk6/./images/wk6/./images/wk6/image-1.png)


## How to use Multiscreen
:

### Install Dependencies

Install the required libraries into the project:
```sh
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/stack
npx expo install react-native-gesture-handler
```

### How to Add a New Screen
1. Add a new Javascript file to the project

Add a new Javascript file to the project.

Add the word â€œScreenâ€ to your filename to indicate that this component is a screen (not some other standalone component)

![alt text](./images/wk6/./images/wk6/./images/wk6/image-2.png)

2. Add the boilerplate for a new component

React components are created using the function keyword or the arrow function syntax.

**See examples below:**

#### Using function keyword
```js
import { StyleSheet, Text, View } from 'react-native';

export default function Screen2() {
   return(
      <View style={styles.container}>
         <Text>
          Here is the Screen 2
         </Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
});
```

#### Using arrow function
```js
import { StyleSheet, Text, View } from 'react-native';

const Screen2 = () => {
   return(
      <View style={styles.container}>
         <Text>
          Here is the Screen #2
         </Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
});

export default Screen2
```

3.  Put your screens in a folder

As your application increases in complexity, consider putting your screens in their own folder:
![alt text](./images/wk6/./images/wk6/./images/wk6/image-3.png)


### Stack Navigation Code:
```js  
//App.js

import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Home" component={Screen2} />
<Stack.Screen name="Details" component={Screen3} />
</Stack.Navigator>
</NavigationContainer>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
});
```
#### Stack Navigation: Moving Between Screens
![alt text](./images/wk6/./images/wk6/image-4.png)

1. In the starting screenâ€™s function declaration, include the `{navigation}` prop.

```js
const Screen1 = ( {navigation} ) => {
}
export default Screen1;
```


2. When ready to move to another screen, call:
`navigation.navigate("_____")`

3. Replace "____" with name of the destination screen to the .navigate() function

##### Example:
```js
// App.js
<Stack.Screen name="Screen2" component={Screen2Component} />

Screen1.js
navigation.navigate('Screen2')
```

#### Stack Navigation: Sending Data to another Screen

1. On starting screen, pass a Javascript object literal to the `navigate.navigate()` function:

The properties of the object should contain the data you want to send to destination screen:

```js
//Screen1.js
navigation.navigate('Screen2', {userid:'Peter'}) ;
```

2. In the destination screenâ€™s function declaration, include the `{route}` prop.
```js
const Screen2 = ( {route} ) => {
}
export default Screen2;
```
3.  Extract the data you want. 
```js
// retrieves a value called "uname" from the route variable
const dataFromScreen1 = route.params.userid;

// OBJECT DESTRUCTURING  ARRAY DESTRUCTURING
const {userid} = route.params;
```




##### Example: Send Data to the Next Screen
 
In the navigation.navigate() function, provide a Javascript object containing the data to send to next screen
```js
//Screen1.js

import { StyleSheet, Text, View, Button } from 'react-native';

// navigation object comes from the react navigation library
// but you don't need to do an import because it automatically gets
// sent to you by the App.js <Stack.Navigator>
export default function Screen1({navigation}) {
  const btnPressed = () => {     
     navigation.navigate("Profile ABCD", {email:"peter@gmail.com", age:54, ownCar:true})
  }

  return(
     <View style={styles.container}>
        <Text>
         Here is the Screen 1
        </Text>
        <Button title="Go to next Screen" onPress={btnPressed}/>
     </View>
  )
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
  },
});
```

###### Screen 2

On Screen2, add the {route} props:
```js
//Screen2.js 
export default function Screen2({route}) {
}
```

Observe the contents of the route:
```js
export default function Screen2({route}) {
  console.log("DEBUG: What is in the route?")
  console.log(route.params)
  // other code goes here
}
```
The route object contains the data you sent, plus other information:
```sh
DEBUG: What is in route?
 LOG  
{
 "key": "Profile ABCD-NIdfKp6815jhbHvkNNt3_", 
 "name": "Profile ABCD", 
 "params": {"age": 54, "email": "peter@gmail.com", "ownCar": true},    
 "path": undefined
}
```

To access only the data you sent, use `route.params`:
```js
import { StyleSheet, Text, View, Button } from 'react-native';
export default function Screen2({navigation,route}) {

  // get the data out of the route
  const profileInfo = route.params

  const btnPressed = () => {
     navigation.navigate("Account Settings")
  }
  return(
     <View style={styles.container}>
        <Text>
        This is your profile: {profileInfo.email}
        </Text>
        <Text>
           Age: {profileInfo.age}
        </Text>
        { (profileInfo.ownCar === true) &&
         <Text>User owns a car!</Text>
        }
        <Button title="Update Profile" onPress={btnPressed}/>

     </View>
  )
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#f6e58d',
  },
});
```
Exercise:  Screen 1 passes a list of friends to Screen 2
 

When Screen 2 receives the list, it shows the friends in a <FlatList>

Screen1.js

â—	Update the navigation code to send an array of friends

navigation.navigate("Profile ABCD",
        {email:"peter@gmail.com", age:54, ownCar:false, friends:[
           {id:0, name:"Suzy"},
           {id:1, name:"Quinn"},
           {id:2, name:"Robert"},
        ]}
)


// Screen 2.js


<FlatList style={{marginVertical:70, borderWidth:1}}
   data={route.params.friends}
   keyExtractor={(item)=>{ return item.id }}
           renderItem={
              ({item})=>{
                 return(
                    <Text>{item.name}</Text>
                 )
              }
           }
        />

```js
// Screen2.js

import { StyleSheet, Text, View, Button } from 'react-native';

// navigation is a prop that is included on every screen in teh Stack
// it comes from React Navigation library
// Contain functions and variables that help you do navigation
const Screen2 = ({navigation}) => {
  const buttonPressed = () => {
     console.log("Going to next screen...")
     // specify the name / route of the screen you want to move to
     navigation.navigate("Pqr", {x:25, y:true, z:"snoop dogg", a:[25, 30, 100]})

  }
  const buttonPressed2 = () => {     
     navigation.navigate("MMM")
  }
  return(
     <View style={styles.container}>
        <Text>Here is the Screen #2</Text>
        <Button title="Go to next screen" onPress={buttonPressed}/>
        <Button title="Login to the app" onPress={buttonPressed2}/>
     </View>
  )
}
const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
  },
});


export default Screen2
```
---
```js
// Screen3.js

import { StyleSheet, Text, View } from 'react-native';

const Screen3 = ({route}) => {

  console.log("DEBUG: what is in route")
  console.log(route)

  console.log("DEBUG: key")
  console.log(route.key) // Pqr-nWcw-A9H8suXF3LAVcrfb
  console.log("DEBUG: path")
  console.log(route.path) // undefined
  console.log("DEBUG: name")
  console.log(route.name)    // pqr
  console.log("DEBUG: param")
  console.log(route.params) // the data from the prev creen

  // {"a": [25, 30, 100], "x": 25, "y": true, "z": "snoop dogg"}

  return(
     <View style={styles.container}>
       <Text>Here is the Screen #3</Text>
       <Text>Who wins the rap battle between KL and DD? {route.params.z}</Text>
       <Text>What is a[0]? {route.params.a[0]}</Text>
       <Text>What is x? {route.params.x}</Text>
       {
        (route.params.y === true) ? <Text>Y is TRUE</Text> : <Text>Y is FALSE!</Text>
       }
     </View>
  )
}
const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
  },
});

export default Screen3
â€ƒ
```
---

##### Installation:

```sh
npm install @react-navigation/bottom-tabs
```

##### Code example: Converting your App.js to use a Tab Navigator instead of a stack:

```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import your actual screens
import Screen2 from "./Screen2"
import Screen3 from "./Screen3"
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator initialRouteName="Abc">
       <Tab.Screen component={LoginScreen}  name="MMM"/>
       <Tab.Screen component={Screen2} name="Abc"/>      
     </Tab.Navigator>
   </NavigationContainer>
 );
}
 const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
```
---   

##### Customizing the appearance of the header:

```js
screenOptions={() => ({           
headerTintColor:"magenta",
headerStyle:{backgroundColor:"yellow"}
})}
```
---

##### Paste: - replace your App() function with this code

```js
export default function App() {
 return (
   <NavigationContainer>      
     {/* tells your app that we have a multiscreen app
     screens will be connected using the stack pattern  */}
     <Tab.Navigator
       initialRouteName="Abc"
       screenOptions={() => ({          
         headerTintColor:"magenta",
         headerStyle:{backgroundColor:"yellow"}
         })}       
     >
       {/* here is a list of the screens that you want connected in a stack */}
       {/* 1. name is used to "identify" the screen programatically (route)
       2. this will get displayed at the top of your screen
       3. It can be used to set the initial screen of the app */}
       <Tab.Screen component={LoginScreen}  name="MMM"/>
       <Tab.Screen component={Screen2} name="Abc"/>
       <Tab.Screen component={Screen3} name="Pqr" />       
     </Tab.Navigator>
   </NavigationContainer>
 );
}  
```
---

##### Remove the header

```js
headerShown:false
```
---


##### Code: 

```js 
export default function App() {
 return (
   <NavigationContainer>
     {/* tells your app that we have a multiscreen app
     screens will be connected using the stack pattern  */}
     <Tab.Navigator
       initialRouteName="Abc"
       screenOptions={() => ({          
         headerShown:false
       })}       
     >
       {/* here is a list of the screens that you want connected in a stack */}
       {/* 1. name is used to "identify" the screen programatically (route)
       2. this will get displayed at the top of your screen
       3. It can be used to set the initial screen of the app */}
       <Tab.Screen component={LoginScreen}  name="MMM"/>
       <Tab.Screen component={Screen2} name="Abc"/>
       <Tab.Screen component={Screen3} name="Pqr" />       
     </Tab.Navigator>
   </NavigationContainer>
 );
}
```
---

##### Right click bar

```js
headerRight:() => {
  return(
            <View style={{flexDirection:"row", alignItems:"center"}}>               
               <Text>Hello!</Text>
            </View>
         )
}
```
---

#####   Code:

```js
export default function App() {
 return (
   <NavigationContainer>
     {/* tells your app that we have a multiscreen app
     screens will be connected using the stack pattern  */}
     <Tab.Navigator
       initialRouteName="Abc"
       screenOptions={() => ({          
         headerRight:() => {
           return(
               <View style={{flexDirection:"row", alignItems:"center"}}>              
                   <Text>Hello!</Text>
               </View>
           )
         }
        
       })}       
     >
       {/* here is a list of the screens that you want connected in a stack */}
       {/* 1. name is used to "identify" the screen programatically (route)
       2. this will get displayed at the top of your screen
       3. It can be used to set the initial screen of the app */}
       <Tab.Screen component={LoginScreen}  name="MMM"/>
       <Tab.Screen component={Screen2} name="Abc"/>
       <Tab.Screen component={Screen3} name="Pqr" />       
     </Tab.Navigator>
   </NavigationContainer>
 );
}
```   
---

##### Final code: 

```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import your actual screens
import Screen2 from "./Screen2"
import Screen3 from "./Screen3"
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
 return (
   <NavigationContainer>
     {/* tells your app that we have a multiscreen app
     screens will be connected using the stack pattern  */}
     <Tab.Navigator
       initialRouteName="Abc"
       screenOptions={() => ({   
         headerTintColor:"magenta",
         headerStyle:{backgroundColor:"yellow"},      
         headerRight:() => {
           return(
               <View style={{flexDirection:"row", alignItems:"center"}}>              
                   <Text>Hello!</Text>
                   <Text>Goodbye!</Text>
               </View>
           )
         },
         headerLeft:() => {
           return(
               <View style={{flexDirection:"row", alignItems:"center"}}>              
                   <Button title="Button" onPress={()=>{ alert("boo!")}}/>
               </View>
           )
         }
        
       })}       
     >
       {/* here is a list of the screens that you want connected in a stack */}
       {/* 1. name is used to "identify" the screen programatically (route)
       2. this will get displayed at the top of your screen
       3. It can be used to set the initial screen of the app */}
       <Tab.Screen component={LoginScreen}  name="MMM"/>
       <Tab.Screen component={Screen2} name="Abc"/>
       <Tab.Screen component={Screen3} name="Pqr" />       
     </Tab.Navigator>
   </NavigationContainer>
 );
}
 const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
```
---


#### What is in route
```
 DEBUG: what is in route
{"key": "Pqr-nWcw-A9H8suXF3LAVcrfb", "name": "Pqr", "params": {"a": [25, 30, 100], "x": 25, "y": true, "z": "snoop dogg"}, "path": undefined}
Individual values

 (NOBRIDGE) LOG  Going to next screen...
 (NOBRIDGE) LOG  DEBUG: what is in route
 (NOBRIDGE) LOG  {"key": "Pqr-Xmamz4iPpTuNeUoCqBbBh", "name": "Pqr", "params": {"a": [25, 30, 100], "x": 25, "y": true, "z": "snoop dogg"}, "path": undefined}
 (NOBRIDGE) LOG  DEBUG: key
 (NOBRIDGE) LOG  Pqr-Xmamz4iPpTuNeUoCqBbBh
 (NOBRIDGE) LOG  DEBUG: path
 (NOBRIDGE) LOG  undefined
 (NOBRIDGE) LOG  DEBUG: name
 (NOBRIDGE) LOG  Pqr
 (NOBRIDGE) LOG  DEBUG: param
 (NOBRIDGE) LOG  {"a": [25, 30, 100], "x": 25, "y": true, "z": "snoop dogg"}
â€ƒ
```




# wk06s02-lifecycle.md

# BTP610; Week 6, Session 2
## Life Cycle Functions
________________________________________

### Dependencies
```sh
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/stack
npx expo install react-native-gesture-handler
npm install @react-navigation/bottom-tabs
```

They introduce new components that are specifically used for handling navigation
![introduce new components that are specifically used for handling navigation](./images/WK6b/image-3.png)

### 2 Screens Example

```js
// screens/Screen1.js
import { StyleSheet, Text, View, Button } from 'react-native';
const Screen1 = ({navigation}) => {
  
   const buttonPressed = () => {
       navigation.navigate("Screen 2")
   }
   return(
       <View>
           <Text>This is screen 1</Text>
           <Button title="Go to next" onPress={buttonPressed}/>
       </View>
   )
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
});

export default 
```
---

```js   
// screens/Screen2.js
	import { StyleSheet, Text, View } from 'react-native';
const Screen1 = () => {
  
   return(
       <View>
           <Text>This is screen 2</Text>
       </View>
   )
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
});

export default Screen1
```
---

```js
//  App.js

import { StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";


const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Screen 1">
       <Stack.Screen name="Screen 1" component={Screen1} />
       <Stack.Screen name="Screen 2" component={Screen2} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
});
```
---

## React component lifecycle

### **Diagram of the lifecycle**
https://camo.githubusercontent.com/4784a81d4ad6a73f82a836724237c172d3418d0ef63bdc792c82ef91b69f2293/68747470733a2f2f70726f6a656374732e776f6a74656b6d616a2e706c2f72656163742d6c6966656379636c652d6d6574686f64732d6469616772616d2f6f67696d6167652e706e67

- The React component lifecycle refers to the sequence of events that happen from the moment a component is created (mounted) to the moment it is no longer needed (unmounted).

- There are 3 main lifecycle function (functions provided by the SDK that enable you to hook into (look) at the life cycle of a component):

    - MOUNTING:   This event fires when the component (screen) is first loaded
        - When the screen loads, connect to a database and pull some data

```js
useEffect(()=>{}, [])
```

    - UPDATING:  This event fires when the component UI updates. When the screen user interface needs to update itself, then the event will fire

```js
useEffect(()=>{})
```

    - UNMOUNTING:   This event fires when the component is no longer needed.  React Native will delete that screen from memory.

```js
useEffect(()=>{
   return ()=>{}
 },[])
```


#### `screens/Screen2.js`

![alt text](./images/WK6b/image-1.png)
```js
//screens/Screen2.js
import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react"

export default Screen2 = () => {

 // state variable
 const [nameToDisplay, setNameToDisplay] = useState("")
 // life cycle functions on screen #2

 // 1. MOUNTING:
 useEffect(()=>{}, [])

 // 2. UPDATE
 useEffect(()=>{})

 // 3. UNMOUNT:
 useEffect(()=>{
   return ()=>{}
 },[])

 const btnPressed = () => {
   const friends = ["Abby", "Bobby", "Carlos", "Diego", "Emily", "Francis"]
   const randomPosition = Math.floor(Math.random() * (friends.length) + 0)
   setNameToDisplay(friends[randomPosition])   
 }

 return (
   <View style={styles.container}>
     <Text style={styles.headingText}>Screen 2</Text>
     <Text style={styles.text}>{nameToDisplay}</Text>  
     <Button onPress={btnPressed} title="Click Me"/>
   </View>    
   
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   padding:20,
 },
 headingText: {
   fontSize: 30,
   textAlign: "center",
   paddingBottom: 5,
 },
 text: {
   fontSize: 20,
 },   
});


```
---

Update code to executes a console.log() when the screen appears or disappears:
![Update code to executes a console.log() when the screen appears or disappears](./images/WK6b/image-2.png)

```js
import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react"

export default Screen2 = () => {

// state variable
const [nameToDisplay, setNameToDisplay] = useState("")
// life cycle functions on screen #2

// 1. MOUNTING: This lifecycle function executes when app requests this screen to appear on the device
useEffect(()=>{
   // code you want to execute when the mounting phase occurs
   console.log("+++ SCREEN2 is MOUNTING")
}, [])

// 2. UPDATE
useEffect(()=>{})

// 3. UNMOUNT: This function executes when the screen is no longer needed (when the screen disappears)
useEffect(()=>{
  return ()=>{
   // code you want to execute when the unmounting phase occurs.
   console.log("+++ SCREEN2 is UNMOUNTING")
  }
},[])


const btnPressed = () => {
   // When button pressed, pick a random friend from the array and display it on the screen
  const friends = ["Abby", "Bobby", "Carlos", "Diego", "Emily", "Francis"]
  const randomPosition = Math.floor(Math.random() * (friends.length) + 0)
  setNameToDisplay(friends[randomPosition])  
}


return (
  <View style={styles.container}>
    <Text style={styles.headingText}>Screen 2</Text>
    <Text style={styles.text}>{nameToDisplay}</Text> 
    <Button onPress={btnPressed} title="Click Me"/>
  </View>   
 
);
};


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#fff",
  padding:20,
},
headingText: {
  fontSize: 30,
  textAlign: "center",
  paddingBottom: 5,
},
text: {
  fontSize: 20,
},  
});

```
---
### Mounting and unmounting in a Tab Navigator

Observe that when your screens are connected in a Tab Navigator, you get different behaviour:

![alt text](./images/WK6b/image-1.png)

If the unmount never occurs, then that means the screen is never removed from memory


Installed the tab navigtaion library: `npm install @react-navigation/bottom-tabs`

```js
App.js

import { StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator initialRouteName="Screen 1">
       <Tab.Screen name="Screen 1" component={Screen1} />
       <Tab.Screen name="Screen 2" component={Screen2} />
     </Tab.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
});
```
--- 

### How do you know which tab you are on?

The react native navigation library provides access to a custom hook function that programmatically determines if you are on the current screen.
```js
import { useIsFocused } from "@react-navigation/native";
```


The `useIsFocused` function will detect when the user is on Screen 2 (and when they are not)

![alt text](./images/WK6b/image-4.png)

## Code

```js
import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react"

import { useIsFocused } from "@react-navigation/native";

export default Screen2 = () => {

// state variable
const [nameToDisplay, setNameToDisplay] = useState("")
// life cycle functions on screen #2

// 1. MOUNTING: This lifecycle function executes when app requests this screen to appear on the device
useEffect(()=>{
   // code you want to execute when the mounting phase occurs
   console.log("+++ SCREEN2 is MOUNTING")
}, [])

// 2. UPDATE
useEffect(()=>{})

// 3. UNMOUNT: This function executes when the screen is no longer needed (when the screen disappears)
useEffect(()=>{
  return ()=>{
   // code you want to execute when the unmounting phase occurs.
   console.log("+++ SCREEN2 is UNMOUNTING")
  }
},[])


// 4. UseIsFocused
const screenIsActive = useIsFocused()

useEffect(()=>{
   console.log(`+++ SCREEN2: USEISFOCUSED executing.  Is user on Screen 2? ${screenIsActive}`)
},[screenIsActive])


const btnPressed = () => {
   // When button pressed, pick a random friend from the array and display it on the screen
  const friends = ["Abby", "Bobby", "Carlos", "Diego", "Emily", "Francis"]
  const randomPosition = Math.floor(Math.random() * (friends.length) + 0)
  setNameToDisplay(friends[randomPosition])  
}


return (
  <View style={styles.container}>
    <Text style={styles.headingText}>Screen 2</Text>
    <Text style={styles.text}>{nameToDisplay}</Text> 
    <Button onPress={btnPressed} title="Click Me"/>
  </View>   
 
);
};


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#fff",
  padding:20,
},
headingText: {
  fontSize: 30,
  textAlign: "center",
  paddingBottom: 5,
},
text: {
  fontSize: 20,
},  
});
```
---


#### Update Function

![alt text](./images/WK6b/image-5.png)

```js
// 2. UPDATE
useEffect(()=>{
   console.log("++++ SCREEN2: Update phase. Something on the screen has changed.")
})
```

Example: 

```js
import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react"

import { useIsFocused } from "@react-navigation/native";

export default Screen2 = () => {

// state variable
const [nameToDisplay, setNameToDisplay] = useState("")
// life cycle functions on screen #2

// 1. MOUNTING: This lifecycle function executes when app requests this screen to appear on the device
useEffect(()=>{
   // code you want to execute when the mounting phase occurs
   console.log("+++ SCREEN2 is MOUNTING")
}, [])

// 2. UPDATE
useEffect(()=>{
   console.log("++++ SCREEN2: Update phase. Something on the screen has changed.")
})

// 3. UNMOUNT: This function executes when the screen is no longer needed (when the screen disappears)
useEffect(()=>{
  return ()=>{
   // code you want to execute when the unmounting phase occurs.
   console.log("+++ SCREEN2 is UNMOUNTING")
  }
},[])



// 4. UseIsFocused
const screenIsActive = useIsFocused()

useEffect(()=>{
   console.log(`+++ SCREEN2: USEISFOCUSED executing.  Is user on Screen 2? ${screenIsActive}`)
},[screenIsActive])


const btnPressed = () => {
   // When button pressed, pick a random friend from the array and display it on the screen
  const friends = ["Abby", "Bobby", "Carlos", "Diego", "Emily", "Francis"]
  const randomPosition = Math.floor(Math.random() * (friends.length) + 0)
  setNameToDisplay(friends[randomPosition])  
}

const [luckyNumber, setLuckyNumber] = useState(1)

const btnPressed2 = () => {
   const num = Math.floor(Math.random() * (10 - 1 + 1) + 1);
   setLuckyNumber(num)
}

return (
  <View style={styles.container}>
    <Text style={styles.headingText}>Screen 2</Text>
    <Text style={styles.text}>{nameToDisplay}</Text> 
    <Button onPress={btnPressed} title="Click Me"/>
    <Button onPress={btnPressed2} title="Get Lucky Number"/>
    {
       (luckyNumber > 5)
       ? <Text style={styles.text}>You win! {luckyNumber}</Text>
       : <Text style={styles.text}>You Lose! {luckyNumber}</Text>
    }
  </View>   
 
);
};


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#fff",
  padding:20,
},
headingText: {
  fontSize: 30,
  textAlign: "center",
  paddingBottom: 5,
},
text: {
  fontSize: 20,
},  
});


```
---

### Code example with lucky number

```js
import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react"

import { useIsFocused } from "@react-navigation/native";

export default Screen2 = () => {

// state variable
const [nameToDisplay, setNameToDisplay] = useState("")
// life cycle functions on screen #2

// 1. MOUNTING: This lifecycle function executes when app requests this screen to appear on the device
useEffect(()=>{
   // code you want to execute when the mounting phase occurs
   console.log("+++ SCREEN2 is MOUNTING")
}, [])


// 3. UNMOUNT: This function executes when the screen is no longer needed (when the screen disappears)
useEffect(()=>{
  return ()=>{
   // code you want to execute when the unmounting phase occurs.
   console.log("+++ SCREEN2 is UNMOUNTING")
  }
},[])



// 4. UseIsFocused
const screenIsActive = useIsFocused()

useEffect(()=>{
   console.log(`+++ SCREEN2: USEISFOCUSED executing.  Is user on Screen 2? ${screenIsActive}`)
},[screenIsActive])


const btnPressed = () => {
   // When button pressed, pick a random friend from the array and display it on the screen
  const friends = ["Abby", "Bobby", "Carlos", "Diego", "Emily", "Francis"]
  const randomPosition = Math.floor(Math.random() * (friends.length) + 0)
  setNameToDisplay(friends[randomPosition])  
}

const [luckyNumber, setLuckyNumber] = useState(1)

const btnPressed2 = () => {
   const num = Math.floor(Math.random() * (10 - 1 + 1) + 1);
   setLuckyNumber(num)
}



// 2. UPDATE: This executes when ANY state variable changes
useEffect(()=>{
   console.log("++++ SCREEN2: Update phase. Something on the screen has changed.")
})
// Will execute every time luckyNumber state variable updates
useEffect(()=>{
   console.log("++++ SCREEN2: Update phase. Lucky number state variable changed.")
},[luckyNumber])

return (
  <View style={styles.container}>
    <Text style={styles.headingText}>Screen 2</Text>
    <Text style={styles.text}>{nameToDisplay}</Text> 
    <Button onPress={btnPressed} title="Click Me"/>
    <Button onPress={btnPressed2} title="Get Lucky Number"/>
    {
       (luckyNumber > 5)
       ? <Text style={styles.text}>You win! {luckyNumber}</Text>
       : <Text style={styles.text}>You Lose! {luckyNumber}</Text>
    }
  </View>   
 
);
};


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#fff",
  padding:20,
},
headingText: {
  fontSize: 30,
  textAlign: "center",
  paddingBottom: 5,
},
text: {
  fontSize: 20,
},  
});
```
---






# wk07s01-nested_navigators.md

#BBTP610; Week 7, Session 1  

## Nested Navigators

### What is a nested navigator?

- The app implements more than one navigation pattern
- Example:  A stack inside a tab
- Example:  A tab inside a stack


### Use todayâ€™s starter code:
- Unzip the code
- Open the project in VSCode
- Open a Terminal
- Run: `npm install`
- Run the project:
    - At home:  `npx expo start`            
    - At college:  `npx expo start â€“tunnel`

    
![alt text](image.png)

### Example: Embedding a Stack within a Tab


1.	In the App.js, create a custom component that contains a Stack Navigator

```js
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>         
       <Stack.Screen name="First Screen" component={Screen1} />
       <Stack.Screen name="Second Screen" component={Screen2} />
   </Stack.Navigator>
 )
}


2.	In the Tab navigator, add the custom component created in #1


export default function App() {

 return (
   <NavigationContainer>
     <Tab.Navigator>         
         <Tab.Screen name="Account Settings" component={AccountSettingsScreen} />
         <Tab.Screen name="My Home Page" component={HomeScreen} />
         <Tab.Screen name="ABC" component={StackContainerComponent}/>
     </Tab.Navigator>
   </NavigationContainer>
 );

}


â€ƒ

Full Code: Screen1.js

import { StyleSheet, Text, View, Button } from 'react-native';

const Screen1 = ({navigation}) => {

   const btnPressed = () => {
       navigation.navigate("Second Screen")
   }
  return(
     <View style={styles.container}>
        <Text style={styles.text}>
         Here is the Screen1
        </Text>
        <Button title="Go to next screen" onPress={btnPressed}/>
     </View>
  )
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     justifyContent:"center",
     alignItems:"center",
  },
  text:{
   fontSize:20,
  }
});


export default Screen1
```
---

### Full code: App.js

```js
// App.js
import { StyleSheet, Text, View } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>        
       <Stack.Screen name="First Screen" component={Screen1} />
       <Stack.Screen name="Second Screen" component={Screen2} />
   </Stack.Navigator>
 )
}

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator initialRouteName="Account Settings">
       <Tab.Screen name="My Home Page" component={HomeScreen} />
       <Tab.Screen name="Demo" component={StackContainerComponent} />
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})
```
---

###     Screen options review:

```js
import { StyleSheet, Text, View } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator
     screenOptions={() => ({          
       headerTintColor:"magenta",
       headerStyle:{backgroundColor:"yellow"}
       })}
   >        
       <Stack.Screen name="First Screen" component={Screen1} />
       <Stack.Screen name="Second Screen" component={Screen2} />
   </Stack.Navigator>
 )
}

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator
        screenOptions={() => ({          
         headerTintColor:"white",
         headerStyle:{backgroundColor:"black"}
       })}
     >
       <Tab.Screen name="My Home Page" component={HomeScreen} />
       <Tab.Screen name="Demo" component={StackContainerComponent} />
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})

â€ƒ
Controlling the header on individual screens:

import { StyleSheet, Text, View } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>        
       <Stack.Screen
         name="First Screen"
         component={Screen1}
         options={() => ({          
           headerTintColor:"black",
           headerStyle:{backgroundColor:"#FC427B"}
           })}
       />
       <Stack.Screen
         name="Second Screen"
         component={Screen2}
         options={() => ({          
           headerTintColor:"magenta",
           headerStyle:{backgroundColor:"yellow"}
           })}
       />
   </Stack.Navigator>
 )
}

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator
        screenOptions={() => ({          
         headerTintColor:"white",
         headerStyle:{backgroundColor:"black"}
       })}
     >
       <Tab.Screen name="My Home Page" component={HomeScreen} />
       <Tab.Screen name="Demo" component={StackContainerComponent} />
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})
```
---

### How to remove the double header on the Demo Screen

```js
import { StyleSheet, Text, View } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>        
       <Stack.Screen
         name="First Screen"
         component={Screen1}
         options={() => ({          
           headerTintColor:"black",
           headerStyle:{backgroundColor:"#FC427B"}
           })}
       />
       <Stack.Screen
         name="Second Screen"
         component={Screen2}
         options={() => ({          
           headerTintColor:"magenta",
           headerStyle:{backgroundColor:"yellow"}
           })}
       />
   </Stack.Navigator>
 )
}

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator
        screenOptions={() => ({          
         headerTintColor:"white",
         headerStyle:{backgroundColor:"black"}
       })}
     >
       <Tab.Screen name="My Home Page" component={HomeScreen} />
       <Tab.Screen name="Demo"
         component={StackContainerComponent}
         options={() => ({         
           headerShown:false
           })}/>
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})
```
---

### Configuring a header within the Screen component


1. Import use effect

```js
import {useEffect} from "react"
```

2. Add a useEffect() to the screen that triggers on the navigation prop

```js
// this function will execute when the navigation variable changes (updates)
useEffect(()=>{},[navigation])
```

3.  Inside the `useEffect()`, add the `navigation.setOptions({})`

This function is used to set the properties of the screenâ€™s header:

```js
useEffect(()=>{
     navigation.setOptions({
         
     })
  },[navigation])
```

4. Add the properties you want to modify

Relevant properties include:
- title			â†’ Update the displayed title of the screen
- headerStyle		â†’ Sets the background color of the header bar
- headerTintColor	â†’ Set the text color of the screen title in the header bar
- headerShown	â†’ Shows or hides the header (set to true/false)
- headerRight		â†’  Adds user interface elements to the right side of the header bar
- headerLeft		â†’ Adds user interface elements to the left side of the header bar

For example:

```js
// set navigation options for this screen
  useEffect(()=>{
     navigation.setOptions({
         headerRight: () => (
           <Button onPress={btnPressed} title="Go!!" />
         ),
        title:"My Home Page!"
       })
  },[navigation])
```


    â€ƒ
### Full code: Screen1.js

```js
// Screen1.js
import { StyleSheet, Text, View, Button } from 'react-native';
import {useEffect} from "react"


const Screen1 = ({navigation}) => {
   // this function will execute when the navigation variable changes (updates)
  useEffect(()=>{
     // add the configuration for your header inside here
     navigation.setOptions({
        title:"My Custom Title",
        headerTintColor:"orange",
        headerRight: () => (
           <Button onPress={btnPressed} title="Go!!" />
         ),
  
     })
  },[navigation])



  const btnPressed = () => {
       navigation.navigate("Second Screen")
  }
  return(
     <View style={styles.container}>
        <Text style={styles.text}>
         Here is the Screen1
        </Text>
        <Button title="Go to next screen" onPress={btnPressed}/>
     </View>
  )
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     justifyContent:"center",
     alignItems:"center",
  },
  text:{
   fontSize:20,
  }
});


export default Screen1  
```
---

### Example: Adding an additional button to the header

```js
import { StyleSheet, Text, View, Button } from 'react-native';
import {useEffect, useState} from "react"


const Screen1 = ({navigation}) => {
   const [resultLabel, setResultLabel] = useState()


  // this function will execute when the navigation variable changes (updates)
  useEffect(()=>{
     // add the configuration for your header inside here
     navigation.setOptions({
        title:"My Custom Title",
        headerTintColor:"orange",
        headerRight: () => (
           <View style={styles.row}>
              <Button onPress={btnPressed} title="Go!!" />
              <Button onPress={generateNumber} title="Random" />
           </View>
         ),
     })
  },[navigation])


  const generateNumber = () => {
     const random = Math.floor(Math.random() * (100 - 50 + 1) + 50)     
     setResultLabel(random)
  }

  const btnPressed = () => {
       navigation.navigate("Second Screen")
  }
  return(
     <View style={styles.container}>
        <Text style={styles.text}>
         Here is the Screen1
        </Text>
        <Text style={styles.text}>
         {resultLabel}
        </Text>
        <Button title="Go to next screen" onPress={btnPressed}/>
     </View>
  )
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     justifyContent:"center",
     alignItems:"center",
  },
  text:{
   fontSize:20,
  },
  row : {
     flexDirection:"row"
  }
});


export default Screen1
```
---

### Example: Putting an icon in the top bar

Choose an icon here: https://icons.expo.fyi/Index

```js
import { StyleSheet, Text, View, Button } from 'react-native';
import {useEffect, useState} from "react"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const Screen1 = ({navigation}) => {
   const [resultLabel, setResultLabel] = useState()


  // this function will execute when the navigation variable changes (updates)
  useEffect(()=>{
     // add the configuration for your header inside here
     navigation.setOptions({
        title:"My Custom Title",
        headerTintColor:"orange",
        headerRight: () => (
           <View style={styles.row}>
              <Button onPress={btnPressed} title="Go" />
              <Button onPress={generateNumber} title="Random" />
              <FontAwesome5 name="search" size={24} color="black" />
           </View>
         ),
     })
  },[navigation])


  const generateNumber = () => {
     const random = Math.floor(Math.random() * (100 - 50 + 1) + 50)     
     setResultLabel(random)
  }

  const btnPressed = () => {
       navigation.navigate("Second Screen")
  }
  return(
     <View style={styles.container}>
        <Text style={styles.text}>
         Here is the Screen1
        </Text>
        <Text style={styles.text}>
         {resultLabel}
        </Text>
        <Button title="Go to next screen" onPress={btnPressed}/>
     </View>
  )
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     justifyContent:"center",
     alignItems:"center",
  },
  text:{
   fontSize:20,
  },
  row : {
     flexDirection:"row",
     alignItems:"center",
  }
});


export default Screen1
```
---

### Customizing the Tab Bar Icons

1.	Choose icons from here:   

`https://icons.expo.fyi/Index`


2.	Add the screenOptions property to the Tab.Navigator. Set the property to a function with an object parameter.

`<Tab.Navigator screenOptions={()=>({})}>`   

3.	Add the route prop:

`<Tab.Navigator screenOptions={()=>({route})}>   

![alt text](image-1.png)


4.	Set the tabBarIcon property:

```js
import { StyleSheet, Text, View } from "react-native";

import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";

const Tab = createBottomTabNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator screenOptions={({ route })=>({
       tabBarIcon:({ focused, color, size }) => {
         if (route.name == "Home") {
           return(
               <Feather name="home" size={24} color="magenta" />
           )
         } else if (route.name == "Detail") {
           return(
             <MaterialCommunityIcons name="account-details" size={24} color="black" />
           )
         }
       }
     })}>     
       <Tab.Screen name="Home" component={HomeScreen} />
       <Tab.Screen name="Detail" component={DetailScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
});

```
---

### Example: Add icons to your tab 

```js

import { StyleSheet, Text, View } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>        
       <Stack.Screen
         name="First Screen"
         component={Screen1}         
       />
       <Stack.Screen
         name="Second Screen"
         component={Screen2}
         options={() => ({          
           headerTintColor:"magenta",
           headerStyle:{backgroundColor:"yellow"}           
           })}
       />
   </Stack.Navigator>
 )
}

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator
        screenOptions={({route}) => ({          
         headerTintColor:"white",
         headerStyle:{backgroundColor:"black"},
         tabBarIcon: ({focused, color, size})=> {
           // your if statement goes here
           if (route.name === "My Home Page") {
             return (
               <FontAwesome name="home" size={24} color="black" />
             )
           } else if (route.name === "Demo") {
             return (
               <MaterialIcons name="goat" size={24} color="black" />
             )
           } else if (route.name === "Account Settings") {
             return (
               <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" />
             )
           }
         }

       })}
     >
       <Tab.Screen name="My Home Page" component={HomeScreen} />
       <Tab.Screen name="Demo"
         component={StackContainerComponent}
         options={() => ({         
           headerShown:false
           })}/>
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})
```
---

### Example: UPdating the badge when a button is clicked        

![alt text](image-2.png)
```js

import { StyleSheet, Text, View, Button } from "react-native"

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// used with stack navigators:
import "react-native-gesture-handler"

// screens
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import AccountScreen from "./screens/AccountScreen"
import HomeScreen from "./screens/HomeScreen"

// icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// navigation pattern code
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

import {useState} from "react"


// custom component that contains a stack
const StackContainerComponent = () => {
 return(
   <Stack.Navigator>        
       <Stack.Screen
         name="First Screen"
         component={Screen1}         
       />
       <Stack.Screen
         name="Second Screen"
         component={Screen2}
         options={() => ({          
           headerTintColor:"magenta",
           headerStyle:{backgroundColor:"yellow"}           
           })}
       />
   </Stack.Navigator>
 )
}

export default function App() {


 const [num, setNum] = useState(2)

 const testGenerator = () => {
   const random = Math.floor(Math.random() * (100 - 50 + 1) + 50)     
   setNum(random)
}


 return (
   <NavigationContainer>
     <Tab.Navigator
        screenOptions={({route}) => ({          
        
         tabBarIcon: ({focused, color, size})=> {
           // your if statement goes here
           if (route.name === "My Home Page") {
             return (
               <FontAwesome name="home" size={24} color="black" />
             )
           } else if (route.name === "Demo") {
             return (
               <MaterialIcons name="goat" size={24} color="black" />
             )
           } else if (route.name === "Account Settings") {
             return (
               <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" />
             )
           }
         }

       })}
     >
       <Tab.Screen
         name="My Home Page"
         component={HomeScreen}
         options={() => ({         
           tabBarBadge:num,
           headerRight:()=>{
             return <Button onPress={testGenerator} title="Click!"/>
           }
          })}/>
       <Tab.Screen name="Demo"
         component={StackContainerComponent}
         options={() => ({         
           headerShown:false
           })}/>
       <Tab.Screen name="Account Settings" component={AccountScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 )
}
const styles = StyleSheet.create({})
```
---

    
    






# wk08-APIs.md

# BTP 610;Week 8 - APIs

## Topics

1.	Review: What is an API
2.	Review: How to fetch data from an API in a normal web application
3.	How to fetch data from an API in a React Native app and display in a list (week 9 session 01)

## What is a Web API?

- Web APIS are websites that contain a repository of data. For example:

    - Sport scores: https://api-sports.io/
    - Weather data: https://openweathermap.org/api
    - Currency exchange values: https://www.xe.com/xecurrencydata/
    - Schedule of TTC bus arrivals: https://open.toronto.ca/dataset/ttc-real-time-next-vehicle-arrival-nvas/
    - Products in a store: https://fakestoreapi.com/

- The API provides an interface that you can use to access the repository of data programmatically.

- Typically, the interface consists of a server endpoint or server url

- When you access the endpoint/url, the website will return the corresponding data to you in a machine-readable format.
	
    - A machine-readable format is a technique for structuring data to make it easy for software to read and manipulate the data programmatically.
    - Popular structured data formats include: JSON and XML

- Most modern APIs will respond with JSON data.

## Why do you need an API?

- API data is used to enrich your application

- The advantage of using an API is that you do not have to manually collect, update, and maintain the data yourself. 

- Offloading data collection to 3rd parties is advantageous even for large companies like Google and Microsoft.

- In the below examples, notice that both Microsoft and Google can display weather data
- The weather data comes from Weather.com (not self-collected by Microsoft or Google engineers).  
- In other words, Microsoft and Google are consuming data
- Consuming data enables a developer to focus on the presentation of the data, rather than the collection of data.  In the below screenshots, observe:
    - The difference in user interface
    - The difference in displayed weather data (Microsoft shows sunrise, sunset and historical weather data. Google does not.)


Image: Weather search results in Google
![alt text](image.png)

Weather search results in Microsoft Bing:
![alt text](image-1.png)

## How to use an API in a regular web application?

In Javascript, we use the built-in fetch and json functions to retrieve data from an api and convert the data to a JSON data structure.

- fetch(url)  â†’ Connects to the specified url and returns a promise containing a Response object.  
- The Response object is a built-in data structure that represents the response to a web request
- Documentation:  https://developer.mozilla.org/en-US/docs/Web/API/Response

- .json() â†’ converts a Response object to a Javascript data structure (array of javascript objects, or a single javascript object)

## Code Example:  Retrieving data from an API

In this example, we review how ot use the fetch() and json() functions to retrieve data from an API

- Sample API containing fake employee information: https://jsonplaceholder.typicode.com/users
![alt text](image-2.png)


- Code for retrieving and outputting data from the API:
    - Try this out by copying and pasting the code here:  https://playcode.io/javascript

```javascript
// 1. create a function that get the API data
// we need async() because our function code uses an await somehwere
// the rule of using await is that the function must use an async
const getData = async () => {
 // a. Connect to the api endpoint and get the response
 // You must have the fetch() execute as a background task
 // In JS: await forces the operation to execute in the background
 const response = await fetch('https://jsonplaceholder.typicode.com/users');
 console.log(response);

 // b. Convert the response into a Javascript data structure
 // - array of javascript objects (https://jsonplaceholder.typicode.com/users)
 // - single javascript object.   (https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873)
 const data = await response.json();
 console.log(data);
 // .json() has automatically converted the api to an array of js objects




 // c. do something with the (display it in your app)
 // - web app, then show it in the console.error
 // -react native, then show it in a FlatList in your ui
 console.log(`How many items are in the array? ${data.length}`)
 console.log(data[0].name)
 console.log(data[0].email)
 console.log(data[0].address.city)
 console.log(data[0].address.geo.lat)
 console.log(data[0].address.geo.lng)

 for (let i = 0; i < data.length; i++) {
   console.log(data[i].name)
 }


};

// 2. use the function in your program
console.log('API DEMO');
getData();
```

![alt text](image-3.png)

### Code Breakdown

1.	The fetch() and json() functions are marked with await because both functions return a Promise and thus must be executed as a background task

```javascript
const response = await fetch(url);
const data = await response.json();
```


2.	Because there are await statements in the code, the function must be marked with the async keyword.  Recall that async and await always go together!

```javascript
const getData = async () => {
    // code goes here
}
```


3.	If successful, the response.json() function will return the data as either:

- a.	A Javascript object literal
- b.	An array of data

```javascript
const data = await response.json();
console.log(data);
```

In this case, the API data contains an array of values.  
![alt text](image-4.png)


Thus, the response.json() function returns an array of javascript object literals

![alt text](image-5.png)

## Example: Code example of an api that converts to a single json object

```javascript
// 1. create a function that get the API data
// we need async() because our function code uses an await somehwhere
// the rule of using await is that the function must use an async
const getData = async () => {
 // a. Connect to the api endpoint and get the response
 // You must have the fetch() execute as a background task
 // In JS: await forces the operation to execute in the background
 const response = await fetch('https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873');
 console.log(response);

 // b. Convert the response into a Javascript data structure
 // - array of javascript objects (https://jsonplaceholder.typicode.com/users)
 // - single javascript object.   (https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873)
 const data = await response.json();
 console.log(data);
 // .json() has automatically converted the api to an JS object


 // c. do something with the (display it in your app)
 // - web app, then show it in the console.error
 // -react native, then show it in a FlatList in your ui
 console.log(data.status)
 console.log(data.results.golden_hour)
 console.log(data.results.date)
 console.log(data.results.sunrise)
};

// 2. use the function in your program
console.log('API DEMO');
getData();
```

## Example: Object destructuring syntax:

You can use object destructuring syntax to simplify your code syntax when using properties in a Javascript object.

In the code below, observe how to use object destructring to retrieve the properties of the student.

```javascript
const student = {
 name:"Peter",
 age:51,
 email:"peter@gmail.com",
 favCourse: {
   code:"BTI425",
   coursename:"Web Programming #3",
   prof: {fullname:"David", contact:"david@seneca.ca"}
 }
}

// extract the properties of the student
console.log(student.name)
console.log(student.age)
console.log(student.email)

// object destructing syntax
// create individual variables that contain the properties
const {name, age, email, favCourse} = student
console.log(name)
console.log(age)
console.log(email)

const {code, coursename, prof} = favCourse
console.log(code)
console.log(coursename)

const {fullname, contact} = prof
console.log(fullname)
console.log(contact)
```
---

In React Native, object destructring is used in a variety of places:

- Props on a custom component

### Using dot syntax to get the props	
```javascript
<Song name="APT" artist="Rose f Bruno Mars"/>

export function Song(props) {

   return(
       <View>
           <Text>{props.name} by {props.artist}</Text>
       </View>
   )
}
```
    

### Using object destructing 
```javascript
<Song name="APT" artist="Rose f Bruno Mars"/>

export function Song({name, artist}) {

   return(
       <View>
           <Text>{name} by {artist}</Text>
       </View>
   )
}

```
---

- Navigation object on a screen

```javascript
const HomeScreen = ({navigation}) => {

  useEffect(()=>{
     navigation.setOptions({        
        headerRight: () => (
           <View style={styles.row}>
              <Pressable onPress={addPressed}>
                 <Entypo name="add-to-list" size={24} color="black" />
              </Pressable>              
           </View>
         ),
     })   
  }, [navigation])


  const addPressed = () => {
     // navigate to next screen
     navigation.navigate("Add a Task")
  }

  return()

}
```

- Rendering the row for the FlatList

```javascript
<FlatList
           data={tasks}
           keyExtractor={(item)=>{ return item.id }}
           ItemSeparatorComponent={
              ()=>{
                return(
                  <View style={styles.divider}></View>
              )
             }
           }
           renderItem={
           ({item})=>{
                 return(
                    <View style={styles.rowContainer}>
                       <Text>{item.name}</Text>
                       {
                          (item.isHighPriority === true) &&
                          <FontAwesome name="exclamation-circle" size={24} color="black" />
                       }                    
                    </View>
                 )
              }
           }
     />
```
---


## Fetching API Data in a React Native App

Most applications will retrieve API data when the screen loads.

To implement this behaviour:

1. Add a hook function for the mounting phase (this is the lifecycle function that executes when the screen loads)

```javascript
useEffect(()=>{},[])
```

2. Inside the mounting phase, retrieve the data from the API

```javascript
useEffect(()=>{
	const response = fetch(...)
          const data  = response.json()
},[])
```

3. Save the data (array) to a state variable

```javascript
const [listitems, setListItems] = useState([])

useEffect(()=>{
	const response = fetch(...)
          const data  = response.json()
	setListItems([...data])
},[])
```

4. Attach the state variable to a FlatLIst

```javascript
<FlatList data ={listitems} key={} renderItem={}/>
```

5. Done
â€ƒ
## Build a screen that displays a list of users 

The users are retrieved from the RandomUserAPI

https://randomuser.me/api/?results=5

1. Create a RN project
2. Detect when the screen loads:

```javascript
import { StyleSheet, Text, View, FlatList  } from 'react-native';
import {useEffect} from "react"

export default function App() {

 useEffect(()=>{
   console.log("DEBUG: Screen is loading..")
 },[])


 return (
   <View style={styles.container}>
     <Text style={styles.header}>Demo of API</Text>


     {/* <FlatList
         style={styles.list}
         data={}
         keyExtractor={(item)=>{ return item.id }}
         ItemSeparatorComponent={
           ()=>{
             return(
               <View style={styles.divider}></View>
           )
           }
         }
         renderItem={
         ({item})=>{
               return(
                 <View style={styles.rowContainer}>
                     <Text>{item.name}</Text>
                     {
                       (item.isHighPriority === true) &&
                       <FontAwesome name="exclamation-circle" size={24} color="black" />
                     }                   
                 </View>
               )
           }
         }
    /> */}
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
 list: {
   borderWidth:3,
   borderColor:"magenta"
 },
 header: {
   fontSize:30
 }
});
```
___

3. Retrieve the API data

- Theoreitcal answer

```javascript
useEffect(async ()=>{
   console.log("DEBUG: Screen is loading..")
   const response = await fetch('https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873');
   const data = await response.json()
   console.log(data)
 },[])
```

![alt text](image-6.png)



To fix this:
![alt text](image-7.png)

```javascript
import { StyleSheet, Text, View, FlatList  } from 'react-native';
import {useEffect} from "react"

export default function App() {

 useEffect(()=>{
   console.log("DEBUG: Screen is loading..")
   getAPIData()
 },[])

 // helper function
 const getAPIData = async () => {
   const response = await fetch('https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873');
   const data = await response.json()
   console.log(data)
 }


 return (
   <View style={styles.container}>
     <Text style={styles.header}>Demo of API</Text>


     {/* <FlatList
         style={styles.list}
         data={}
         keyExtractor={(item)=>{ return item.id }}
         ItemSeparatorComponent={
           ()=>{
             return(
               <View style={styles.divider}></View>
           )
           }
         }
         renderItem={
         ({item})=>{
               return(
                 <View style={styles.rowContainer}>
                     <Text>{item.name}</Text>
                     {
                       (item.isHighPriority === true) &&
                       <FontAwesome name="exclamation-circle" size={24} color="black" />
                     }                   
                 </View>
               )
           }
         }
    /> */}
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
 list: {
   borderWidth:3,
   borderColor:"magenta"
 },
 header: {
   fontSize:30
 }
});
```
---


- Save the data to a state variable

```javascript
import { StyleSheet, Text, View, FlatList  } from 'react-native';
import {useEffect, useState} from "react"


export default function App() {

 // state varialble to store the items that you want to show in the list
 const [listData, setListData] = useState([])


 useEffect(()=>{
   console.log("DEBUG: Screen is loading..")
   getAPIData()
 },[])

 // helper function
 const getAPIData = async () => {
   const URL =  "https://randomuser.me/api/?results=5"
   const response = await fetch(URL);
   const data = await response.json()
   console.log(data)

   // data = {results:[{...}], info:{}}
   // extract the array from the api data
   const {results} = data
   // const results = data.results
   console.log(`How many users are there? ${results.length}`)
   // save it to the state variable
   setListData([...results])
 }


 return (
   <View style={styles.container}>
     <Text style={styles.header}>Demo of API</Text>


     {/* <FlatList
         style={styles.list}
         data={}
         keyExtractor={(item)=>{ return item.id }}
         ItemSeparatorComponent={
           ()=>{
             return(
               <View style={styles.divider}></View>
           )
           }
         }
         renderItem={
         ({item})=>{
               return(
                 <View style={styles.rowContainer}>
                     <Text>{item.name}</Text>
                     {
                       (item.isHighPriority === true) &&
                       <FontAwesome name="exclamation-circle" size={24} color="black" />
                     }                   
                 </View>
               )
           }
         }
    /> */}
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
 list: {
   borderWidth:3,
   borderColor:"magenta"
 },
 header: {
   fontSize:30
 }
});
```

â€ƒ
- Display it in the list - 10:45

```javascript
import { StyleSheet, Text, View, FlatList  } from 'react-native';
import {useEffect, useState} from "react"

export default function App() {

 // state variable to store the items that you want to show in the list
 const [listData, setListData] = useState([])


 useEffect(()=>{
   console.log("DEBUG: Screen is loading..")
   getAPIData()
 },[])

 // helper function
 const getAPIData = async () => {
   const URL =  "https://randomuser.me/api/?results=5"
   const response = await fetch(URL);
   const data = await response.json()
   console.log(data)

   // data = {results:[{...}], info:{}}
   // extract the array from the api data
   const {results} = data
   // const results = data.results
   console.log(`How many users are there? ${results.length}`)
   // save it to the state variable
   setListData([...results])
 }


 return (
   <View style={styles.container}>
     <Text style={styles.header}>Demo of API</Text>

     {/* You choose which property in the API object that you want to use as an id */}
     <FlatList
         style={styles.list}
         data={listData}
         keyExtractor={(item)=>{ return item.login.uuid }}
         ItemSeparatorComponent={
           ()=>{
             return(
               <View style={styles.divider}></View>
           )
           }
         }
         renderItem={
         ({item})=>{
               return(
                 <View style={styles.rowContainer}>
                     <Text style={styles.text}>{item.name.first} {item.name.last}</Text>                                       
                 </View>
               )
           }
         }
    />
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   paddingTop:100,
   paddingHorizontal:10
 },
 list: {
   borderWidth:3,
   borderColor:"magenta"
 },
 header: {
   fontSize:30
 },
 text:{
   fontSize:24,
 }
});
```
---

## Example: Show a â€œloadingâ€ screen while the api loads

```javascript
import { StyleSheet, Text, View, FlatList  } from 'react-native';
import {useEffect, useState} from "react"


export default function App() {

 // state varialble to store the items that you want to show in the list
 const [listData, setListData] = useState([])

 const [doneLoading, setDoneLoading] = useState(false)

 useEffect(()=>{
   console.log("DEBUG: Screen is loading..")
   getAPIData()
 },[])

 // helper function
 const getAPIData = async () => {
   const URL =  "https://randomuser.me/api/?results=5"
   const response = await fetch(URL);
   const data = await response.json()
   console.log(data)

   // data = {results:[{...}], info:{}}
   // extract the array from the api data
   const {results} = data
   // const results = data.results
   console.log(`How many users are there? ${results.length}`)
   // save it to the state variable
   setListData([...results])

   // after all data is loaded, then set the doneLoading to true
   setDoneLoading(true)
 }

 return (
   <View style={styles.container}>
     <Text style={styles.header}>Demo of API</Text>

     {
       (doneLoading === false)
         ?
         <Text style={styles.header}>Screen is loading...</Text>
         :
         <FlatList
         style={styles.list}
         data={listData}
         keyExtractor={(item)=>{ return item.login.uuid }}
         ItemSeparatorComponent={
           ()=>{
             return(
               <View style={styles.divider}></View>
           )
           }
         }
         renderItem={
         ({item})=>{
               return(
                 <View style={styles.rowContainer}>
                     <Text style={styles.text}>{item.name.first} {item.name.last}</Text>                                       
                 </View>
               )
           }
         }
    />
     }




     {/* You choose which property in the API object that you want to use as an id */}
    
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   paddingTop:100,
   paddingHorizontal:10
 },
 list: {
   borderWidth:3,
   borderColor:"magenta"
 },
 header: {
   fontSize:30
 },
 text:{
   fontSize:24,
 }
});
```
---

## Exercise:  Update the row:

- Show the picture
- Show the Name
- Show the city/location

```javascript
import { StyleSheet, Text, View, FlatList, Image  } from 'react-native';
import {useEffect, useState} from "react"


export default function App() {

 // state varialble to store the items that you want to show in the list
 const [listData, setListData] = useState([])

 // const [doneLoading, setDoneLoading] = useState(false)

 useEffect(()=>{
   console.log("DEBUG: Screen is loading..")
   getAPIData()
 },[])

 // helper function
 const getAPIData = async () => {
   const URL =  "https://randomuser.me/api/?results=12"
   const response = await fetch(URL);
   const data = await response.json()
   console.log(data)

   // data = {results:[{...}], info:{}}
   // extract the array from the api data
   const {results} = data
   // const results = data.results
   console.log(`How many users are there? ${results.length}`)
   // save it to the state variable
   setListData([...results])

   // // after all data is loaded, then set the doneLoading to true
   // setDoneLoading(true)
 }

 return (
   <View style={styles.container}>
     <Text style={styles.header}>Demo of API</Text>

     {
       (listData.length === 0)
         ?
         <Text style={styles.header}>Screen is loading...</Text>
         :
         <FlatList
         style={styles.list}
         data={listData}
         keyExtractor={(item)=>{ return item.login.uuid }}
         ItemSeparatorComponent={
           ()=>{
             return(
               <View style={styles.divider}></View>
           )
           }
         }
         renderItem={
         ({item})=>{
               return(
                 <View style={styles.rowContainer}>

                     <Image source={{uri: item.picture.large}} style={styles.profilePic}/>
                     <View>
                       <Text style={styles.text}>{item.name.first} {item.name.last}</Text>
                    
                       <Text style={styles.text}>
                         {item.location.city}, {item.location.country}</Text>
                      
                       <Text style={styles.text}>
                       Age: {item.dob.age}
                       </Text>        
                     </View>
                 </View>
               )
           }
         }
    />
     }




     {/* You choose which property in the API object that you want to use as an id */}
    
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   paddingTop:100,
   paddingHorizontal:10
 },
 list: {
   borderWidth:3,
   borderColor:"magenta"
 },
 header: {
   fontSize:30
 },
 text:{
   fontSize:24,
 },
 divider: {
   borderWidth:1,
   borderColor:"#ccc",
   marginVertical:12
 },
 profilePic: {
   width:125,
   height:125,       
   borderRadius:"50%",
   borderColor:"#555",
   borderWidth:1,
  
 },
 rowContainer: {
   flexDirection:"row",
   alignItems:"center",
   gap:10
 }
});
```

---


â—	Hardware: Location, Maps, Camera
â—	Database: Cloud (firebase)
â—	Posting the project for this course
â€ƒ
### Experiment #2 - check if the array is empty


# wk1s02-react_native.md

**Week 1 Session 02**

## Learning Outcomes:

â—Â Â Â Â  What is React

â—Â Â Â Â  What is React Native

â—Â Â Â Â  What is declarative programming

â—Â Â Â Â  What are components?

â—Â Â Â Â  What are reusable components?

â—Â Â Â Â  Create a React Native project?

â—Â Â Â Â  Purpose of an App.js file

â—Â Â Â Â  React Native components:Â  Text, image


## Review: React Intro / Principles of React


React is a modern web framework used to create the user interfaces of websites.

React is based on two principles:

1.Â Â Â  **Declaratively** specifying what the user interface looks like, and what it should do

2.Â Â Â  User interfaces are composed of **reusable components**

What are the programming approaches you can use to create a software program?

â—Â Â Â Â  Imperative programming

â—Â Â Â Â  Declarative programming

â—Â Â Â Â  Object oriented programming

â—Â Â Â Â  Event driven programming

### Concept 1:Â  Declarative Programming vs Imperative Programming


Software programs can be written **imperatively** or **declaratively**

**1.**Â Â Â  **Imperative programming:**

â—Â Â Â Â  You provide step-by-step instructions for how to accomplish a task

**2.**Â Â Â  **Declarative programming**

â—Â Â Â Â  You tell the software what to do, and the software does it

â—Â Â Â Â  You do not always know exactly _how_ it is doing it

â—Â Â Â Â  But you trust that it will do it

#### Imperative

![alt text](./images/image-9.png)

#### Declarative

![alt text](./images/image-10.png)

### Concept 2a: Reusable components

A component is a user interface element that contains all the UI + logic to make that element work properly.

Components are reusable. After the component is defined, it can be used in many places in throughout the user interface.

Example: 
 
https://www.datocms-assets.com/48294/1664023742-component-library-vs-ds-/image/image-4-component-libraries-contain-ui-elements-freepik.webp?auto=format

![alt text](./images/image-11.png)
â€ƒ
### Concept 3b: Component Based Design

![alt text](./images/image-12.png)

### React Native - Building a User Interface

- React Native provides a library of commonly used user interface elements that can be used to build the UI of your screens

####  List of Components

- `<Text>`:  Displays a label (text) on the screen
- `<TextInput>`:  Displays a textbox
- `<View>`: Used as a container element to store other elements
- `<Button>`:  Displays a native button
- `<Pressable>`:  Creates a container that can be â€œclickedâ€ 
- `<Image>`:  Displays an image
    - If you are displaying an image from a url (internet), you must specify a height and width 
    - If you display an image from a file, height and width are not required.
- `<Switch>`: Displays a toggle
- `<SafeAreaView>`: Specific to IOS devices.  Putting code within a `<SafeAreaView>` will automatically display the user interface below the IOS camera notch

Documentation: https://reactnative.dev/docs/0.72/components-and-apis#basic-components
â€ƒ

### Structure of a React Native Screen


- The App.js file is the initial screen displayed by the mobile application.

![alt text](./images/image-14.png)

- The App.js file must specify a Javascript  function that returns the user interface elements that should be displayed on the screen.
![alt text](./images/image-15.png)
â€ƒ
### Introduction to React Native Components
- React Native provides a library of commonly used user interface elements that can be used to build the UI of your screens

Documentation: https://reactnative.dev/docs/0.72/components-and-apis#basic-components

#### Example: Showing a network image

1. Display this image:

https://cdn.britannica.com/88/132688-050-E9739DD9/Skyline-Jakarta-Indonesia.jpg


2.  Write the code

- Import the image at the top of your file

```js
import { StyleSheet, Text, View, Image } from 'react-native';
```

- Provide a height and width to the image:
```js
<Image source={{uri:"https://cdn.britannica.com/88/132688-050-E9739DD9/Skyline-Jakarta-Indonesia.jpg"}}
width={250}
height={100}
/>
```
3. Result

![alt text](./images/image-16.png)
 â€ƒ

#### Why do I need to import?

In web, you get all the html by default:  
`<h1>`, `<p>`, `<input/>`, `<img/>`

In React Native, you must import the tag before you can use it.

Otherwise, you get an error:

 ![alt text](./images/image-17.png)

## Troubleshooting Expo Install
### Installing a different version of Node

If you get â€œnode unsupportedâ€ warnings or errors, try downgrading your node to node 18:

https://nodejs.org/en/download

 ![alt text](./image/image-13.png)





