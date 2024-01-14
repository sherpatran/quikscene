import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Rating } from 'react-native-ratings';
import * as Location from 'expo-location';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PostScreen = ({ route, navigation }) => {
  const { photo } = route.params;
  const [caption, setCaption] = useState('');
  const [rating, setRating] = useState(3); // Default rating
  const [eventTitle, setEventTitle] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const handleSubmit = async () => {
    const storage = getStorage();
    const photoRef = ref(storage, `photos/${Date.now()}`);
    const response = await fetch(photo);
    const blob = await response.blob();
  
    const auth = getAuth();
    const currentUser = auth.currentUser; // Get the currently signed-in user
  
    if (!currentUser) {
      Alert.alert("Error", "You must be logged in to post");
      return;
    }
  
    const db = getFirestore();
    const userRef = doc(db, "users", currentUser.uid); // Referencing the 'users' collection and the current user's document
    const userDoc = await getDoc(userRef);
  
    if (!userDoc.exists()) {
      Alert.alert("Error", "User not found");
      return;
    }
  
    const username = userDoc.data().username; // Assuming you have 'username' field in your user document
  
    uploadBytes(photoRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const postsCollection = collection(db, 'posts');
  
        addDoc(postsCollection, {
          caption,
          rating,
          eventTitle,
          photoURL: downloadURL,
          location,
          createdAt: new Date(),
          username, // Include the username in the post
          userId: currentUser.uid // Optionally include the user's UID
        }).then(docRef => {
            console.log("Post created with ID: ", docRef.id);
            // Display confirmation alert
            Alert.alert("Posted", "Your post has been successfully uploaded!", [
              {
                text: "OK",
                onPress: () => navigation.navigate('Friends') // Navigate back to Friends screen
              }
            ]);
          }).catch(error => {
            console.error("Error adding document: ", error);
            Alert.alert("Error", "Failed to add post");
          });
        });
      }).catch(error => {
        console.error("Error uploading image: ", error);
        Alert.alert("Error", "Failed to upload image");
      });
    };
  

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.imagePreview} />
      <TextInput
        style={styles.input}
        placeholder="Caption"
        value={caption}
        onChangeText={setCaption}
      />
      <Rating
        showRating
        onFinishRating={(rating) => setRating(rating)}
        style={styles.rating}
        startingValue={rating}
        imageSize={30}
        minValue={1}
        maxValue={5}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Title (optional)"
        value={eventTitle}
        onChangeText={setEventTitle}
      />
      <Button title="Post" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  rating: {
    paddingVertical: 10,
  },
});

export default PostScreen;
