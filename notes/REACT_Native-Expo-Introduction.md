# React Native & Expo Introduction

## Core Principles
### 1. Declarative Programming

- Uses declarative rather than imperative approach
- You specify what the UI should look like, not how to create it step-by-step
- The framework handles the implementation details

### 2. Component-Based Architecture
- Everything is built from reusable components
- Components can be basic UI elements or complex compositions
- Components are represented as JavaScript functions that return UI elements
- A component function can only return one root element

## Key Rules
### 1. Container Requirements
- Multiple elements must be wrapped in a container
- `<View>` is the primary container element in React Native
- Every `<View>` is automatically a flex container

### 2. Component Import Rules
- UI elements must be imported before use (unlike web HTML)
- Common imports include: `<View>`, `<Text>`, `<Image>`, `<Button>`, `<Pressable>`, `<Switch>`, `<TextInput>`

## 3. Styling System
### 1. Basic Styling
- Uses JavaScript objects for styles
- Can be inline or defined in `StyleSheet.create()`
- Properties use camelCase naming (unlike CSS)

### 2. Text Styling Properties
- `fontSize`, `color`, `backgroundColor`
- `fontWeight`, `fontStyle`, `textAlign`            
- `textDecorationLine`

### 3. Layout Properties
- `padding`, `margin` (with variants like `paddingTop`, `marginLeft`)
- `borderWidth`, `borderColor`, `borderStyle`
- `height`, `width`

### 4. Flexbox Layout System
- Primary layout mechanism
- Components:
  - Flex Container (<View>)
  - Flex Items (elements inside the container)
- Key Properties:
  - `flexDirection`: "row" | "column" (default is "column")
  - `justifyContent`: Controls positioning and spacing
  - `gap`: Fixed spacing between items
  - `flex`: Proportional space allocation

## Image Handling
- Network images require explicit height/width
- `resizeMode` property controls scaling
- Options include: "contain", "center", "cover"

## Best Practices
- Use `<SafeAreaView>` for iOS notch compatibility
- Import only needed components
- Structure complex layouts using nested flex containers
- Use responsive spacing with `justifyContent` over fixed `gap` when possible
-Maintain clear component hierarchy

This methodology emphasizes a structured, component-based approach with heavy reliance on flexbox for layouts and a JavaScript-based styling system.