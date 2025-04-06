/*
\renter\App.js
*/

import {View, Button} from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { logger } from './utils/logger';

import LoginScreen from "./screens/LoginScreen";
import MyBookingsScreen from './screens/MyBookingsScreen';
import SearchListingsScreen from "./screens/SearchListingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    logger.debug('App initializing');
    
    const HomeTabs = () =>  {
        return(
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'My Bookings') {
                            iconName = 'directions-car';
                        } else if (route.name === 'Search Listings') {
                            iconName = 'search';
                        }

                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#007AFF',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen component={MyBookingsScreen} name="My Bookings"/>
                <Tab.Screen component={SearchListingsScreen} name="Search Listings"/>
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
