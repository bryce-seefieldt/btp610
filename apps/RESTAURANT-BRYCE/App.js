/**
 * Main App Navigation Configuration
 * Key Course Concepts:
 * 1. Stack Navigation Pattern (Week 6)
 *    - NavigationContainer as root wrapper
 *    - Stack.Navigator for screen management
 *    - Stack.Screen for individual route definitions
 * 
 * 2. Screen Architecture (Week 7)
 *    - Separation of screens into components
 *    - Consistent navigation pattern between Order and Receipt
 * 
 * Reference Implementations:
 * - Stack setup from apps/w07s02-Final/App.js
 * - Navigation pattern from notes/wk06s01-Multicreen_Apps.md
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
