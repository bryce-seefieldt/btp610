import {View, Button} from "react-native"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EntryFormScreen from './screens/EntryFormScreen';
import StudentListScreen from "./screens/StudentListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Entry Form" 
          component={EntryFormScreen}
          options={ ({ navigation }) => ({
            headerRight: () => (
              <Button onPress={
                () => {
                  navigation.navigate("Student List Screen")
                }
              } 
              title="All Students"/>
            )
          }) }
        />

        <Stack.Screen name="Student List Screen" component={StudentListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
