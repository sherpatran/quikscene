import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import the functions to interact with Firestore

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState(''); // Add state for username

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        if (!username.trim()) {
            Alert.alert("Error", "Username cannot be empty");
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up, now save the username in Firestore
                const user = userCredential.user;
                const db = getFirestore();
                // Create a document in the 'users' collection with the UID as the document key
                setDoc(doc(db, 'users', user.uid), {
                    username: username,
                    email: email,
                    // Add any additional fields you want to store for the user
                }).then(() => {
                    // After setting the document, navigate to the main screen
                    navigation.navigate('Main'); // Replace 'Main' with your main screen's name
                }).catch((error) => {
                    console.error("Error saving user information: ", error);
                    Alert.alert("Registration Error", "Failed to save user information");
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Registration Failed", errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername} // Update the setUsername state
                autoCapitalize="none"
            />
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
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button
                title="Already have an account? Login"
                onPress={() => navigation.navigate('Login')}
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
