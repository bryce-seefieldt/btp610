import { StyleSheet } from 'react-native';
// react navigation plugin imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

// screens
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

// navigation pattern code
const Tab = createBottomTabNavigator();

export default function App() {
    // Move transactions state to App level
    const [transactions, setTransactions] = useState([]);

    // Transaction management functions
    const addTransaction = (transaction) => {
        setTransactions(prev => [...prev, transaction]);
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const getTotalBalance = () => {
        return transactions.reduce((total, t) => total + t.amount, 0);
    };

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
                <Tab.Screen 
                    name="New Transaction" 
                    component={Screen1}
                    initialParams={{ 
                        addTransaction: addTransaction 
                    }}
                />
                <Tab.Screen 
                    name="All Transactions" 
                    component={Screen2}
                    initialParams={{ 
                        transactions: transactions,
                        deleteTransaction: deleteTransaction,
                        getTotalBalance: getTotalBalance 
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
