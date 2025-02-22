# BTP610; A2: Restaurant App Development Plan

## Phase 1: Project Setup and Navigation Structure
Based on `notes/react-native-setup.md` and `notes/wk06s01-Multicreen_Apps.md`:

1. Create project:
```bash
npx create-expo-app RESTAURANT-BRYCE
```

2. Install navigation dependencies (from `apps/w07s01/App.js`):
```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/stack
npx expo install react-native-gesture-handler
```

3. Setup basic navigation structure:
- Create `/screens` directory
- Create `OrderScreen.js` and `ReceiptScreen.js`
- Implement Stack Navigator (reference: `apps/w07s02-Final/App.js`)

## Phase 2: Order Screen Implementation
Based on `notes/wk02-styling.md` and `apps/w07s02-Final/screens/AddScreen.js`:

### Layout Structure:
- Use `<View>` container with flex styling
- Implement ScrollView for form content
- Reference flexbox patterns from `apps/w02s02-flexbox/App_Basic.js`

### Components Required:
1. Image Display:
```javascript
<Image 
  source={{uri: "your-food-image-url"}}
  style={{width: 250, height: 200}}
/>
```
(Reference: `apps/w01s02/App_Basic.js`)

2. Form Fields:
- TextInput for quantity (Reference: `apps/w07s02-Final/screens/AddScreen.js`)
- Two Switch components for add-ons (Reference: `apps/w07s02-Final/screens/AddScreen.js`)

3. Buttons:
- Submit Order button
- Clear Form button
(Reference: `apps/w07s02-Final/screens/AddScreen.js`)

### State Management:
Based on `notes/wk04-user-input_and_output.md`:
```javascript
const [quantity, setQuantity] = useState("");
const [addOn1, setAddOn1] = useState(false);
const [addOn2, setAddOn2] = useState(false);
```

## Phase 3: Receipt Screen Implementation
Based on `apps/w07s02-Final/screens/HomeScreen.js`:

### Components:
1. Order Details Display:
- Use flexbox layout for organized display
- Implement conditional rendering for add-ons
(Reference: `apps/w02s02-styling/App_Basic.js`)

2. Cost Calculations:
```javascript
const calculateTotal = () => {
  // Implementation using passed route params
}
```

3. Order Confirmation Code:
```javascript
const generateOrderCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
}
```

## Phase 4: Navigation and Data Passing
Based on `notes/wk06s01-Multicreen_Apps.md`:

1. Navigate to Receipt:
```javascript
navigation.navigate('Receipt', {
  quantity: quantity,
  addOns: [addOn1, addOn2],
  // other order details
});
```

2. Receive Data in Receipt Screen:
```javascript
const ReceiptScreen = ({route}) => {
  const {quantity, addOns} = route.params;
}
```

## Phase 5: Styling Implementation
Based on `notes/wk02-styling.md`:

1. Create StyleSheet:
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  // Additional styles
});
```

2. Apply consistent styling across screens:
- Use flatuicolors.com colors as suggested
- Implement proper spacing and alignment using flexbox
- Ensure text readability with appropriate font sizes

## Key Functionalities Reference Map:

1. Form Handling:
- Reference: `apps/w07s02-Final/screens/AddScreen.js`
- Use TextInput and Switch components
- Implement state management with useState

2. Navigation:
- Reference: `apps/w07s02-Final/App.js`
- Use Stack.Navigator and Stack.Screen
- Implement navigation.navigate with params

3. Calculations and Display:
- Reference: `apps/w07s02-Final/screens/HomeScreen.js`
- Use state variables for dynamic updates
- Implement conditional rendering for add-ons

4. Layout and Styling:
- Reference: `apps/w02s02-styling/App_Basic.js`
- Use StyleSheet.create for consistent styling
- Implement flexbox for responsive layouts
