// Home screen implementation with FlatList (ref: wk05-Flatlist_component.md)
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Import components and data
import TaskItem from '../components/TaskItem';
import tasks from '../data/tasks';

const HomeScreen = ({ navigation }) => {
  // State management (ref: wk04-user-input_and_output.md)
  const [taskList, setTaskList] = useState([]);

  // Screen focus effect (ref: wk06s02-lifecycle.md)
  useFocusEffect(
    React.useCallback(() => {
      setTaskList([...tasks]);
      return () => {
        // Cleanup on screen unfocus
        console.log('Home screen unfocused');
      };
    }, [])
  );

  // Navigation handler
  const handleTaskPress = (task) => {
    navigation.navigate('Details', { task });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem 
            task={item} 
            onPress={() => handleTaskPress(item)}
          />
        )}
        // Add separator between items
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  }
});

export default HomeScreen;
