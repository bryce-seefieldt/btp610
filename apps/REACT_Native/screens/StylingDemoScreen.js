// StylingDemoScreen.js - Demonstrates various styling concepts
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const StylingDemoScreen = ({ navigation }) => {
  // UseIsFocused hook to detect when screen is active (btp610/notes/wk06s02-lifecycle.md lines 327-332)
  const isFocused = useIsFocused();
  
  // MOUNTING lifecycle (btp610/notes/wk06s02-lifecycle.md lines 157-158)
  useEffect(() => {
    console.log("StylingDemoScreen MOUNTING");
    return () => {
      console.log("StylingDemoScreen UNMOUNTING");
    };
  }, []);
  
  // Effect that runs when focus state changes (btp610/notes/wk06s02-lifecycle.md lines 459-464)
  useEffect(() => {
    console.log(`StylingDemoScreen focused: ${isFocused}`);
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Styling</Text>
        
        {/* Text styling demonstration from original App.js */}
        <View style={styles.demoBox}>
          <Text style={styles.normalText}>Normal Text</Text>
          <Text style={styles.boldText}>Bold Text</Text>
          <Text style={styles.italicText}>Italic Text</Text>
          <Text style={styles.largeText}>Large Text</Text>
          <Text style={styles.coloredText}>Colored Text</Text>
          <Text style={styles.shadowText}>Text with Shadow</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Styling</Text>
        
        {/* Border styling demonstration from original App.js */}
        <View style={styles.demoBox}>
          <View style={styles.borderDemo1}>
            <Text>Solid Border</Text>
          </View>
          <View style={styles.borderDemo2}>
            <Text>Dashed Border</Text>
          </View>
          <View style={styles.borderDemo3}>
            <Text>Rounded Border</Text>
          </View>
          <View style={styles.borderDemo4}>
            <Text>Colored Border</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform-Specific Styling</Text>
        
        {/* Platform-specific styling demonstration from original App.js */}
        <View style={styles.demoBox}>
          <View style={styles.platformBox}>
            <Text style={styles.platformText}>
              Current Platform: {Platform.OS}
            </Text>
            <Text style={styles.platformSpecificText}>
              This text has platform-specific styling
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conditional Styling</Text>
        
        {/* Conditional styling demonstration from original App.js */}
        <View style={styles.demoBox}>
          <Text style={styles.isPaidTrue}>Paid Status: True</Text>
          <Text style={styles.isPaidFalse}>Paid Status: False</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles from the original App.js styling demo section
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#2196F3',
    color: 'white',
    padding: 15,
  },
  demoBox: {
    padding: 15,
  },
  // Text styling examples
  normalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  italicText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  largeText: {
    fontSize: 24,
    marginBottom: 5,
  },
  coloredText: {
    fontSize: 16,
    color: '#2196F3',
    marginBottom: 5,
  },
  shadowText: {
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 5,
  },
  // Border styling examples
  borderDemo1: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
  borderDemo2: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 10,
    marginVertical: 5,
  },
  borderDemo3: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  borderDemo4: {
    borderWidth: 2,
    borderColor: '#FF9800',
    padding: 10,
    marginVertical: 5,
  },
  // Platform-specific styling
  platformBox: {
    padding: 10,
    backgroundColor: Platform.select({
      ios: '#e3f2fd',
      android: '#f9fbe7',
      default: '#e0f7fa',
    }),
  },
  platformText: {
    fontSize: 16,
    marginBottom: 10,
  },
  platformSpecificText: {
    fontSize: 16,
    ...Platform.select({
      ios: {
        color: '#2196F3',
        fontWeight: '600',
      },
      android: {
        color: '#4CAF50',
        fontWeight: 'bold',
      },
      default: {
        color: '#9C27B0',
      },
    }),
  },
  // Conditional styling
  isPaidTrue: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  isPaidFalse: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export default StylingDemoScreen; 