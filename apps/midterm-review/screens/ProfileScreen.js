// Profile screen implementation demonstrating forms and styling
// (ref: wk04-user-input_and_output.md, wk02-styling.md)
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  Platform,
  Image,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
  // State management for form inputs (ref: wk04-user-input_and_output.md)
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [bio, setBio] = useState('');

  // Platform-specific styling example (ref: react_native_app_summary.md)
  const isIOS = Platform.OS === 'ios';

  // Form submission handler
  const handleSave = () => {
    // Validate inputs
    if (!name.trim() || !email.trim()) {
      alert('Name and email are required!');
      return;
    }
    
    // Save profile (demo alert)
    alert('Profile updated successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/200' }}
          style={styles.profileImage}
        />
        <Text style={styles.imageLabel}>Tap to change profile photo</Text>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#666"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Bio Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Toggle Switches */}
        <View style={styles.toggleGroup}>
          <View style={styles.toggleRow}>
            <Text style={styles.label}>Enable Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#767577", true: "#f4511e" }}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.label}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#767577", true: "#f4511e" }}
            />
          </View>
        </View>

        {/* Save Button */}
        <Pressable 
          style={({pressed}) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

// Comprehensive styling example (ref: wk02-styling.md)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  imageLabel: {
    color: '#666',
    fontSize: 14,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  toggleGroup: {
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
