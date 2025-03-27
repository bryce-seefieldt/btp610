# Week 4: User Input and Output Implementation Guide

## Overview
This implementation demonstrates various ways to handle user input and output in React Native, including text input, switches, buttons, and conditional rendering.

## Core Concepts Implemented

### 1. State Variables
- Used `useState` hook for managing dynamic data
- Created state variables for:
  - Message display
  - Book details (title, author, pages)
  - User input (name)
  - Switch toggle (airplane mode)

### 2. User Input Components

#### Text Input Fields
```javascript
<TextInput
  style={styles.input}
  value={bookTitle}
  onChangeText={setBookTitle}
  placeholder="Enter book title"
/>
```
- Captures user text input
- Updates state variables automatically
- Includes placeholder text
- Styled with borders and padding

#### Switch Component
```javascript
<Switch 
  value={airplaneMode} 
  onValueChange={setAirplaneMode}
/>
```
- Toggle between true/false states
- Updates state immediately on change
- Used for boolean settings

### 3. Button Interactions
- Random Number Generator
  - Generates number between 5-200
  - Updates message state
- Reading Rate Calculator
  - Takes book details as input
  - Calculates reading time
  - Displays formatted result
- User Input Handler
  - Processes name and switch state
  - Shows alert with input values
  - Resets form after submission

### 4. Conditional Rendering
- Platform-specific styling
- Error handling for incomplete forms
- Dynamic text highlighting
- Responsive layout adjustments

## Implementation Steps

1. **Setup State Variables**
   - Import useState hook
   - Define initial states for all variables
   - Create state update functions

2. **Create Input Handlers**
   - Text input handlers with onChangeText
   - Switch handlers with onValueChange
   - Button press handlers

3. **Build UI Components**
   - Organize into sections
   - Add input fields
   - Include buttons
   - Style components

4. **Add Styling**
   - Create StyleSheet object
   - Define common styles
   - Add platform-specific adjustments
   - Implement responsive layouts

## Key Features

### 1. Reading Rate Calculator
- Takes book title, author, and page count
- Calculates estimated reading time
- Displays formatted result with highlights

### 2. User Input Form
- Name input field
- Airplane mode toggle
- Submit button with confirmation

### 3. Random Number Generator
- Simple button interaction
- Updates display message
- Shows immediate feedback

## Styling Details

### Container Layout
```javascript
container: {
  flex: 1,
  padding: 20,
  marginTop: Platform.OS === "ios" ? 50 : 20,
}
```
- Full screen flex container
- Platform-specific margins
- Consistent padding

### Input Styling
```javascript
input: {
  borderWidth: 1,
  borderColor: '#ced4da',
  borderRadius: 4,
  padding: 10,
  marginVertical: 5,
  fontSize: 16,
}
```
- Bordered input fields
- Rounded corners
- Proper spacing
- Readable font size

## Requirements
- React Native
- Expo CLI
- Basic understanding of state management
- Knowledge of React Native components

## Usage
1. Clone repository
2. Install dependencies
3. Run with Expo
4. Test different input scenarios
5. Observe state updates and UI changes
