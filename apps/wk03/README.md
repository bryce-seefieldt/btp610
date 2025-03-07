# Layout Exercises Implementation Guide

This guide explains the implementation of various React Native layout exercises, demonstrating flexbox and styling concepts.

## Project Structure

```
wk03/
├── assets/
│   └── welcome-image.png
├── App.js
└── README.md
```

## Implementation Details

### 1. Initial Setup
```javascript
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
```
- Basic React Native components imported
- MaterialCommunityIcons imported for Google header exercise
- Main container setup with proper spacing and padding

### 2. Exercise 1: Colored Boxes
```javascript
<View style={[styles.row, { justifyContent: 'flex-end' }]}>
  <Text style={[styles.box, { backgroundColor: '#12CBC4' }]}>One</Text>
  <Text style={[styles.box, { backgroundColor: '#D980FA' }]}>Two</Text>
  <Text style={[styles.box, { backgroundColor: '#F79F1F' }]}>Three</Text>
</View>
```
- Single row of three colored boxes
- Flexbox with row direction
- Boxes aligned to end of container
- Each box: 50x50 with margin of 8

### 3. Exercise 2: Three Rows
- Demonstrates three different justifyContent values:
  - flex-end (top row)
  - center (middle row)
  - flex-start (bottom row)
- Reuses box components from Exercise 1
- Each row has distinct alignment

### 4. Exercise 3: Skillup Screen
```javascript
<View style={styles.skillupContainer}>
  <Text style={styles.skillupTitle}>SkillUp</Text>
  <Text style={styles.skillupDescription}>Choose from 210,000 courses</Text>
  <Text style={styles.skillupWebsite}>Find us at www.skillup.com</Text>
</View>
```
- Purple background container
- Centered text elements
- Different font sizes for hierarchy
- Space-between distribution

### 5. Exercise 4: Welcome Screen
```javascript
<View style={styles.welcomeContainer}>
  <Image source={require('./assets/welcome-image.png')} style={styles.welcomeImage} />
  <Text style={styles.welcomeTitle}>Welcome</Text>
  <Text style={styles.welcomeMessage}>We are so glad you are here</Text>
</View>
```
- Centered layout with image
- Stacked text elements
- Custom typography for title and message
- Gap spacing between elements

### 6. Exercise 6: Google Search Header
```javascript
<View style={styles.googleHeader}>
  <View style={styles.googleTopBar}>
    <Text>Gmail</Text>
    <Text>Images</Text>
    <MaterialCommunityIcons name="dots-grid" size={24} color="black" />
    <View style={styles.profileCircle}>
      <Text>KP</Text>
    </View>
  </View>
  <Image source={{uri: '...'}} style={styles.googleDoodle} />
</View>
```
- Top bar with right-aligned elements
- Circular profile badge
- Grid icon implementation
- Google doodle image

## Styling Implementation

### 1. Container Styles
```javascript
mainContainer: {
  flex: 1,
  backgroundColor: '#fff',
  padding: 20,
  marginTop: 40,
}
```
- Full screen flex container
- Proper spacing from device top
- Consistent padding

### 2. Box Styles
```javascript
box: {
  height: 50,
  width: 50,
  fontSize: 20,
  margin: 8,
  textAlign: 'center',
}
```
- Consistent box dimensions
- Centered text content
- Proper spacing between boxes

### 3. Layout Styles
```javascript
row: {
  flexDirection: 'row',
  borderWidth: 1,
  marginVertical: 10,
}
```
- Flexbox row configuration
- Visual borders for debugging
- Vertical spacing between rows

### 4. Custom Component Styles
- Profile circle implementation
- Google doodle sizing
- Welcome screen image handling
- Skillup text hierarchy

## Key Concepts Demonstrated
1. Flexbox Layout
2. Component Alignment
3. Spacing and Margins
4. Custom Styling
5. Image Handling
6. Icon Implementation
7. Nested Layouts
8. Conditional Styling
9. Typography
10. Border Styling

## Requirements
- React Native setup
- Expo CLI
- Image assets
- Icon libraries
