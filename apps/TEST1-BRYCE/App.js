import { StyleSheet } from 'react-native';
// react navigation plugin imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

// screens
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

// navigation pattern code
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        var iconName;
                        if (route.name === 'New Transaction') {
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
                        } else if (route.name === 'All Transactions') {
                            iconName = focused ? 'list' : 'list-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >         
                <Tab.Screen name="New Transaction" component={Screen1} />
                <Tab.Screen name="All Transactions" component={Screen2} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
