// BTP610 Comprehensive React Native Application with Multi-screen Navigation
// This app demonstrates key concepts from the course documentation

// Import required React Native components
import { 
  StyleSheet, 
  Text, 
  View,  
  Button, 
  Modal,
  TouchableOpacity,
  Pressable,
  Platform,
  Alert
} from 'react-native';
// Import useState hook for state management (btp610/notes/wk04-user-input_and_output.md)
import { useState, useEffect } from 'react';

// Import navigation dependencies (btp610/notes/wk06s01-Multicreen_Apps.md lines 48-50)
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

// Import Expo Icons for tab navigation (btp610/notes/wk07s01-nested_navigators.md lines 612-613)
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Import screen components
import HomeScreen from './screens/HomeScreen';
import StylingDemoScreen from './screens/StylingDemoScreen';
import FlexboxLayoutScreen from './screens/FlexboxLayoutScreen';
import UserInputScreen from './screens/UserInputScreen';
import FlatListScreen from './screens/FlatListScreen';

// Create navigation instances (btp610/notes/wk06s01-Multicreen_Apps.md lines 139-140)
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create a custom stack navigator component for the main content
// This pattern is from btp610/notes/wk07s01-nested_navigators.md lines 27-37
const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerTintColor: "#333",
        headerStyle: { backgroundColor: "#f0f0f0" }
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Styling Demo" component={StylingDemoScreen} />
      <Stack.Screen name="Flexbox Layout" component={FlexboxLayoutScreen} />
      <Stack.Screen name="User Input" component={UserInputScreen} />
      <Stack.Screen name="FlatList Demo" component={FlatListScreen} />
    </Stack.Navigator>
  );
};

// About Screen Component
const AboutScreen = ({ navigation }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentInfoTopic, setCurrentInfoTopic] = useState("");

  // Show info modal with specific topic
  const showInfo = (topic) => {
    setCurrentInfoTopic(topic);
    setShowInfoModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About BTP610 React Native Demo</Text>
      <Text style={styles.text}>
        This application demonstrates key concepts from the React Native curriculum:
      </Text>
      
      <View style={styles.listContainer}>
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => showInfo("state")}
        >
          <Text>• State Management (useState)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => showInfo("effect")}
        >
          <Text>• Lifecycle Events (useEffect)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => showInfo("navigation")}
        >
          <Text>• Multi-screen Navigation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => showInfo("styling")}
        >
          <Text>• Styling & Layout</Text>
        </TouchableOpacity>
      </View>
      
      {/* Info Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showInfoModal}
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentInfoTopic === "state" ? "State Management" : 
               currentInfoTopic === "effect" ? "Lifecycle Events" :
               currentInfoTopic === "navigation" ? "Navigation" : "Styling & Layout"}
            </Text>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>
                {currentInfoTopic === "state" ? codeSnippets.useState : 
                 currentInfoTopic === "effect" ? codeSnippets.useEffect :
                 currentInfoTopic === "navigation" ? codeSnippets.navigation : 
                 "// Styling examples would go here"}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowInfoModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Educational code snippets for modals
const codeSnippets = {
  navigation: `// Navigation Setup (btp610/notes/wk06s01-Multicreen_Apps.md)
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Creating navigator instances
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Usage in component:
<NavigationContainer>
  <Tab.Navigator>
    <Tab.Screen name="Main" component={MainStackNavigator} />
    <Tab.Screen name="About" component={AboutScreen} />
  </Tab.Navigator>
</NavigationContainer>`,

  useState: `// useState Hook (btp610/notes/wk04-user-input_and_output.md)
import { useState } from 'react';

// Inside your component:
const [badgeCount, setBadgeCount] = useState(0);

// Update state with a function:
const updateBadge = () => {
  setBadgeCount(prevCount => prevCount + 1);
};`,

  useEffect: `// useEffect Hook (btp610/notes/wk06s02-lifecycle.md)
import { useEffect } from 'react';

// Component lifecycle management:
useEffect(() => {
  console.log("Component MOUNTING");
  
  // Return a cleanup function for UNMOUNTING
  return () => {
    console.log("Component UNMOUNTING");
  };
}, []); // Empty dependency array = run only on mount/unmount`,

  tabNavigation: `// Tab Navigation (btp610/notes/wk07s01-nested_navigators.md)
<Tab.Navigator 
  initialRouteName="Main"
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      if (route.name === 'Main') {
        return <FontAwesome name="home" size={24} 
               color={focused ? "#2196F3" : "gray"} />;
      }
    },
  })}
>
  <Tab.Screen 
    name="Main" 
    component={MainStackNavigator} 
    options={{ 
      headerShown: false,
      tabBarBadge: badgeCount > 0 ? badgeCount : null, 
    }}
  />
</Tab.Navigator>`
};

export default function App() {
  // ========== STATE VARIABLES ==========
  // State variables for user input (btp610/notes/wk04-user-input_and_output.md)
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [showConditionalContent, setShowConditionalContent] = useState(false);
  
  // State variable for tab badge (btp610/notes/wk07s01-nested_navigators.md lines 779-810)
  const [badgeCount, setBadgeCount] = useState(0);
  
  // Educational feature state variables
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [activeCodeSnippet, setActiveCodeSnippet] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [learnModeActive, setLearnModeActive] = useState(false);
  const [lastNavigationEvent, setLastNavigationEvent] = useState(null);
  const [showNavigationNotification, setShowNavigationNotification] = useState(false);

  // Data source for FlatList (btp610/notes/wk05-Flatlist_component.md)
  const studentList = [
    {name: "Peter", gpa: 3.0, tuitionPaid: true, userid: "psmith"},
    {name: "Emily", gpa: 4.0, tuitionPaid: true, userid: "epatel"},
    {name: "Suzy", gpa: 2.5, tuitionPaid: false, userid: "slee"},
    {name: "Marco", gpa: 2.8, tuitionPaid: false, userid: "mdiaz"},
  ];

  // ========== EVENT HANDLERS ==========
  // Button click handler (btp610/notes/wk04-user-input_and_output.md)
  const handleButtonPress = () => {
    // Conditional rendering logic (btp610/notes/wk04-user-input_and_output.md)
    if (numberInput && Number(numberInput) > 20) {
      setShowConditionalContent(true);
    } else {
      setShowConditionalContent(false);
      alert("Please enter a number greater than 20");
    }
  };

  // FlatList item click handler (btp610/notes/wk05-Flatlist_component.md)
  const handleStudentPress = (student) => {
    // Determine if student is on Dean's list
    const isDeansListStudent = student.gpa >= 3.5;
    alert(
      `${student.name}\n` + 
      `GPA: ${student.gpa}\n` + 
      `${isDeansListStudent ? "On Dean's List!" : "Not on Dean's List"}\n` +
      `Tuition: ${student.tuitionPaid ? "Paid" : "Not Paid"}`
    );
  };

  // Function to update badge count
  const updateBadge = () => {
    // Show state management modal when updating badge
    showCodeSnippet('useState');
    
    setBadgeCount(prevCount => prevCount + 1);
    Alert.alert(
      "Badge Updated", 
      "The badge count has been updated using useState. Tap Learn More to see the code.",
      [
        { text: "Dismiss", style: "cancel" },
        { 
          text: "Learn More", 
          onPress: () => showCodeSnippet('useState'),
          style: "default" 
        }
      ]
    );
  };

  // Function to show code snippet modal
  const showCodeSnippet = (snippetKey) => {
    setActiveCodeSnippet(snippetKey);
    setShowCodeModal(true);
  };

  // Toggle learn mode
  const toggleLearnMode = () => {
    setLearnModeActive(!learnModeActive);
    if (!learnModeActive) {
      Alert.alert(
        "Learn Mode Activated",
        "Tap on UI elements to see their code implementation. Try tapping these:\n\n• Update Badge button\n• Tab navigation icons\n• About page list items",
        [{ text: "Got it!", style: "default" }]
      );
    }
  };

  // useEffect to demonstrate component lifecycle (btp610/notes/wk06s02-lifecycle.md lines 157-166)
  useEffect(() => {
    console.log("App component MOUNTING");
    
    // Show a welcome alert
    setTimeout(() => {
      Alert.alert(
        "Welcome to BTP610 Demo App",
        "This app demonstrates key React Native concepts. Enable Learn Mode to explore how it works!",
        [
          { text: "Maybe Later", style: "cancel" },
          { 
            text: "Enable Learn Mode", 
            onPress: () => toggleLearnMode(),
            style: "default" 
          }
        ]
      );
    }, 1000);
    
    // Cleanup function for UNMOUNTING
    return () => {
      console.log("App component UNMOUNTING");
    };
  }, []);
  
  // Track navigation state changes for educational purposes
  const onStateChange = (state) => {
    if (state) {
      const currentRoute = state?.routes[state.index]?.name;
      
      setLastNavigationEvent({
        route: currentRoute,
        timestamp: new Date().toLocaleTimeString()
      });
      
      // Show navigation notification
      setShowNavigationNotification(true);
      
      // Auto-hide notification after a delay
      setTimeout(() => {
        setShowNavigationNotification(false);
      }, 5000);
    }
  };
  
  return (
    // NavigationContainer is the root component for navigation (btp610/notes/wk06s01-Multicreen_Apps.md line 143)
    <NavigationContainer onStateChange={onStateChange}>
      {/* Tab.Navigator provides bottom tab navigation (btp610/notes/wk06s01-Multicreen_Apps.md lines 440-464) */}
      <Tab.Navigator 
        initialRouteName="Main"
        screenOptions={({ route }) => ({
          // Custom tab bar icons based on route name (btp610/notes/wk07s01-nested_navigators.md lines 713-733)
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Main') {
              return (
                <TouchableOpacity
                  onPress={() => learnModeActive && showCodeSnippet('navigation')}
                >
                  <FontAwesome name="home" size={24} color={focused ? "#2196F3" : "gray"} />
                </TouchableOpacity>
              );
            } else if (route.name === 'About') {
              return (
                <TouchableOpacity
                  onPress={() => learnModeActive && showCodeSnippet('navigation')}
                >
                  <MaterialCommunityIcons name="information" size={24} color={focused ? "#2196F3" : "gray"} />
                </TouchableOpacity>
              );
            }
          },
          // Tab styling
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {/* Main content tab with nested stack navigation */}
        <Tab.Screen 
          name="Main" 
          component={MainStackNavigator} 
          options={{ 
            headerShown: false, // Hide the tab header to avoid double headers (btp610/notes/wk07s01-nested_navigators.md line 326)
            tabBarBadge: badgeCount > 0 ? badgeCount : null, // Conditional badge (btp610/notes/wk07s01-nested_navigators.md line 841)
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              if (learnModeActive) {
                showCodeSnippet('tabNavigation');
              }
            }
          })}
        />
        
        {/* About tab showing information about the app */}
        <Tab.Screen 
          name="About" 
          component={AboutScreen} 
          options={{
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <Button 
                  onPress={updateBadge} 
                  title="Update Badge" 
                  color="#2196F3"
                  style={{ marginRight: 10 }}
                />
                <Button
                  onPress={toggleLearnMode}
                  title={learnModeActive ? "Exit Learn Mode" : "Learn Mode"}
                  color={learnModeActive ? "#FF9800" : "#4CAF50"}
                  style={{ marginRight: 10 }}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      
      {/* Educational UI overlays */}
      
      {/* Code snippet modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showCodeModal}
        onRequestClose={() => setShowCodeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {activeCodeSnippet === 'navigation' ? 'Navigation Setup' :
               activeCodeSnippet === 'useState' ? 'State Management (useState)' :
               activeCodeSnippet === 'useEffect' ? 'Component Lifecycle (useEffect)' :
               'Tab Navigation'}
            </Text>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>
                {codeSnippets[activeCodeSnippet]}
              </Text>
            </View>
            
            <Text style={styles.modalExplanation}>
              {activeCodeSnippet === 'navigation' ? 
                'NavigationContainer is the root component that manages navigation state. Stack and Tab navigators define the screens and their hierarchy.' :
               activeCodeSnippet === 'useState' ? 
                'useState allows components to have local state. When state updates (using setBadgeCount), the component re-renders with the new value.' :
               activeCodeSnippet === 'useEffect' ? 
                'useEffect runs side effects in function components. The empty dependency array means it only runs on mount and cleanup on unmount.' :
               'Tab.Navigator creates a tabbed interface. screenOptions configures each tab, and the tabBarBadge property shows a notification badge.'}
            </Text>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCodeModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Navigation notification */}
      {showNavigationNotification && lastNavigationEvent && (
        <View style={styles.navigationNotification}>
          <Text style={styles.navigationNotificationText}>
            Navigated to: {lastNavigationEvent.route}
          </Text>
          <Text style={styles.navigationExplanationText}>
            Navigation state is tracked by the NavigationContainer component.
          </Text>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => {
              setShowNavigationNotification(false);
              showCodeSnippet('navigation');
            }}
          >
            <Text style={styles.notificationButtonText}>View Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </NavigationContainer>
  );
}

// StyleSheet for styling (btp610/notes/wk02-styling.md)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2196F3',
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
  listContainer: {
    marginLeft: 10,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  // Educational UI styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2196F3',
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 4,
    marginBottom: 15,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#333',
  },
  modalExplanation: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationNotification: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(33,150,243,0.9)',
    padding: 15,
    borderRadius: 8,
  },
  navigationNotificationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  navigationExplanationText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  notificationButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  notificationButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});
