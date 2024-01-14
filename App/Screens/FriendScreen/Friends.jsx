import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Friends = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* ... your existing Friends screen layout ... */}

      {/* Post Button */}
      <TouchableOpacity 
        style={styles.postButton} 
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ... your container styles ...
  },
  postButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'blue',
    borderRadius: 30,
    padding: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Friends;
