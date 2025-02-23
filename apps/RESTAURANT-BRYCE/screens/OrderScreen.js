/**
 * Order Screen Component
 * Primary screen for food order input
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

  // Form handlers pattern from apps/w07s02-Final/screens/AddScreen.js
  const handleClear = () => {
    setQuantity('1');
    setIncludeSurprises(false);
    setIncludeDelivery(false);
  };

  const handleSubmit = () => {
    // Input validation pattern from apps/w07s02-Final/screens/AddScreen.js
    if (parseInt(quantity) <= 0 || isNaN(parseInt(quantity))) {
      Alert.alert(
        "Invalid Quantity", 
        "Please enter a valid quantity greater than 0"
      );
      return;
    }

    // Calculate final total for passing to receipt
    const subtotal = parseFloat(calculateSubtotal());

    // Navigation with params pattern from notes/wk06s01-Multicreen_Apps.md
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
      
      // Totals
      subtotal: subtotal,
      orderNumber: Math.floor(100000 + Math.random() * 900000), // 6-digit order number
      
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
          <Text style={styles.itemPrice}>${ITEM_PRICE.toFixed(2)}</Text>
          
          {/* Image implementation from apps/w01s02/App_Basic.js */}
          <Image 
            source={require('../assets/giant-cake.png')}
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
              placeholder="Enter desired quantity"
            />
          </View>

          {/* Switch components pattern from apps/w07s02-Final/screens/AddScreen.js */}
          <View style={styles.switchContainer}>
            <View style={styles.switchRow}>
              <Text>"Singer pops out of the cake" (+${SURPRISE_PRICE.toFixed(2)})</Text>
              <Switch
                value={includeSurprises}
                onValueChange={setIncludeSurprises}
              />
            </View>
            <View style={styles.switchRow}>
              <Text>Include Delivery (+${DELIVERY_PRICE.toFixed(2)})</Text>
              <Switch
                value={includeDelivery}
                onValueChange={setIncludeDelivery}
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

        {/* Buttons Section - Pattern from apps/w07s02-Final/screens/AddScreen.js */}
        <View style={styles.buttonContainer}>
          <Button 
            title="Submit Order" 
            onPress={handleSubmit}
            color="#2ecc71"
          />
          <View style={styles.buttonSpacing} />
          <Button 
            title="Clear Form" 
            onPress={handleClear}
            color="#95a5a6"
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
  },
  itemPrice: {
    fontSize: 20,
    color: '#2ecc71',
    marginBottom: 15,
  },
  itemImage: {
    width: 250,
    height: 200,
    borderRadius: 10,
  },
  // Form styling patterns from apps/w07s02-Final/screens/AddScreen.js
  form: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  switchContainer: {
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    marginBottom: 20,
  },
  subtotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtotalAmount: {
    fontSize: 20,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
});
