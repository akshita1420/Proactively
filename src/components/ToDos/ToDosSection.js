import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated,
  Alert,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Make sure the component returns properly wrapped JSX
const ToDosSection = ({ screenWidth = 375 }) => {
  // Calculate responsive sizes
  const fontSize = Math.min(Math.max(screenWidth * 0.045, 16), 18);
  const cardWidth = Math.min(screenWidth * 0.9, 335);
  
  // Create an animated value for the progress width
  const animatedWidth = useRef(new Animated.Value(0)).current;
  
  // Initial todos state with 4 predefined todos
  const initialTodos = [
    { 
      id: 1, 
      text: 'Achieve 30k steps every week for blood sugar', 
      completed: true,
      author: 'Laurie Simons',
      date: 'Sep 5, 2024'
    },
    { 
      id: 2, 
      text: 'Take up health Coaching', 
      completed: true,
      author: 'Laurie Simons',
      date: 'Sep 5, 2024'
    },
    { 
      id: 3, 
      text: 'Go to a nearby gym and workout for 30 mins', 
      completed: false,
      author: 'Laurie Simons',
      date: 'Sep 5, 2024'
    },
    { 
      id: 4, 
      text: 'Complete 2 courses of Dr. Laurie Simons', 
      completed: false,
      author: 'Laurie Simons',
      date: 'Sep 5, 2024'
    },
  ];
  
  // State to track todos and added todo count
  const [todos, setTodos] = useState(initialTodos);
  const [addedTodos, setAddedTodos] = useState(0);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  
  // Calculate completed tasks
  const completedTasks = todos.filter(todo => todo.completed).length;
  const completionPercentage = (completedTasks / todos.length) * 100;
  
  // Animate progress bar on mount and when progress changes
  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: completionPercentage,
      duration: 500, // Changed from 1000 to 500 for faster animation
      useNativeDriver: false
    }).start();
  }, [completionPercentage]);
  
  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // Handle adding a new todo
  const handleAddTodo = () => {
    if (addedTodos >= 2) {
      Alert.alert(
        "Limit Reached", 
        "You can only add up to 2 additional tasks.",
        [{ text: "OK" }]
      );
      return;
    }
    
    // Show the add todo form
    setIsAddingTodo(true);
  };
  
  // Handle submitting a new todo
  const submitNewTodo = () => {
    if (!newTodoText.trim()) {
      setIsAddingTodo(false);
      return;
    }
    
    const newTodo = {
      id: todos.length + 1,
      text: newTodoText.trim(),
      completed: false,
      author: 'Added by you',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    
    setTodos([...todos, newTodo]);
    setAddedTodos(addedTodos + 1);
    setNewTodoText('');
    setIsAddingTodo(false);
  };
  
  // Cancel adding new todo
  const cancelAddTodo = () => {
    setIsAddingTodo(false);
    setNewTodoText('');
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.todosText, { fontSize }]}>
        Your health to-dos
      </Text>
      
      <View style={[styles.progressBarContainer, { width: cardWidth }]}>
        <Text style={styles.progressText}>
          {completedTasks}/{todos.length} completed
        </Text>
        
        <View style={[styles.progressBarBackground, { width: cardWidth }]}>
          <Animated.View 
            style={[
              styles.progressBarActive, 
              { width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              }) }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.todosContainer}>
        {todos.map(todo => (
          <TouchableOpacity 
            key={todo.id}
            style={[
              styles.todoCard, 
              { 
                width: cardWidth,
                minHeight: todo.text.length > 40 ? 110 : 90
              }
            ]} 
            onPress={() => toggleTodo(todo.id)}
            activeOpacity={0.7}
          >
            <View style={styles.checkboxContainer}>
              {todo.completed ? (
                <View style={styles.checkedBox}>
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
              ) : (
                <View style={styles.uncheckedBox} />
              )}
            </View>
            <View style={styles.todoTextContainer}>
              <Text 
                style={[
                  styles.todoText, 
                  todo.completed && styles.completedText,
                  { fontWeight: 'bold' }
                ]}
                numberOfLines={0}
              >
                {todo.text}
              </Text>
              
              {todo.author && todo.date && (
                <Text style={styles.todoSubtext}>
                  {todo.author} • {todo.date}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
        
        {isAddingTodo ? (
          <View 
            style={[
              styles.todoCard, 
              styles.addTodoCard,
              { width: cardWidth }
            ]}
          >
            <TextInput
              style={styles.addTodoInput}
              placeholder="Type your new to-do here..."
              value={newTodoText}
              onChangeText={setNewTodoText}
              multiline={true}
              autoFocus={true}
            />
            <View style={styles.addTodoButtons}>
              <TouchableOpacity 
                style={styles.addTodoButton} 
                onPress={cancelAddTodo}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.addTodoButton, 
                  styles.confirmButton,
                  { opacity: newTodoText.trim() ? 1 : 0.5 }
                ]} 
                onPress={submitNewTodo}
                disabled={!newTodoText.trim()}
              >
                <Text style={styles.confirmButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity 
            style={[styles.addButton, { width: cardWidth }]}
            onPress={handleAddTodo}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle" size={24} color={addedTodos >= 2 ? "rgba(200, 200, 200, 1)" : "rgba(153, 153, 153, 1)"} />
            <Text style={[
              styles.addButtonText,
              { color: addedTodos >= 2 ? "rgba(200, 200, 200, 1)" : "rgba(153, 153, 153, 1)" }
            ]}>
              Add to-do {addedTodos >= 2 ? "(limit reached)" : ""}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  todosText: {
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 24,
    letterSpacing: -0.18,
    color: 'rgba(34, 34, 34, 1)',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 30
  },
  progressBarContainer: {
    marginBottom: 35,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  progressText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 14,
    letterSpacing: 0,
    color: 'rgba(112, 112, 112, 1)',
    marginBottom: 4,
  },
  progressBarBackground: {
    height: 15,
    backgroundColor: 'rgba(241, 248, 244, 1)',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: 'rgba(119, 198, 159, 1)',
    borderRadius: 24,
  },
  todosContainer: {
    width: '100%',
    alignItems: 'center',
  },
  todoCard: {
    minHeight: 90,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(236, 236, 236, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingTop: 16,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkboxContainer: {
    marginRight: 16,
    paddingTop: 2,
  },
  uncheckedBox: {
    width: 22.5,
    height: 22.5,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(112, 112, 112, 1)',
  },
  checkedBox: {
    width: 22.5,
    height: 22.5,
    borderRadius: 6,
    backgroundColor: 'rgba(73, 162, 117, 1)',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  todoText: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: 'rgba(34, 34, 34, 1)',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  todoSubtext: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    color: 'rgba(112, 112, 112, 1)',
    marginTop: 2,
  },
  completedText: {
    color: 'rgba(112, 112, 112, 1)',
  },
  addButton: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter',
    color: 'rgba(153, 153, 153, 1)',
  },
  // New styles for adding todos
  addTodoCard: {
    flexDirection: 'column',
    padding: 16,
  },
  addTodoInput: {
    fontFamily: 'Inter',
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(236, 236, 236, 1)',
    paddingBottom: 10,
  },
  addTodoButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  addTodoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButtonText: {
    color: 'rgba(112, 112, 112, 1)',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: 'rgba(73, 162, 117, 1)',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ToDosSection;