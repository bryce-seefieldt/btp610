/*
Wk 04 example implementation includes:
1. Basic output with state variables  
2. Reading rate calculator with styled output
3. User input handling with TextInput and Switch
4. Platform-specific styling
5. Detailed comments referencing the documentation
6. Organized sections for each concept
7. Error handling for input validation
8. Styled components with proper spacing and borders
*/

import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  Pressable, 
  TextInput, 
  Switch, 
  Platform 
} from 'react-native';
import { useState } from "react";

export default function App() {
  // State variables for basic output (Ref: lines 40-51)
  const [message, setMessage] = useState("Welcome! Press a button to begin");
  
  // State variables for reading rate calculator (Ref: lines 409-417)
  const [bookResult, setBookResult] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [numPages, setNumPages] = useState("");
  
  // State variables for user input (Ref: lines 583-599)
  const [nameInput, setNameInput] = useState("");
  
  // State variable for switch (Ref: lines 627-641)
  const [airplaneMode, setAirplaneMode] = useState(false);

  // Button handler for random number (Ref: lines 397-404)
  const handleRandomNumber = () => {
    const randomValue = Math.floor(Math.random() * (200 - 5 + 1) + 5);
    setMessage(`Your lucky number is: ${randomValue}`);
  };

  // Button handler for reading rate (Ref: lines 432-446)
  const calculateReadingRate = () => {
    if (!bookTitle || !bookAuthor || !numPages) {
      setBookResult("Please fill in all book details");
      return;
    }

    const book = {
      title: bookTitle,
      author: bookAuthor,
      numPages: parseInt(numPages)
    };

    const minutes = book.numPages / 3;
    setBookResult(
      <Text>
        <Text style={styles.highlight}>{book.title}</Text> by{' '}
        <Text style={styles.highlight}>{book.author}</Text> has{' '}
        <Text style={styles.highlight}>{book.numPages}</Text> pages and will take an estimated{' '}
        <Text style={styles.highlight}>{minutes.toFixed(2)}</Text> minutes to complete.
      </Text>
    );
  };

  // Button handler for user input (Ref: lines 734-740)
  const handleUserInput = () => {
    alert(`Hello ${nameInput}. Airplane mode on? ${airplaneMode}`);
    setNameInput("");
    setAirplaneMode(false);
  };

  return (
    // Container with platform-specific styling (Ref: lines 934-937)
    <View style={[
      styles.container, 
      { backgroundColor: Platform.OS === "ios" ? "#f8f9fa" : "#ffffff" }
    ]}>
      {/* Basic Output Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Basic Output Example</Text>
        <Button 
          title="Generate Random Number" 
          onPress={handleRandomNumber}
        />
        <Text style={styles.text}>{message}</Text>
      </View>

      {/* Reading Rate Calculator Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Reading Rate Calculator</Text>
        <TextInput
          style={styles.input}
          value={bookTitle}
          onChangeText={setBookTitle}
          placeholder="Enter book title"
        />
        <TextInput
          style={styles.input}
          value={bookAuthor}
          onChangeText={setBookAuthor}
          placeholder="Enter author name"
        />
        <TextInput
          style={styles.input}
          value={numPages}
          onChangeText={setNumPages}
          placeholder="Enter number of pages"
          keyboardType="numeric"
        />
        <Button 
          title="Calculate Reading Time" 
          onPress={calculateReadingRate}
        />
        <Text style={styles.text}>{bookResult}</Text>
      </View>

      {/* User Input Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>User Input Example</Text>
        <TextInput
          style={styles.input}
          value={nameInput}
          onChangeText={setNameInput}
          placeholder="Enter your name"
        />
        <View style={styles.switchContainer}>
          <Text>Airplane Mode:</Text>
          <Switch 
            value={airplaneMode} 
            onValueChange={setAirplaneMode}
          />
        </View>
        <Button 
          title="Submit" 
          onPress={handleUserInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // Platform-specific top margin (Ref: lines 993-994)
    marginTop: Platform.OS === "ios" ? 50 : 20,
  },
  section: {
    marginBottom: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  highlight: {
    backgroundColor: 'yellow',
    color: 'blue',
  },
});
