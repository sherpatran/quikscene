// PostComponent.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostComponent = ({ post }) => {
  return (
    <View style={styles.postItem}>
      <Text style={styles.username}>{post.username}</Text>
      <Image source={{ uri: post.photoURL }} style={styles.image} />
      <Text style={styles.title}>{post.eventTitle}</Text>
      <Text style={styles.location}>{`Location: ${post.location.latitude}, ${post.location.longitude}`}</Text>
      <Text style={styles.rating}>{`Rating: ${post.rating}`}</Text>
      <Text style={styles.caption}>{post.caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  username: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  location: {
    fontStyle: 'italic',
  },
  rating: {
    // Style for rating
  },
  caption: {
    // Style for caption
  },
});

export default PostComponent;
