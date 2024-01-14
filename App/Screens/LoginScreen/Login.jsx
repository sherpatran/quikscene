import { View, Text, Image, StyleSheet, Button } from 'react-native';
import React from 'react';

export default function Login({ navigation }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={require('./../../../assets/images/login.jpg')}
        style={styles.loginImage}
      />
      <Button 
        title="Go to Main Screen" 
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 100,
    height: 100,
    marginTop: 100,
    borderColor: '#000',
  },
});
