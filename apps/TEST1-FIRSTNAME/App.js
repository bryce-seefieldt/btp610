import { StyleSheet, Text, View } from 'react-native';
// react navigation plugin imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

// screens
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

// navigation pattern code
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator>         
         <Tab.Screen name="New Transaction" component={Screen1} />
         <Tab.Screen name="All Transactions" component={Screen2} />
     </Tab.Navigator>
   </NavigationContainer>
 );


}
const styles = StyleSheet.create({
});
