// FlexboxLayoutScreen.js - Demonstrates Flexbox layout concepts
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { useEffect } from 'react';

const FlexboxLayoutScreen = ({ navigation, route }) => {
  // MOUNTING lifecycle (btp610/notes/wk06s02-lifecycle.md lines 157-158)
  useEffect(() => {
    console.log("FlexboxLayoutScreen MOUNTING");
    return () => {
      console.log("FlexboxLayoutScreen UNMOUNTING");
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Row Direction (horizontal)</Text>
        
        {/* Row layout example from btp610/notes/wk02s02-flexbox.md */}
        <View style={styles.demoBox}>
          <View style={styles.rowContainer}>
            <View style={styles.box1}><Text style={styles.boxText}>1</Text></View>
            <View style={styles.box2}><Text style={styles.boxText}>2</Text></View>
            <View style={styles.box3}><Text style={styles.boxText}>3</Text></View>
          </View>
          <Text style={styles.codeText}>
            flexDirection: 'row'
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Column Direction (vertical)</Text>
        
        {/* Column layout example from btp610/notes/wk02s02-flexbox.md */}
        <View style={styles.demoBox}>
          <View style={styles.columnContainer}>
            <View style={styles.box1}><Text style={styles.boxText}>1</Text></View>
            <View style={styles.box2}><Text style={styles.boxText}>2</Text></View>
            <View style={styles.box3}><Text style={styles.boxText}>3</Text></View>
          </View>
          <Text style={styles.codeText}>
            flexDirection: 'column'
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>justifyContent (main axis)</Text>
        
        {/* justifyContent examples from btp610/notes/wk02s02-flexbox.md */}
        <View style={styles.demoBox}>
          <Text style={styles.subheading}>space-between</Text>
          <View style={styles.justifySpaceBetween}>
            <View style={styles.smallBox}></View>
            <View style={styles.smallBox}></View>
            <View style={styles.smallBox}></View>
          </View>
          
          <Text style={styles.subheading}>space-around</Text>
          <View style={styles.justifySpaceAround}>
            <View style={styles.smallBox}></View>
            <View style={styles.smallBox}></View>
            <View style={styles.smallBox}></View>
          </View>
          
          <Text style={styles.subheading}>center</Text>
          <View style={styles.justifyCenter}>
            <View style={styles.smallBox}></View>
            <View style={styles.smallBox}></View>
            <View style={styles.smallBox}></View>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>alignItems (cross axis)</Text>
        
        {/* alignItems examples from btp610/notes/wk02s02-flexbox.md */}
        <View style={styles.demoBox}>
          <Text style={styles.subheading}>flex-start</Text>
          <View style={styles.alignStart}>
            <View style={styles.smallBox}></View>
            <View style={[styles.smallBox, { height: 60 }]}></View>
            <View style={styles.smallBox}></View>
          </View>
          
          <Text style={styles.subheading}>center</Text>
          <View style={styles.alignCenter}>
            <View style={styles.smallBox}></View>
            <View style={[styles.smallBox, { height: 60 }]}></View>
            <View style={styles.smallBox}></View>
          </View>
          
          <Text style={styles.subheading}>flex-end</Text>
          <View style={styles.alignEnd}>
            <View style={styles.smallBox}></View>
            <View style={[styles.smallBox, { height: 60 }]}></View>
            <View style={styles.smallBox}></View>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>flex (item proportion)</Text>
        
        {/* flex examples from btp610/notes/wk02-styling.md */}
        <View style={styles.demoBox}>
          <View style={styles.flexContainer}>
            <View style={styles.flex1}><Text style={styles.boxText}>flex: 1</Text></View>
            <View style={styles.flex2}><Text style={styles.boxText}>flex: 2</Text></View>
            <View style={styles.flex1}><Text style={styles.boxText}>flex: 1</Text></View>
          </View>
          <Text style={styles.codeText}>
            Item proportions: 1:2:1
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

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
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: 15,
  },
  demoBox: {
    padding: 15,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 5,
    fontSize: 14,
    marginTop: 10,
  },
  // Row layout
  rowContainer: {
    flexDirection: 'row',
    height: 80,
    marginBottom: 10,
  },
  // Column layout
  columnContainer: {
    flexDirection: 'column',
    height: 240,
  },
  // Boxes with different colors
  box1: {
    flex: 1,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    flex: 1,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // JustifyContent examples
  justifySpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e3f2fd',
    padding: 10,
    height: 60,
  },
  justifySpaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e3f2fd',
    padding: 10,
    height: 60,
    marginTop: 10,
  },
  justifyCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e3f2fd',
    padding: 10,
    height: 60,
    marginTop: 10,
  },
  // AlignItems examples
  alignStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e8f5e9',
    padding: 10,
    height: 80,
  },
  alignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 10,
    height: 80,
    marginTop: 10,
  },
  alignEnd: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#e8f5e9',
    padding: 10,
    height: 80,
    marginTop: 10,
  },
  smallBox: {
    width: 40,
    height: 40,
    backgroundColor: '#4CAF50',
  },
  // Flex examples
  flexContainer: {
    flexDirection: 'row',
    height: 80,
  },
  flex1: {
    flex: 1,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex2: {
    flex: 2,
    backgroundColor: '#673AB7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlexboxLayoutScreen; 