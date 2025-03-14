// Detail screen implementation with lifecycle methods (ref: wk06s02-lifecycle.md)
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  // Get task data from navigation params
  const { task } = route.params;
  
  // State management for task details
  const [isCompleted, setIsCompleted] = useState(task.completed);

  // Lifecycle method example (ref: wk06s02-lifecycle.md)
  useEffect(() => {
    // Update navigation header
    navigation.setOptions({
      title: task.title,
    });

    // Cleanup function
    return () => {
      console.log('Detail screen unmounting');
    };
  }, []);

  // Handle completion toggle
  const toggleComplete = () => {
    setIsCompleted(!isCompleted);
    task.completed = !isCompleted;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.content}>{task.title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.content}>{task.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Priority</Text>
        <Text style={[
          styles.content,
          styles[task.priority]
        ]}>{task.priority.toUpperCase()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <Switch
          value={isCompleted}
          onValueChange={toggleComplete}
        />
      </View>
    </ScrollView>
  );
};

// Styling implementation (ref: wk02-styling.md)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    color: '#000',
  },
  high: {
    color: '#f4511e',
  },
  medium: {
    color: '#fb8c00',
  },
  low: {
    color: '#4caf50',
  }
});

export default DetailScreen;
