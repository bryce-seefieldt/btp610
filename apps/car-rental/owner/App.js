/*
\owner\App.js
*/

import {View, Button} from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from "./screens/LoginScreen";
import MyListingsScreen from './screens/MyListingsScreen';
import CreateListingScreen from "./screens/CreateListingScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
 
  const HomeTabs = () =>  {
    return(
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'My Listings') {
              iconName = 'directions-car';
            } else if (route.name === 'Create Listing') {
              iconName = 'add-circle';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen component={MyListingsScreen} name="My Listings"/>
        <Tab.Screen component={CreateListingScreen} name="Create Listing"/>
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
