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
  Button 
} from 'react-native';

export default function OrderScreen({ navigation }) {
  // State management pattern from notes/wk04-user-input_and_output.md
  const [quantity, setQuantity] = useState('1');
  const [includeSurprises, setIncludeSurprises] = useState(false);
  const [includeDelivery, setIncludeDelivery] = useState(false);

  // Constants for item details
  const ITEM_NAME = "Giant Novelty Celebration Cake";
  const ITEM_PRICE = 1149.99;
  const SURPRISE_PRICE = 300.;
  const DELIVERY_PRICE = 100.00;

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
});
