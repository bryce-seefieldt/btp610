/*
midterm-review/App.js
Dependencies:
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/stack
npx expo install react-native-gesture-handler
npm install @react-navigation/bottom-tabs
npm install @expo/vector-icons



*/
import { StyleSheet } from 'react-native';
// Navigation imports (ref: wk06s01-Multicreen_Apps.md)
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// Required for stack navigation
import 'react-native-gesture-handler';
// Icon imports (ref: wk07s01-nested_navigators.md)
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

// Import screens
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import ProfileScreen from './screens/ProfileScreen';

// Create navigation objects (ref: wk06s01-Multicreen_Apps.md)
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator component for Home section (ref: wk07s01-nested_navigators.md)
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TaskList" 
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      {/* Tab Navigator with custom icons (ref: wk07s01-nested_navigators.md) */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            // Set icon based on route name
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user-o';
              return <Feather name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#f4511e',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
