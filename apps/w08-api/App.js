// Import necessary components from React Native
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
// Import useEffect hook for handling side effects
import { useEffect, useState } from 'react';
// Navigation and icon imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Entypo, FontAwesome } from '@expo/vector-icons';

// Create stack navigator instance
const Stack = createNativeStackNavigator();

// HomeScreen component using object destructuring to extract navigation prop
// {navigation} destructures the navigation object from the props parameter
// This is equivalent to: const HomeScreen = (props) => { const navigation = props.navigation; ... }
const HomeScreen = ({navigation}) => {
  console.log('HomeScreen rendered with navigation object:', navigation);
  console.log('Available navigation methods:', Object.keys(navigation));

  // Add state for tasks
  const [tasks, setTasks] = useState([
    { id: '1', name: 'Complete Assignment', isHighPriority: true },
    { id: '2', name: 'Buy Groceries', isHighPriority: false },
    // Add more sample tasks as needed
  ]);
  console.log('Task state initialized with', tasks.length, 'tasks');

  // useEffect hook to set up header options when component mounts or navigation changes
  useEffect(() => {
    console.log('Setting up header options with navigation object');
    
    // setOptions is a method available on the navigation object
    navigation.setOptions({        
      headerRight: () => (
        // View container for header right content
        <View style={styles.row}>
          {/* Pressable component for touch handling */}
          <Pressable 
            onPress={() => {
              console.log('Add button pressed, navigating to Add a Task screen');
              addPressed();
            }}
          >
            <Entypo name="add-to-list" size={24} color="black" />
          </Pressable>              
        </View>
      ),
    });
    
    // Log when effect is cleaned up
    return () => {
      console.log('Cleaning up navigation effect');
    };
  }, [navigation]) // Effect depends on navigation object

  // Handler for add button press
  const addPressed = () => {
    console.log('Navigation method called: navigate("Add a Task")');
    // navigate is a method destructured from navigation object
    navigation.navigate("Add a Task");
  }

  return (
    <View style={styles.container}>
      {/* FlatList renders an efficient scrollable list */}
      <FlatList
        data={tasks}                              // Array of task objects to display
        keyExtractor={(item) => item.id}          // Unique key for each item
        ItemSeparatorComponent={() => (           // Renders divider between items
          <View style={styles.divider}></View>
        )}
        renderItem={({item}) => (                 // Renders each task item
          <View style={styles.rowContainer}>
            <Text>{item.name}</Text>
            {/* Conditional rendering of priority icon */}
            {item.isHighPriority && 
              <FontAwesome name="exclamation-circle" size={24} color="black" />
            }
          </View>
        )}
        onScroll={() => console.log('FlatList is being scrolled')}
        onViewableItemsChanged={info => {
          console.log('Viewable items changed:', info.viewableItems.map(item => item.item.id));
        }}
      />
    </View>
  );
}

// AddTaskScreen component also uses object destructuring for navigation
const AddTaskScreen = ({navigation}) => {
  console.log('AddTaskScreen rendered with navigation object:', navigation);
  console.log('AddTaskScreen navigation methods:', Object.keys(navigation));
  
  return (
    <View style={styles.container}>
      <Text>Add a Task Screen</Text>
    </View>
  );
}

// Main App component wraps everything in NavigationContainer
export default function App() {
  console.log('App component rendered');
  
  return (
    <NavigationContainer
      onStateChange={(state) => console.log('Navigation state changed:', state)}
      onReady={() => console.log('NavigationContainer is ready')}
    >
      {/* Stack.Navigator manages the navigation stack */}
      <Stack.Navigator>
        {/* Each Stack.Screen defines a route in the app */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          // Log when HomeScreen receives props
          options={{
            headerTitle: (props) => {
              console.log('Home Screen header props:', props);
              return <Text>Home</Text>;
            }
          }} 
        />
        <Stack.Screen 
          name="Add a Task" 
          component={AddTaskScreen}
          // Log when AddTaskScreen receives props
          options={{
            headerTitle: (props) => {
              console.log('Add Task Screen header props:', props);
              return <Text>Add a Task</Text>;
            }
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// StyleSheet object for managing component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Takes up all available space
    backgroundColor: '#fff',    // White background
    alignItems: 'center',       // Centers children horizontally
    justifyContent: 'center',   // Centers children vertically
  },
  row: {
    flexDirection: 'row',       // Arranges children in a row
    alignItems: 'center',       // Centers children vertically in the row
  },
  divider: {
    height: 1,                  // Thin line
    backgroundColor: '#CCCCCC', // Light gray color
    width: '100%'               // Full width divider
  },
  rowContainer: {
    flexDirection: 'row',       // Horizontal layout
    padding: 10,                // Padding around content
    alignItems: 'center',       // Align items vertically
    justifyContent: 'space-between', // Space items horizontally
    width: '100%'               // Full width container
  }
});