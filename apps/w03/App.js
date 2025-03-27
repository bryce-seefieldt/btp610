/*
Wk 03 example implementation:
1. Combines all exercises into a single scrollable view
2. Maintains separate sections for each exercise
3. Implements all layout concepts (flexbox, positioning, spacing)
4. Uses both local and remote images
5. Implements icon usage
6. Demonstrates various styling techniques
7. Includes detailed comments referencing the documentation
*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
// Import icons for Google Search example (ref: lines 588-590)
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      {/* Exercise 1: Colored Boxes (ref: lines 35-43) */}
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>Exercise 1: Colored Boxes</Text>
        <View style={[styles.row, { justifyContent: 'flex-end' }]}>
          <Text style={[styles.box, { backgroundColor: '#12CBC4' }]}>One</Text>
          <Text style={[styles.box, { backgroundColor: '#D980FA' }]}>Two</Text>
          <Text style={[styles.box, { backgroundColor: '#F79F1F' }]}>Three</Text>
        </View>
      </View>

      {/* Exercise 2: Three Rows (ref: lines 53-59) */}
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>Exercise 2: Three Rows</Text>
        <View style={[styles.row, { justifyContent: 'flex-end' }]}>
          <Text style={[styles.box, { backgroundColor: '#12CBC4' }]}>One</Text>
          <Text style={[styles.box, { backgroundColor: '#D980FA' }]}>Two</Text>
          <Text style={[styles.box, { backgroundColor: '#F79F1F' }]}>Three</Text>
        </View>
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <Text style={[styles.box, { backgroundColor: '#12CBC4' }]}>One</Text>
          <Text style={[styles.box, { backgroundColor: '#D980FA' }]}>Two</Text>
          <Text style={[styles.box, { backgroundColor: '#F79F1F' }]}>Three</Text>
        </View>
        <View style={[styles.row, { justifyContent: 'flex-start' }]}>
          <Text style={[styles.box, { backgroundColor: '#12CBC4' }]}>One</Text>
          <Text style={[styles.box, { backgroundColor: '#D980FA' }]}>Two</Text>
          <Text style={[styles.box, { backgroundColor: '#F79F1F' }]}>Three</Text>
        </View>
      </View>

      {/* Exercise 3: Skillup (ref: lines 254-264) */}
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>Exercise 3: Skillup</Text>
        <View style={styles.skillupContainer}>
          <Text style={styles.skillupTitle}>SkillUp</Text>
          <Text style={styles.skillupDescription}>Choose from 210,000 courses</Text>
          <Text style={styles.skillupWebsite}>Find us at www.skillup.com</Text>
        </View>
      </View>

      {/* Exercise 4: Welcome Screen (ref: lines 463-474) */}
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>Exercise 4: Welcome Screen</Text>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('./assets/welcome-image.png')}
            style={styles.welcomeImage}
          />
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeMessage}>We are so glad you are here</Text>
        </View>
      </View>

      {/* Exercise 6: Google Search Header (ref: lines 528-546) */}
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>Exercise 6: Google Header</Text>
        <View style={styles.googleHeader}>
          <View style={styles.googleTopBar}>
            <Text>Gmail</Text>
            <Text>Images</Text>
            <MaterialCommunityIcons name="dots-grid" size={24} color="black" />
            <View style={styles.profileCircle}>
              <Text>KP</Text>
            </View>
          </View>
          <Image
            source={{
              uri: 'https://www.google.com/logos/doodles/2023/2023-womens-world-cup-opening-day-6753651837110060-2xa.gif'
            }}
            style={styles.googleDoodle}
          />
        </View>
      </View>
    </View>
  );
}

// Styles implementation combining all exercise styles (ref: multiple sections)
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 40,
  },
  exerciseContainer: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // Exercise 1 & 2 styles (ref: lines 88-96)
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: 10,
  },
  box: {
    height: 50,
    width: 50,
    fontSize: 20,
    margin: 8,
    textAlign: 'center',
  },
  // Exercise 3 styles (ref: lines 411-419)
  skillupContainer: {
    height: '100%',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#D6A2E8',
  },
  skillupTitle: {
    fontSize: 28,
    textAlign: 'center',
  },
  skillupDescription: {
    fontSize: 60,
    textAlign: 'center',
  },
  skillupWebsite: {
    fontSize: 28,
    textAlign: 'center',
  },
  // Exercise 4 styles (ref: lines 496-507)
  welcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  welcomeImage: {
    width: 200,
    height: 200,
  },
  welcomeTitle: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  welcomeMessage: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  // Exercise 6 styles (ref: lines 609-619)
  googleHeader: {
    borderWidth: 1,
  },
  googleTopBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20,
    padding: 10,
  },
  profileCircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#18dcff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleDoodle: {
    height: 100,
    width: '100%',
    resizeMode: 'contain',
  },
});
