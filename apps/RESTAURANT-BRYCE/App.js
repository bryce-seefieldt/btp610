/**
 * /App.js
 * Main Restaurant App Navigation
 * Implements Stack Navigation (React Navigation)
 * btp610/apps/w07s02-Final/App.js
 * 
 * Navigation Setup:
 * - Uses Stack Navigator for screen change
 * - Configured with two main screens: Order and Receipt
 * - Pattern follows example from btp610/notes/wk06s01-Multicreen_Apps.md
 */

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import OrderScreen from "./screens/OrderScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>        
        <Stack.Screen name="Order" component={OrderScreen} />
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
