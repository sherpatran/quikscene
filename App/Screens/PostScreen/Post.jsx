import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PostScreen = ({ route, navigation }) => {
  const { photo } = route.params;
  const [caption, setCaption] = useState('');
  const [rating, setRating] = useState('');
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

    uploadBytes(photoRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const db = getFirestore();
        const postsCollection = collection(db, 'posts');

        addDoc(postsCollection, {
          caption,
          rating,
          eventTitle,
          photoURL: downloadURL,
          location,
          createdAt: new Date(),
        }).then(docRef => {
          console.log("Post created with ID: ", docRef.id);
          navigation.goBack(); // Optionally navigate back or to another screen
        }).catch(error => {
          console.error("Error adding document: ", error);
        });
      });
    }).catch(error => {
      console.error("Error uploading image: ", error);
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
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
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
});

export default PostScreen;
