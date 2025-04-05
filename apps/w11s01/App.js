import {View, Button} from "react-native"

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from "./screens/LoginScreen";
import SongsScreen from './screens/SongsScreen';
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
 
  const HomeTabs = () =>  {
    return(
      <Tab.Navigator>
        <Tab.Screen component={ProfileScreen} name="Profile"/>
        <Tab.Screen component={SongsScreen} name="Songs"/>
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>        
        <Stack.Screen name="Login Screen" component={LoginScreen} />        
        <Stack.Screen name="Home" component={HomeTabs} options={{headerShown:false}}/>                
      </Stack.Navigator>
    </NavigationContainer>
  )
}
