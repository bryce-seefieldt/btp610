/**
 * Order Screen Component
 * Primary screen for food order input
 * 
 * Key Course Concepts:
 * 1. State Management (Week 4)
 *    - useState hooks for form control
 *    - Controlled components pattern
 * 
 * 2. UI Components (Weeks 1-3)
 *    - ScrollView for content overflow
 *    - Image handling and styling
 *    - Switch components for toggles
 *    - TextInput for user data entry
 * 
 * 3. Layout & Styling (Week 2)
 *    - Flexbox implementation
 *    - StyleSheet organization
 *    - Consistent color theming
 * 
 * 4. Navigation (Week 6)
 *    - Route parameter passing
 *    - Screen transitions
 * 
 * Layout Structure References:
 * - ScrollView pattern from apps/w07s02-Final/screens/AddScreen.js
 * - Flex styling approach from apps/w02s02-flexbox/App_Basic.js
 * - Image implementation from apps/w01s02/App_Basic.js
 * - Form field patterns from apps/w07s02-Final/screens/AddScreen.js
 * - State management from notes/wk04-user-input_and_output.md
 * - Button handlers from apps/w07s02-Final/screens/AddScreen.js
 */

import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TextInput,
  Switch,
  Button,
  Alert 
} from 'react-native';

export default function OrderScreen({ navigation }) {
  // State management pattern from notes/wk04-user-input_and_output.md
  const [quantity, setQuantity] = useState('1');
  const [includeSurprises, setIncludeSurprises] = useState(false);
  const [includeDelivery, setIncludeDelivery] = useState(false);

  // Constants for item details
  const ITEM_NAME = "Giant Novelty Celebration Cake";
  const ITEM_PRICE = 1499.99;
  const SURPRISE_PRICE = 300.00;
  const DELIVERY_PRICE = 100.00;

  // Get the appropriate image based on surprise selection
  const cakeImage = includeSurprises 
    ? require('../assets/giant-cake-w-surprise.png')
    : require('../assets/giant-cake.png');

  // Form handlers pattern from apps/w07s02-Final/screens/AddScreen.js
  const handleClear = () => {
    setQuantity('1');
    setIncludeSurprises(false);
    setIncludeDelivery(false);
  };

  // Navigation parameter pattern (Week 6)
  const handleSubmit = () => {
    // Input validation (Week 4 - User Input)
    if (parseInt(quantity) <= 0 || isNaN(parseInt(quantity))) {
      Alert.alert(
        "Invalid Quantity", 
        "Please enter a valid quantity greater than 0"
      );
      return;
    }

    // Calculate final total using Week 4 computation patterns
    const subtotal = parseFloat(calculateSubtotal());

    // Navigation with params (Week 6 - Multi-screen Apps)
    navigation.navigate('Receipt', {
      // Order details
      itemName: ITEM_NAME,
      itemPrice: ITEM_PRICE,
      quantity: parseInt(quantity),
      
      // Add-ons
      includeSurprises,
      includeDelivery,
      surprisePrice: SURPRISE_PRICE,
      deliveryPrice: DELIVERY_PRICE,
      
      // Total
      subtotal: subtotal,
      // Quasi-random 6-digit order number
      orderNumber: Math.floor(100000 + Math.random() * 900000), 
      // Timestamp
      orderDate: new Date().toLocaleString()
    });
  };

  // Calculate subtotal based on quantity and selected add-ons
  // Pattern for calculations from apps/w07s02-Final/screens/HomeScreen.js
  const calculateSubtotal = () => {
    let basePrice = ITEM_PRICE;
    if (includeSurprises) basePrice += SURPRISE_PRICE;
    if (includeDelivery) basePrice += DELIVERY_PRICE;
    return (basePrice * parseInt(quantity || '0')).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Item Details Section */}
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{ITEM_NAME}</Text>
          <Text style={styles.itemPrice}>${ITEM_PRICE.toFixed(2)} each</Text>
          
          {/* Image implementation from apps/w01s02/App_Basic.js */}
          <Image 
            source={cakeImage}
            style={styles.itemImage}
          />
        </View>

        {/* Form Fields Section - Pattern from apps/w07s02-Final/screens/AddScreen.js */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantity:</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholder="Enter quantity"
            />
          </View>

          {/* Switch components with updated colors */}
          <View style={styles.switchContainer}>
            <View style={styles.switchRow}>
              <Text>Person pops out of Cake (${SURPRISE_PRICE.toFixed(2)})</Text>
              <Switch
                value={includeSurprises}
                onValueChange={setIncludeSurprises}
                trackColor={{ false: '#d1d8e0', true: '#63cdda' }}  // Updated switch color

              />
            </View>
            <View style={styles.switchRow}>
              <Text>Delivery (${DELIVERY_PRICE.toFixed(2)})</Text>
              <Switch
                value={includeDelivery}
                onValueChange={setIncludeDelivery}
                trackColor={{ false: '#d1d8e0', true: '#63cdda' }}  // Updated switch color

              />
            </View>
          </View>
        </View>

        {/* Subtotal Display - Pattern from apps/w07s02-Final/screens/HomeScreen.js */}
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalLabel}>Order Subtotal:</Text>
          <Text style={styles.subtotalAmount}>
            ${calculateSubtotal()}
          </Text>
        </View>

        {/* Buttons with updated colors */}
        <View style={styles.buttonContainer}>
          <Button 
            title="Submit Order" 
            onPress={handleSubmit}
            color="#c44569"  
            fontWeight='bold'
          />
          <View style={styles.buttonSpacing} />
          <Button 
            title="Clear Form" 
            onPress={handleClear}
            color="#596275"  
          />
        </View>
      </ScrollView>
    </View>
  );
}

// Styling pattern based on notes/wk02-styling.md
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  // New styles for item details
  itemDetails: {
    alignItems: 'center',
    marginBottom: 20,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e66767',
    textAlign: 'center',
    textShadowColor: '#63cdda',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    width: '100%',
  },
  itemPrice: {
    fontSize: 20,
    color: '#546de5',
    marginBottom: 15,
  },
  itemImage: {
    width: 200,
    height: 160,
    borderRadius: 10,
    resizeMode: 'contain',  // Ensures image fits within dimensions while maintaining aspect ratio
  },
  // Form styling patterns from apps/w07s02-Final/screens/AddScreen.js
  form: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',  // Aligns children horizontally
    alignItems: 'center',  // Centers children vertically
    justifyContent: 'space-between', // Pushes label and input to opposite sides
    paddingRight: 10,  // Matches switch container padding
    
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    width: 170,
    backgroundColor: '#63cdda',
  },
  switchContainer: {
    marginBottom: 20,
    color: '#f7d794',   
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Pushes label and switch to opposite sides
    alignItems: 'center',
    marginBottom: 15,
    paddingRight: 10,
  },
  // Button styling patterns from apps/w07s02-Final/screens/AddScreen.js
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonSpacing: {
    height: 10,  // Space between buttons
  },
  // Subtotal styling pattern from apps/w07s02-Final/screens/HomeScreen.js
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#546de5',
    borderRadius: 5,
    marginBottom: 20,
  },
  subtotalLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtotalAmount: {
    fontSize: 20,
    color: '#ea8685',
    fontWeight: 'bold',
  },
});
