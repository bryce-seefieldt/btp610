// Main application navigation configuration
import {View, Button} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screen components
import EntryFormScreen from './screens/EntryFormScreen';
import StudentListScreen from "./screens/StudentListScreen";

// Initialize the navigation stack
const Stack = createNativeStackNavigator();

export default function App() {
  console.log('App: Initializing main navigation container')
  return (
    // NavigationContainer: Root component that manages navigation state
    <NavigationContainer
      onStateChange={(state) => {
        console.log('Navigation: State changed', {
          currentRoute: state?.routes[state.index]?.name,
          navigationStack: state?.routes.map(route => route.name)
        })
      }}>
      {/* Stack.Navigator: Manages the navigation stack of screens */}
      <Stack.Navigator>
        {/* Primary screen: Student Entry Form */}
        <Stack.Screen 
          name="Entry Form" 
          component={EntryFormScreen}
          options={ ({ navigation }) => ({
            // Add navigation button to header
            headerRight: () => (
              <Button 
                onPress={() => {
                  console.log('Navigation: Initiating navigation to Student List Screen')
                  navigation.navigate("Student List Screen")
                }} 
                title="All Students"
              />
            )
          })} 
        />
        {/* Secondary screen: Student List View */}
        <Stack.Screen 
          name="Student List Screen" 
          component={StudentListScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}