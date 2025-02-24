/**
 * Receipt Screen Component
 * /screens/ReceiptScreen.js
 * 
 * Displays order confirmation details
 * 
 * Features:
 * - Extracts and processes navigation params
 * - Displays order details
 * - Computes totals
 *
 */

import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function ReceiptScreen({ route }) {
  // Route parameter extraction (Week 6)
  const {
    itemName,
    itemPrice,
    quantity,
    includeSurprises,
    includeDelivery,
    surprisePrice,
    deliveryPrice,
    subtotal,
    orderNumber,
    orderDate
  } = route.params;

  // Calculate totals
  const surpriseTotal = surprisePrice * quantity;
  const deliveryTotal = deliveryPrice * quantity;
  
  // Tax calculations 
  const TAX_RATE = 0.13;
  const subtotalBeforeTax = parseFloat(subtotal);
  const salesTax = subtotalBeforeTax * TAX_RATE;
  const finalTotal = subtotalBeforeTax + salesTax;

  // Conditional rendering if add-ons selected
  const hasAddOns = includeSurprises || includeDelivery;


  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Order Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Order Confirmation</Text>
          <Text style={styles.orderNumber}>Order #{orderNumber}</Text>
          <Text style={styles.orderDate}>{orderDate}</Text>
        </View>

        {/* Order Details Section  */}
        <View style={styles.detailsContainer}>
          {/* Main Item Details */}
          <View style={styles.detailRow}>
            <Text style={styles.itemName}>{itemName}</Text>
            <Text style={styles.itemPrice}>${itemPrice.toFixed(2)}</Text>
          </View>
          

          {/* Add-ons Section - Only render if add-ons are selected */}
          {hasAddOns && (
            <View style={styles.addOnsContainer}>
              {includeSurprises && (
                <View style={styles.detailRow}>
                  <Text>"Pop-out" Surprise</Text>
                  <Text>${surprisePrice.toFixed(2)}</Text>
                </View>
              )}
              {includeDelivery && (
                <View style={styles.detailRow}>
                  <Text>Delivery Service</Text>
                  <Text>${deliveryPrice.toFixed(2)}</Text>
                </View>
              )}
            </View>
          )}
          <Text style={styles.quantity}>Quantity: {quantity}</Text>

          {/* Subtotal and Tax Section */}
          <View style={styles.subtotalContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.subtotalLabel}>Subtotal:</Text>
              <Text style={styles.subtotalAmount}>${subtotalBeforeTax.toFixed(2)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.subtotalLabel}>Sales Tax (13%):</Text>
              <Text style={styles.subtotalAmount}>${salesTax.toFixed(2)}</Text>
            </View>
          </View>

          {/* Total Section */}
          <View style={styles.totalContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.totalLabel}>Order Total:</Text>
              <Text style={styles.totalAmount}>${finalTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Thank You Message Section */}
        <View style={styles.thankYouContainer}>
          <Text style={styles.thankYouText}>Thank you for your order!</Text>
          <Text style={styles.instructionText}>
            Your order will be ready in about 4 business days.
          </Text>
          <Text style={styles.instructionTextStrong}> Don't call us, we'll call you.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
// Define style paramaters, based on notes/wk02-styling.md
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e66767',
    textShadowColor: '#63cdda',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  orderNumber: {
    fontSize: 18,
    color: '#546de5',
    marginBottom: 5,
  },
  orderDate: {
    color: '#303952',
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
    color: '#546de5',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '500',
    color: '#3dc1d3',
  },
  quantity: {
    fontSize: 16,
    color: '#303952',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'right'
  },
  addOnsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
    marginBottom: 15,
  },
  subtotalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#546de5',
    borderRadius: 5,
    padding: 15,
  },
  subtotalLabel: {
    fontSize: 16,
    color: '#ffffff',
  },
  subtotalAmount: {
    fontSize: 16,
    color: '#ea8685',
  },
  totalContainer: {
    borderTopWidth: 2,
    borderTopColor: '#f3a683',
    paddingTop: 15,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303952',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3dc1d3',
  },
  thankYouContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#e66767',
    marginBottom: 10,
  },
  instructionText: {
    color: '#303952',
    textAlign: 'center',
    marginBottom: 5,
    flexWrap: 'wrap',//wraps text to next line if too long
    width: '80%',
    lineHeight: 20,
  },
  instructionTextStrong: {
    color: '#303952',
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
