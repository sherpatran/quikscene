// PostComponent.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostComponent = ({ post }) => {
  return (
    <View style={styles.postItem}>
      <View style={styles.topSection}>
        <View style={styles.captionAndUsername}>
          <Text style={styles.caption}>{post.caption}</Text>
          <Text style={styles.username}>{post.username}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: post.photoURL }} style={styles.image} />
      </View>
      <View style={styles.titleAndRating}>
        <Text style={styles.title}>{post.eventTitle}</Text>
        <Text style={styles.rating}>{`Rating: ${post.rating}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  topSection: {
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'space-between', // Space between location and caption/username
  },
  captionAndUsername: {
    flexDirection: 'row', // Align caption and username horizontally
    alignItems: 'center', // Align items vertically
  },
  imageContainer: {
    // Style for image container if needed
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  titleAndRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10, // Space between caption and username
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
  },
  caption: {
    color: '#fff',
  },
  rating: {
    color: '#fff',
  },
});

export default PostComponent;
