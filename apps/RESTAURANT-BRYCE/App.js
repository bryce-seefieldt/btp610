/**
 * Main Navigation Setup
 * /App.js
 * This is the app's root component:
 * - Sets up the navigation container
 * - Defines the screen stack
 * - Manages transitions between Order and Receipt screens
 * 
 * Uses stack navigation pattern for simple forward/back
 * navigation between screens.
 */

import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import OrderScreen from "./screens/OrderScreen";
import ReceiptScreen from "./screens/ReceiptScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>        
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen 
          name="Receipt" 
          component={ReceiptScreen}
          options={{
            headerLeft: null,  // This removes the back button
            gestureEnabled: false  // This prevents the back swipe gesture
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
