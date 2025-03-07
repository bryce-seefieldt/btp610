# React Native Task Manager - Midterm Review Application

## Overview
This application demonstrates a comprehensive implementation of React Native concepts, featuring a task management system with navigation, state management, and user interface components.

## Core Concepts Implemented

### 1. Basic React & React Native Fundamentals
- Declarative UI programming
- Component-based architecture
- JSX syntax
- Props and state management
- Component lifecycle methods

### 2. Navigation
- Stack Navigation for task details
- Tab Navigation for main sections
- Nested Navigation (Stack within Tabs)
- Screen navigation with parameters
- Custom header configurations

### 3. UI Components
- Basic components (View, Text, ScrollView)
- User input components (TextInput, Switch)
- Lists (FlatList with custom items)
- Images and icons
- Pressable elements with feedback

### 4. Styling & Layout
- StyleSheet implementation
- Flexbox layouts
- Platform-specific styling
- Custom component styling
- Responsive design patterns

### 5. State & Data Management
- useState for component state
- useEffect for lifecycle management
- useFocusEffect for screen focus
- Shared data module
- State updates and re-rendering

## Step-by-Step Implementation Guide

### Phase 1: Project Setup & Basic Components
1. Initialize project:
```bash
npx create-expo-app midterm-review
cd midterm-review
```

2. Install dependencies:
```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/stack
npx expo install react-native-gesture-handler
npm install @react-navigation/bottom-tabs
npm install @expo/vector-icons
```

### Phase 2: Data Structure
1. Create data module (tasks.js):
- Define task structure
- Create sample tasks
- Export data module

### Phase 3: Basic UI Components
1. Create TaskItem component:
```javascript
// Implementation steps:
1. Basic structure with View and Text
2. Add styling with StyleSheet
3. Implement Pressable wrapper
4. Add conditional rendering for priority
5. Include status indicator
```

### Phase 4: Navigation Setup
1. Configure Stack Navigator:
```javascript
// Implementation order:
1. Basic Stack Navigator
2. Add screens to stack
3. Configure header styles
4. Implement navigation options
```

2. Configure Tab Navigator:
```javascript
// Implementation order:
1. Basic Tab Navigator
2. Add screen components
3. Configure tab icons
4. Implement tab styling
```

### Phase 5: Screen Implementation

1. HomeScreen:
```javascript
// Implementation steps:
1. Basic screen structure
2. Add FlatList component
3. Implement task list rendering
4. Add navigation to details
5. Implement screen focus effects
```

2. DetailScreen:
```javascript
// Implementation steps:
1. Basic detail view
2. Add task information display
3. Implement status toggle
4. Add styling and layout
5. Configure navigation options
```

3. ProfileScreen:
```javascript
// Implementation steps:
1. Basic form structure
2. Add input fields
3. Implement state management
4. Add form validation
5. Implement styling
```

### Phase 6: Advanced Features

1. State Management:
```javascript
// Implementation order:
1. Basic useState implementation
2. Add useEffect for lifecycle
3. Implement useFocusEffect
4. Add state updates
5. Implement cleanup functions
```

2. Styling Enhancements:
```javascript
// Implementation order:
1. Basic StyleSheet setup
2. Add Flexbox layouts
3. Implement platform-specific styles
4. Add responsive design
5. Implement theme consistency
```

## Testing & Debugging

1. Component Testing:
```javascript
// Test scenarios:
1. Navigation flow
2. Data display
3. User input handling
4. State updates
5. Screen transitions
```

## Best Practices Implemented

1. Code Organization:
- Modular component structure
- Separate styling definitions
- Consistent naming conventions
- Clear file organization

2. Performance Considerations:
- Efficient list rendering
- Proper cleanup in useEffect
- Optimized state updates
- Minimal re-renders

## Learning Outcomes
- Understanding React Native fundamentals
- Implementing navigation patterns
- Managing component lifecycle
- Handling user input
- Implementing responsive layouts
- State management patterns
- Platform-specific considerations

## Additional Resources
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)

# React Native Task Manager - Detailed Implementation Guide

## What You'll Build
This guide will help you create a task management app with:
- A home screen showing a list of tasks
- Detail view for each task
- User profile screen with form inputs
- Tab-based navigation between main screens
- Stack navigation for task details

## Prerequisites
- Node.js installed (recommended version: 18.x)
- Expo CLI installed globally: `npm install -g expo-cli`
- Basic understanding of JavaScript/React
- Code editor (e.g., VS Code)
- Mobile device or emulator for testing

## Detailed Implementation Steps

### Phase 1: Project Setup & Environment Configuration
This phase sets up the basic project structure and required dependencies.

1. Create Project Directory:
```bash
npx create-expo-app midterm-review
cd midterm-review
```
Result: Creates a new Expo project with basic App.js file showing "Open up App.js to start working on your app!"

2. Install Required Dependencies:
```bash
# Core Navigation
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context

# Stack Navigation
npm install @react-navigation/stack
npx expo install react-native-gesture-handler

# Tab Navigation
npm install @react-navigation/bottom-tabs

# Icons
npm install @expo/vector-icons
```
Result: Enables navigation capabilities and icon usage in the app

3. Create Project Structure:
```bash
mkdir src
cd src
mkdir screens components data
```
Result: Organizes code into logical folders for better maintenance

### Phase 2: Data Layer Implementation
This phase creates the data structure that will power the task list.

1. Create Task Data Model (`data/tasks.js`):
```javascript
const tasks = [
  {
    id: '1',
    title: 'Complete React Native Tutorial',
    description: 'Work through course materials',
    priority: 'high',
    completed: false,
    dueDate: '2024-03-20'
  },
  // Add more sample tasks...
];

export default tasks;
```
Result: Provides sample data that will appear in the task list

### Phase 3: Component Development
This phase creates reusable UI components.

1. Create Basic TaskItem Component (`components/TaskItem.js`):
```javascript
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Component code here...
```
Result: Creates the individual task items that will appear in the list
Visual: Each task shows:
- Task title
- Due date
- Priority indicator (red icon for high priority)
- Status indicator (green/yellow dot)

2. Implement TaskItem Styling:
```javascript
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    // Add more styles...
  },
  // Add more style definitions...
});
```
Result: Makes task items visually appealing with:
- Proper spacing
- Row layout
- Border separators
- Text formatting

3. Add Priority Indicator:
```javascript
{task.priority === 'high' && (
  <MaterialIcons name="priority-high" size={24} color="#f4511e" />
)}
```
Result: Shows a red exclamation icon for high-priority tasks

### Phase 4: Screen Development
This phase creates the main screens of the app.

1. Create HomeScreen (`screens/HomeScreen.js`):
```javascript
import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import TaskItem from '../components/TaskItem';
import tasks from '../data/tasks';

// Screen implementation...
```
Result: Creates the main task list screen showing:
- Scrollable list of tasks
- Pull-to-refresh functionality
- Tappable task items

2. Create DetailScreen (`screens/DetailScreen.js`):
```javascript
// Implementation details...
```
Result: Creates the task detail view showing:
- Task title in header
- Full description
- Priority level
- Completion toggle switch
- Due date

3. Create ProfileScreen (`screens/ProfileScreen.js`):
```javascript
// Implementation details...
```
Result: Creates user profile screen with:
- Profile image
- Name input
- Email input
- Bio text area
- Notification toggle
- Dark mode toggle
- Save button

### Phase 5: Navigation Setup
This phase connects all screens together.

1. Configure Stack Navigator:
```javascript
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TaskList" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
};
```
Result: Enables:
- Navigation between task list and detail views
- Back button functionality
- Custom header styling

2. Configure Tab Navigator:
```javascript
const Tab = createBottomTabNavigator();

// Tab navigator setup...
```
Result: Creates bottom tab bar with:
- Home tab with task list
- Profile tab
- Custom icons for each tab
- Active/inactive tab states

### Phase 6: State Management
This phase adds interactivity to the app.

1. Task List State:
```javascript
const [taskList, setTaskList] = useState([]);
```
Result: Enables:
- Dynamic task list updates
- Task completion toggling
- List refreshing

2. Profile Form State:
```javascript
const [name, setName] = useState('John Doe');
const [email, setEmail] = useState('john@example.com');
// More state variables...
```
Result: Enables:
- Form input handling
- Toggle switch state management
- Form validation
- Save functionality

### Phase 7: Styling Enhancements
This phase improves the visual appeal.

1. Global Theme:
```javascript
const theme = {
  colors: {
    primary: '#f4511e',
    // More colors...
  }
};
```
Result: Provides consistent styling across:
- Headers
- Buttons
- Icons
- Text elements

2. Platform-Specific Styling:
```javascript
padding: Platform.OS === 'ios' ? 12 : 8,
```
Result: Optimizes UI for both:
- iOS devices
- Android devices

### Phase 8: Testing & Debugging
This phase ensures app quality.

1. Navigation Testing:
- Verify smooth transitions between screens
- Check header title updates
- Test back button behavior
- Validate tab switching

2. Component Testing:
- Verify task item layout
- Test touch feedback
- Check icon rendering
- Validate status indicators

3. Form Testing:
- Test input validation messages
- Verify toggle switch behavior
- Check keyboard handling
- Test form submission

## Common Issues & Solutions
Addresses typical problems you might encounter:
1. Navigation setup issues
2. State management bugs
3. Layout inconsistencies
4. Platform-specific behaviors

## Best Practices
Guidelines for:
1. Code organization
2. Performance optimization
3. User experience improvements
4. Error handling

## Additional Resources
Links to:
1. Official documentation
2. Debugging tools
3. Testing frameworks
