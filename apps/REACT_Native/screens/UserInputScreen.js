// UserInputScreen.js - Educational component that demonstrates and explains user input concepts
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  Switch, 
  Pressable, 
  Platform, 
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Modal,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const UserInputScreen = ({ navigation, route }) => {
  // SECTION 1: State variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [showStateChanges, setShowStateChanges] = useState(true);
  const [stateChangeLogs, setStateChangeLogs] = useState([]);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [currentCodeExample, setCurrentCodeExample] = useState('');
  const [currentCodeExplanation, setCurrentCodeExplanation] = useState('');
  
  // SECTION 2: Reading Rate Calculator
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [numPages, setNumPages] = useState('');
  const [readingResult, setReadingResult] = useState('');
  
  // SECTION 3: Conditional Rendering Demo
  const [numericalInput, setNumericalInput] = useState('');
  const [showConditionalText, setShowConditionalText] = useState(false);
  
  // References for TextInput fields for focus management
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const bookAuthorInputRef = useRef(null);
  const numPagesInputRef = useRef(null);

  // Function to log state changes with component highlighting
  const logStateChange = (stateName, oldValue, newValue) => {
    if (showStateChanges) {
      const timeStamp = new Date().toLocaleTimeString();
      const newLog = {
        id: Date.now(),
        time: timeStamp,
        message: `useState: set${stateName}("${newValue}") called, changed from "${oldValue}"`,
        stateName: stateName
      };
      setStateChangeLogs(prevLogs => [newLog, ...prevLogs].slice(0, 8));
    }
  };

  // Enhanced state setters with logging
  const updateName = (value) => {
    logStateChange('Name', name, value);
    setName(value);
  };

  const updateEmail = (value) => {
    logStateChange('Email', email, value);
    setEmail(value);
  };

  const updatePassword = (value) => {
    logStateChange('Password', password, value);
    setPassword(value);
  };

  const updateSwitch = (value) => {
    logStateChange('IsEnabled', isEnabled, value);
    setIsEnabled(value);
  };

  const updateBookTitle = (value) => {
    logStateChange('BookTitle', bookTitle, value);
    setBookTitle(value);
  };

  const updateBookAuthor = (value) => {
    logStateChange('BookAuthor', bookAuthor, value);
    setBookAuthor(value);
  };

  const updateNumPages = (value) => {
    logStateChange('NumPages', numPages, value);
    setNumPages(value);
  };

  const updateNumericalInput = (value) => {
    logStateChange('NumericalInput', numericalInput, value);
    setNumericalInput(value);
  };

  // MOUNTING lifecycle with explanatory Alert
  useEffect(() => {
    console.log("UserInputScreen MOUNTING");
    
    // Show component lifecycle information
    Alert.alert(
      "Component Lifecycle: MOUNTING",
      "The useEffect hook with an empty dependency array [] is now running. This is equivalent to componentDidMount in class components.",
      [{ text: "Got it!", style: "default" }]
    );
    
    // Navigation configuration
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => showCodeExampleModal('navigation', 'Navigation in React Native')}
          >
            <FontAwesome name="code" size={24} color="#FF9800" />
          </TouchableOpacity>
          <Button 
            onPress={() => {
              // Show navigation information
              Alert.alert(
                "Navigation Event",
                "navigation.navigate('FlatList Demo', { parameters }) is being called. This passes data to the next screen.",
                [
                  { 
                    text: "View Code", 
                    onPress: () => showCodeExampleModal('navigation', 'Navigation in React Native')
                  },
                  { 
                    text: "Continue", 
                    onPress: () => {
                      // Navigate to FlatList demo with parameters
                      navigation.navigate('FlatList Demo', {
                        from: 'User Input Screen',
                        timestamp: new Date().toLocaleTimeString(),
                        userInputData: submitted ? { name, email, isEnabled } : null
                      });
                    }
                  }
                ]
              );
            }} 
            title="Next" 
            color="#FF9800" 
          />
        </View>
      ),
    });
    
    return () => {
      console.log("UserInputScreen UNMOUNTING");
      // Could show an alert here too but it would be disruptive
    };
  }, [navigation, submitted, name, email, isEnabled]);

  // Random number generator (from documentation example)
  const handleRandomNumber = () => {
    const randomValue = Math.floor(Math.random() * (200 - 5 + 1) + 5);
    logStateChange('RandomNumber', randomNumber, randomValue);
    setRandomNumber(randomValue);
    setMessage(`Your lucky number is: ${randomValue}`);
    
    // Show explanation of what happened
    showCodeExampleModal('randomNumber', 'Random Number Generator');
  };

  // Reading rate calculator (from documentation example)
  const calculateReadingRate = () => {
    if (!bookTitle || !bookAuthor || !numPages) {
      Alert.alert(
        "Validation Error",
        "Please fill in all book details",
        [{ text: "OK" }]
      );
      return;
    }

    const book = {
      title: bookTitle,
      author: bookAuthor,
      numPages: parseInt(numPages)
    };

    const minutes = book.numPages / 3;
    const resultText = `${book.title} by ${book.author} has ${book.numPages} pages and will take ${minutes.toFixed(2)} minutes to read.`;
    logStateChange('ReadingResult', readingResult, resultText);
    setReadingResult(resultText);
    
    // Show explanation of what happened
    showCodeExampleModal('readingRate', 'Reading Rate Calculator');
  };

  // Conditional Rendering Demo
  const checkNumber = () => {
    if (!numericalInput) {
      Alert.alert("Please enter a number");
      return;
    }
    
    const num = parseInt(numericalInput);
    const shouldShow = num > 20;
    logStateChange('ShowConditionalText', showConditionalText, shouldShow);
    setShowConditionalText(shouldShow);
    
    // Show explanation of conditional rendering
    showCodeExampleModal('conditionalRendering', 'Conditional Rendering');
  };

  // Form submission handler
  const handleSubmit = () => {
    Keyboard.dismiss(); // Dismiss keyboard on submit
    if (name && email && password) {
      const submissionMessage = `Form submitted for ${name}`;
      logStateChange('Message', message, submissionMessage);
      setMessage(submissionMessage);
      
      logStateChange('Submitted', submitted, true);
      setSubmitted(true);
      
      // Show form submission code explanation
      showCodeExampleModal('formSubmission', 'Form Submission');
    } else {
      const errorMessage = 'Please fill out all fields';
      logStateChange('Message', message, errorMessage);
      setMessage(errorMessage);
    }
  };

  // Clear form handler
  const handleClear = () => {
    Keyboard.dismiss(); // Dismiss keyboard on clear
    logStateChange('Name', name, '');
    setName('');
    
    logStateChange('Email', email, '');
    setEmail('');
    
    logStateChange('Password', password, '');
    setPassword('');
    
    logStateChange('IsEnabled', isEnabled, false);
    setIsEnabled(false);
    
    logStateChange('Submitted', submitted, false);
    setSubmitted(false);
    
    logStateChange('Message', message, '');
    setMessage('');
    
    // Show form clearing code explanation
    showCodeExampleModal('formClearing', 'Form Clearing');
  };

  // Function to show code examples in modal
  const showCodeExampleModal = (exampleType, title) => {
    let code = '';
    let explanation = '';
    
    switch(exampleType) {
      case 'useState':
        code = `// Creating state variables
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [isEnabled, setIsEnabled] = useState(false);

// Updating state
setName('John Doe');  // Triggers re-render
setEmail('john@example.com');
setIsEnabled(true);`;
        explanation = 'The useState hook returns a state variable and a function to update it. When the update function is called, React re-renders the component with the new state value.';
        break;
        
      case 'randomNumber':
        code = `const handleRandomNumber = () => {
  const randomValue = Math.floor(Math.random() * (200 - 5 + 1) + 5);
  setRandomNumber(randomValue);
  setMessage(\`Your lucky number is: \${randomValue}\`);
};`;
        explanation = 'This function generates a random number between 5 and 200, updates two state variables (randomNumber and message), which triggers a re-render of the component with the new values.';
        break;
        
      case 'readingRate':
        code = `const calculateReadingRate = () => {
  if (!bookTitle || !bookAuthor || !numPages) {
    Alert.alert("Please fill in all book details");
    return;
  }

  const book = {
    title: bookTitle,
    author: bookAuthor,
    numPages: parseInt(numPages)
  };

  const minutes = book.numPages / 3;
  setReadingResult(\`\${book.title} by \${book.author} has \${book.numPages} pages and will take \${minutes.toFixed(2)} minutes to read.\`);
};`;
        explanation = 'This function validates inputs, creates an object with the book details, performs a calculation, and updates state with the result, causing the UI to update.';
        break;
        
      case 'conditionalRendering':
        code = `// Logical AND approach
{showConditionalText && (
  <View>
    <Text>This text only shows when showConditionalText is true</Text>
  </View>
)}

// Ternary operator approach
{showConditionalText 
  ? <Text>Your number is greater than 20</Text>
  : <Text>Your number is less than or equal to 20</Text>
}`;
        explanation = 'React Native supports conditional rendering using JavaScript operators. The logical AND (&&) renders content only when the condition is true. The ternary operator (? :) renders one of two elements based on the condition.';
        break;
        
      case 'navigation':
        code = `// Setting up navigation options
useEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <Button 
        onPress={() => {
          navigation.navigate('FlatList Demo', {
            from: 'User Input Screen',
            timestamp: new Date().toLocaleTimeString(),
            userInputData: { name, email, isEnabled }
          });
        }} 
        title="Next" 
        color="#FF9800" 
      />
    ),
  });
}, [navigation, name, email, isEnabled]);`;
        explanation = 'React Navigation allows you to navigate between screens and pass parameters. The navigation.navigate() method takes the screen name and an optional parameters object that can be accessed in the destination screen using route.params.';
        break;
        
      case 'formSubmission':
        code = `const handleSubmit = () => {
  Keyboard.dismiss(); // Dismiss keyboard on submit
  if (name && email && password) {
    setMessage(\`Form submitted for \${name}\`);
    setSubmitted(true);
  } else {
    setMessage('Please fill out all fields');
  }
};`;
        explanation = 'This function handles form submission by validating inputs, dismissing the keyboard, and updating state variables to reflect the submission status and show a message to the user.';
        break;
        
      case 'formClearing':
        code = `const handleClear = () => {
  Keyboard.dismiss();
  setName('');
  setEmail('');
  setPassword('');
  setIsEnabled(false);
  setSubmitted(false);
  setMessage('');
};`;
        explanation = 'This function resets all form-related state variables to their initial values, effectively clearing the form and resetting the UI state.';
        break;
        
      default:
        code = '// No code example available';
        explanation = 'Example not found.';
    }
    
    setCurrentCodeExample(code);
    setCurrentCodeExplanation(explanation);
    setShowCodeModal(true);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 100}}
        >
          {/* LEARN MODE TOGGLE */}
          <View style={styles.learnModeContainer}>
            <Text style={styles.learnModeText}>
              Show State Changes:
            </Text>
            <Switch
              value={showStateChanges}
              onValueChange={(value) => {
                setShowStateChanges(value);
                Alert.alert(
                  "Learning Feature",
                  value 
                    ? "State change logging is now ON. You'll see how useState works in real-time."
                    : "State change logging is now OFF.",
                  [{ text: "OK" }]
                );
              }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={showStateChanges ? "#2196F3" : "#f4f3f4"}
            />
          </View>

          {/* SECTION 1: BASIC INPUT FORM */}
          <View style={[styles.section, styles.formSection]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Form Inputs Demo</Text>
              <TouchableOpacity 
                onPress={() => showCodeExampleModal('useState', 'useState in React Native')}
                style={styles.codeButton}
              >
                <FontAwesome name="code" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.demoBox}>
              <Text style={styles.label}>
                Name: 
                <Text style={styles.stateMeta}> (state: {name || 'empty'})</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={updateName}
                placeholder="Enter your name"
                onFocus={() => {
                  if (showStateChanges) {
                    Alert.alert(
                      "TextInput Focus",
                      "The onFocus event has fired. The keyboard should now appear.",
                      [{ text: "OK" }]
                    );
                  }
                }}
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current.focus()}
                blurOnSubmit={false}
                clearButtonMode="while-editing"
              />
              
              <Text style={styles.label}>
                Email: 
                <Text style={styles.stateMeta}> (state: {email || 'empty'})</Text>
              </Text>
              <TextInput
                ref={emailInputRef}
                style={styles.input}
                value={email}
                onChangeText={updateEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current.focus()}
                blurOnSubmit={false}
                clearButtonMode="while-editing"
              />
              
              <Text style={styles.label}>
                Password: 
                <Text style={styles.stateMeta}> (state: {password ? '****' : 'empty'})</Text>
              </Text>
              <TextInput
                ref={passwordInputRef}
                style={styles.input}
                value={password}
                onChangeText={updatePassword}
                placeholder="Enter your password"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                clearButtonMode="while-editing"
              />
              
              <View style={styles.switchContainer}>
                <Text style={styles.label}>
                  Enable Feature: 
                  <Text style={styles.stateMeta}> (state: {isEnabled ? 'true' : 'false'})</Text>
                </Text>
                <Switch 
                  value={isEnabled} 
                  onValueChange={updateSwitch}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#2196F3" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
              
              <View style={styles.buttonContainer}>
                <Pressable 
                  style={[styles.customButton, { backgroundColor: '#2196F3' }]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.customButtonText}>Submit Form</Text>
                </Pressable>
                
                <Pressable 
                  style={styles.outlineButton}
                  onPress={handleClear}
                >
                  <Text style={styles.outlineButtonText}>Clear Form</Text>
                </Pressable>
              </View>
              
              {message ? (
                <View style={styles.messageContainer}>
                  <Text style={styles.message}>{message}</Text>
                  {submitted && (
                    <Text style={styles.submittedText}>
                      Form data has been submitted! Check state changes below.
                    </Text>
                  )}
                </View>
              ) : null}
            </View>
          </View>

          {/* SECTION 2: RANDOM NUMBER GENERATOR */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Basic Output Example</Text>
              <TouchableOpacity 
                onPress={() => showCodeExampleModal('randomNumber', 'Random Number Generator')}
                style={styles.codeButton}
              >
                <FontAwesome name="code" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.demoBox}>
              <Text style={styles.description}>
                This demo shows how to update state and display output:
              </Text>
              <Pressable 
                style={[styles.customButton, { backgroundColor: '#4CAF50' }]}
                onPress={handleRandomNumber}
              >
                <Text style={styles.customButtonText}>Generate Random Number</Text>
              </Pressable>
              
              {randomNumber !== null && (
                <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>
                    Your lucky number is: <Text style={styles.highlight}>{randomNumber}</Text>
                  </Text>
                  <Text style={styles.codeExplanation}>
                    ↑ The UI updated because we called setRandomNumber({randomNumber})
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* SECTION 3: READING RATE CALCULATOR */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reading Rate Calculator</Text>
              <TouchableOpacity 
                onPress={() => showCodeExampleModal('readingRate', 'Reading Rate Calculator')}
                style={styles.codeButton}
              >
                <FontAwesome name="code" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.demoBox}>
              <Text style={styles.description}>
                Enter book details to calculate reading time:
              </Text>
              
              <TextInput
                style={styles.input}
                value={bookTitle}
                onChangeText={updateBookTitle}
                placeholder="Enter book title"
                returnKeyType="next"
                onSubmitEditing={() => bookAuthorInputRef.current.focus()}
                blurOnSubmit={false}
                clearButtonMode="while-editing"
              />
              
              <TextInput
                ref={bookAuthorInputRef}
                style={styles.input}
                value={bookAuthor}
                onChangeText={updateBookAuthor}
                placeholder="Enter author name"
                returnKeyType="next"
                onSubmitEditing={() => numPagesInputRef.current.focus()}
                blurOnSubmit={false}
                clearButtonMode="while-editing"
              />
              
              <TextInput
                ref={numPagesInputRef}
                style={styles.input}
                value={numPages}
                onChangeText={updateNumPages}
                placeholder="Enter number of pages"
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={calculateReadingRate}
                clearButtonMode="while-editing"
              />
              
              <Pressable 
                style={[styles.customButton, { backgroundColor: '#FF9800' }]}
                onPress={calculateReadingRate}
              >
                <Text style={styles.customButtonText}>Calculate Reading Time</Text>
              </Pressable>
              
              {readingResult ? (
                <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>{readingResult}</Text>
                  <Text style={styles.codeExplanation}>
                    ↑ Result displayed after state update with setReadingResult()
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* SECTION 4: CONDITIONAL RENDERING DEMO */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Conditional Rendering Demo</Text>
              <TouchableOpacity 
                onPress={() => showCodeExampleModal('conditionalRendering', 'Conditional Rendering')}
                style={styles.codeButton}
              >
                <FontAwesome name="code" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.demoBox}>
              <Text style={styles.description}>
                Enter a number to test conditional rendering:
              </Text>
              
              <TextInput
                style={styles.input}
                value={numericalInput}
                onChangeText={updateNumericalInput}
                placeholder="Enter a number"
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={checkNumber}
                clearButtonMode="while-editing"
              />
              
              <Pressable 
                style={[styles.customButton, { backgroundColor: '#9C27B0' }]}
                onPress={checkNumber}
              >
                <Text style={styles.customButtonText}>Check Number</Text>
              </Pressable>
              
              {/* Conditional rendering using logical AND (&&) operator */}
              <View style={styles.conditionalContainer}>
                <Text style={styles.conditionalLabel}>Using Logical AND (&&):</Text>
                {showConditionalText && (
                  <View style={styles.conditionalResult}>
                    <Text style={styles.conditionalText}>
                      This text only shows when number is greater than 20
                    </Text>
                    <Text style={styles.codeExplanation}>
                      ↑ Rendered with: {'{showConditionalText && (...)'}
                    </Text>
                  </View>
                )}
              </View>
              
              {/* Conditional rendering using ternary operator */}
              <View style={styles.conditionalContainer}>
                <Text style={styles.conditionalLabel}>Using Ternary Operator (?:):</Text>
                {numericalInput ? (
                  <View style={styles.conditionalResult}>
                    {showConditionalText ? (
                      <Text style={[styles.conditionalText, {backgroundColor: '#E1F5FE'}]}>
                        Your number ({numericalInput}) is greater than 20
                      </Text>
                    ) : (
                      <Text style={[styles.conditionalText, {backgroundColor: '#FFEBEE'}]}>
                        Your number ({numericalInput}) is less than or equal to 20
                      </Text>
                    )}
                    <Text style={styles.codeExplanation}>
                      ↑ Rendered with: {'{condition ? <TrueComponent/> : <FalseComponent/>}'}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          {/* SECTION 5: PLATFORM-SPECIFIC STYLING DEMO */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Platform-Specific Styling</Text>
            </View>
            
            <View style={styles.demoBox}>
              <View style={styles.platformContainer}>
                <Text style={styles.description}>
                  Current Platform: <Text style={styles.highlight}>{Platform.OS}</Text>
                </Text>
                
                <View style={styles.platformExample}>
                  <Text style={styles.platformText}>
                    This box has platform-specific styling
                  </Text>
                </View>
                
                <Text style={styles.codeExplanation}>
                  Code: {`{backgroundColor: Platform.OS === 'ios' ? '#E3F2FD' : '#FFECB3'}`}
                </Text>
              </View>
            </View>
          </View>

          {/* STATE CHANGES LOG */}
          {showStateChanges && stateChangeLogs.length > 0 && (
            <View style={styles.stateLogSection}>
              <Text style={styles.stateLogTitle}>Recent State Changes:</Text>
              {stateChangeLogs.map((log) => (
                <View key={log.id} style={styles.logEntry}>
                  <Text style={styles.logTime}>{log.time}</Text>
                  <Text style={styles.logMessage}>{log.message}</Text>
                </View>
              ))}
            </View>
          )}

          {/* CODE EXAMPLE MODAL */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showCodeModal}
            onRequestClose={() => setShowCodeModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{currentCodeExplanation ? 'Code Example: ' + currentCodeExplanation : 'Code Example'}</Text>
                
                <ScrollView style={styles.codeScrollView}>
                  <View style={styles.codeContainer}>
                    <Text style={styles.codeText}>{currentCodeExample}</Text>
                  </View>
                  
                  <Text style={styles.modalExplanation}>{currentCodeExplanation}</Text>
                </ScrollView>
                
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setShowCodeModal(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  formSection: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#FF9800',
    color: 'white',
    padding: 15,
    flex: 1,
  },
  codeButton: {
    backgroundColor: '#FF9800',
    padding: 15,
  },
  demoBox: {
    padding: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  stateMeta: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 4,
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submittedText: {
    marginTop: 5,
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
  },
  customButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  customButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineButton: {
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
    flex: 1,
    marginHorizontal: 5,
  },
  outlineButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  codeExplanation: {
    marginTop: 5,
    fontSize: 14,
    color: '#757575',
    fontStyle: 'italic',
  },
  conditionalContainer: {
    marginTop: 15,
  },
  conditionalLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  conditionalResult: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#f8f8f8',
  },
  conditionalText: {
    fontSize: 16,
    padding: 8,
    borderRadius: 4,
  },
  platformContainer: {
    alignItems: 'center',
  },
  platformExample: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#E3F2FD' : '#FFECB3',
    // Platform-specific shadow
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  platformText: {
    fontSize: 16,
    color: Platform.OS === 'ios' ? '#1976D2' : '#FF8F00',
    fontWeight: '500',
  },
  stateLogSection: {
    margin: 10,
    padding: 15,
    backgroundColor: '#ECEFF1',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#607D8B',
  },
  stateLogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#455A64',
  },
  logEntry: {
    padding: 8,
    marginBottom: 5,
    backgroundColor: '#CFD8DC',
    borderRadius: 4,
  },
  logTime: {
    fontSize: 12,
    color: '#607D8B',
    marginBottom: 2,
  },
  logMessage: {
    fontSize: 14,
    color: '#37474F',
  },
  learnModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#E1F5FE',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  learnModeText: {
    fontSize: 16,
    marginRight: 10,
    color: '#0277BD',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '95%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FF9800',
  },
  codeScrollView: {
    maxHeight: 400,
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 4,
    marginBottom: 15,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#333',
  },
  modalExplanation: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    color: '#555',
  },
  closeButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserInputScreen; 