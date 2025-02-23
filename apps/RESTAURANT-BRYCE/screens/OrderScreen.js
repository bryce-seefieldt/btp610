/**
 * /screens/OrderScreen.js
 * Order Screen Component
 * Primary screen for user order input
 * 
 * Layout Structure References:
 * - ScrollView pattern from apps/w07s02-Final/screens/AddScreen.js
 * - Flex styling approach from apps/w02s02-flexbox/App_Basic.js
 * 
 * Component Structure:
 * - Uses ScrollView for form content to handle overflow
 * - Container styling with flex pattern from notes/wk02-styling.md
 * - Navigation prop pattern from notes/wk06s01-Multicreen_Apps.md
 */

import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function OrderScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* ScrollView implementation from apps/w07s02-Final/screens/AddScreen.js */}
      <ScrollView>
        <Text>Order Screen</Text>
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
});
