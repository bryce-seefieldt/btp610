// Reusable component implementation (ref: wk02s01-rules_of_react.md)
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TaskItem = ({ task, onPress }) => {
  // Declarative UI rendering (ref: wk1s02-react_native.md)
  return (
    <Pressable 
      style={styles.container} 
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.date}>Due: {task.dueDate}</Text>
        
        {/* Conditional rendering (ref: wk04-user-input_and_output.md) */}
        {task.priority === 'high' && (
          <MaterialIcons name="priority-high" size={24} color="#f4511e" />
        )}
      </View>
      
      {/* Status indicator */}
      <View style={[
        styles.status,
        { backgroundColor: task.completed ? '#4CAF50' : '#FFC107' }
      ]} />
    </Pressable>
  );
};

// StyleSheet implementation (ref: wk02-styling.md)
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  status: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  }
});

export default TaskItem;
