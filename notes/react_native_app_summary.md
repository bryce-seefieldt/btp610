# React Native App Development Methodology Summary

## Core Principles

### 1. Declarative Programming
- Specifies what UI should look like, not how to create it
- Framework handles implementation details
- Components return UI elements directly
- Example: `apps/w01s02/App_Basic.js` shows basic declarative structure

### 2. Component-Based Architecture
- Everything is a reusable component
- Components are JavaScript functions returning UI elements
- Must return single root element
- Components can be basic or complex compositions
- Reference: `apps/w02s01-rules_of_react/App_Basic.js`

## Key Development Rules

### 1. Container Requirements
- Multiple elements must be wrapped in a container
- `<View>` is primary container element
- Every `<View>` is automatically a flex container
- Example: `apps/w02s02-flexbox/App_Basic.js`

### 2. Component Import Rules
- UI elements must be explicitly imported
- Common imports: View, Text, Image, Button, Pressable, Switch, TextInput
- Example: `apps/w01s02/App_Basic.js`

## Styling System

### 1. Basic Styling Methods
- Uses JavaScript objects for styles
- Can be inline or in StyleSheet.create()
- Properties use camelCase
- Reference: `apps/w02s02-styling/App_Basic.js`

### 2. Layout System (Flexbox)
- Primary layout mechanism
- Components:
  - Flex Container (`<View>`)
  - Flex Items (child elements)
- Key Properties:
  - flexDirection: "row" | "column"
  - justifyContent: Controls positioning
  - alignItems: Controls alignment
  - flex: Proportional space allocation
- Example: `apps/w02s02-flexbox/App_Basic.js`

## Navigation

### 1. Stack Navigation
- Sequential screen navigation
- Forward/backward movement
- Uses `@react-navigation/stack`
- Example: `apps/w07s01/App.js`

### 2. Tab Navigation
- Parallel screen switching
- No sequential movement
- Uses `@react-navigation/bottom-tabs`
- Example: `apps/w07s02-Final/App.js`

### 3. Nested Navigation
- Combines multiple navigation patterns
- Example: Stack within Tabs
- Reference: `apps/w07s02-Final/screens/HomeScreen.js`

## State Management

### 1. useState Hook
- Manages component-level state
- Triggers re-renders on updates
- Used for user input and UI updates
- Example: `apps/w07s02-Final/screens/AddScreen.js`

### 2. Component Lifecycle
- useEffect for side effects
- useFocusEffect for screen focus
- Cleanup functions for unmounting
- Reference: `apps/w07s02-Final/screens/HomeScreen.js`

## Lists and Data Display

### 1. FlatList Component
- Efficient list rendering
- Requires data array and renderItem
- Supports item separation and keys
- Example: `apps/w07s02-Final/screens/HomeScreen.js`

### 2. Conditional Rendering
- Uses ternary operators or logical AND
- Controls visibility of UI elements
- Based on state or props
- Reference: `apps/w07s02-Final/screens/HomeScreen.js`

## Platform Considerations

### 1. SafeAreaView
- Handles iOS notch spacing
- Platform-specific styling
- Example: `apps/w07s02-Final/App.js`

### 2. Platform-Specific Code
- Platform.OS checks
- Conditional styling
- Reference: `apps/w07s02-Final/screens/HomeScreen.js`

## Best Practices

### 1. Project Structure
- Separate screens directory
- Common modules for shared code
- Navigation configuration in App.js
- Example: `apps/w07s02-Final/` project structure

### 2. Component Organization
- Clear hierarchy
- Reusable components
- Proper prop passing
- Reference: All example projects

### 3. Style Organization
- StyleSheet.create() for reusable styles
- Inline styles for dynamic properties
- Consistent naming conventions
- Example: All example projects
