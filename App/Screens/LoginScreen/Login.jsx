import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as Google from 'expo-google-app-auth';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Navigate to the main screen or do something else
        navigation.navigate('Main'); // Replace 'Main' with your main screen route name
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors here, such as displaying an alert
        Alert.alert("Login Failed", errorMessage);
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        // Your Google config here
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        // Log in with Firebase
        const credential = GoogleAuthProvider.credential(result.idToken, result.accessToken);
        const auth = getAuth();
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            // Signed in with Firebase
            const user = userCredential.user;
            navigation.navigate('Main'); // Navigate to the main screen
          })
          .catch((error) => {
            Alert.alert("Firebase Login Failed", error.message);
          });
      } else {
        // Cancelled or failed
        Alert.alert("Google Login Failed", "Login was cancelled or failed.");
      }
    } catch (error) {
      Alert.alert("Google Login Error", error.message);
    }
  };
  
  // In your component's return statement, add a button for Google Sign-In
  <Button title="Login with Google" onPress={handleGoogleLogin} />

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('SignUp')}
        color="gray" // Optional: change color to distinguish from the main action
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
