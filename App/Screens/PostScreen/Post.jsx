import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Rating } from 'react-native-ratings';
import * as Location from 'expo-location';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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

  const handleRetakePhoto = () => {
    navigation.goBack(); // Assuming the camera screen is the previous screen
  };

  const handleCancelPost = () => {
    navigation.navigate('Friends'); // Navigate to the Friends screen
  };

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
      // Check if location is not available
    if (!location || isNaN(location.latitude) || isNaN(location.longitude)) {
      Alert.alert("Error", "Location is required to post");
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.imagePreview} />
  
        {/* Event Title Input */}
        <TextInput
          style={styles.input}
          placeholder="Event Title (optional)"
          placeholderTextColor="white" // Adjust for better visibility
          value={eventTitle}
          onChangeText={setEventTitle}
        />
  
        {/* Caption Input */}
        <TextInput
          style={styles.input}
          placeholder="Caption"
          placeholderTextColor="white" // Adjust for better visibility
          value={caption}
          onChangeText={setCaption}
        />
  
        {/* Rating Component */}
        <Rating
          onFinishRating={(rating) => setRating(rating)}
          style={styles.rating}
          startingValue={rating}
          imageSize={30}
          minValue={1}
          maxValue={5}
          tintColor="#000"
        />
  
        <Button title="Post" onPress={handleSubmit} />
  
        <View style={styles.buttonContainer}>
          <Button title="Retake Photo" onPress={handleRetakePhoto} />
          <Button title="Cancel" onPress={handleCancelPost} color="red" /> 
        </View>
      </View>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: wp('5%'),
      backgroundColor: '#000', // Set the background color to black
    },
    imagePreview: {
      width: wp('90%'), // Set the width to 90% of the screen width
      height: wp('90%') * 1.1, // Height is 110% of the width
      marginBottom: hp('2%'),
      resizeMode: 'contain', // Ensure the entire image is shown, may add letterboxing
    },
    input: {
      width: wp('90%'),
      padding: wp('2.5%'),
      marginVertical: hp('1%'),
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      color: 'white', // Set text color to white
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: Set input background color
    },
    rating: {
      paddingVertical: hp('1%'),
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: wp('100%'),
      marginTop: hp('2%'),
    },
  });
  

export default PostScreen;
