import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PostComponent = ({ post }) => {
  const renderStars = (rating) => {
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += '★';
    }
    return stars;
  };

  return (
    <View style={styles.postItem}>
      <View style={styles.titleAndUsername}>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.title}>{post.eventTitle}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: post.photoURL }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </View>
      <View style={styles.CaptionAndRating}>
        <Text style={styles.caption}>{post.caption}</Text>
        {/* Display stars based on rating */}
        <Text style={styles.rating}>{renderStars(post.rating)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: '#000',
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: wp('4%'),
  },
  titleAndUsername: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp('4%'),
  },
  imageContainer: {
    width: '100%',
    height: wp('110%'),
    borderRadius: wp('4%'),
    overflow: 'hidden',
    marginVertical: wp('4%'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  CaptionAndRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp('2%'),
  },
  username: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: wp('4%'), // Adjust the font size as needed
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: wp('5%'), // Adjust the font size as needed
  },
  caption: {
    color: '#fff',
  },
  rating: {
    color: '#FFE500',
  },
});

export default PostComponent;
