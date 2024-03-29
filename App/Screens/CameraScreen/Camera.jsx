import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';

const { width: screenWidth } = Dimensions.get('window');
const aspectRatio = 1.1; // 110% of the screen width

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      // Navigate to Post Screen with the image data
      navigation.navigate('Post', { photo: data.uri });
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <Camera style={styles.preview} type={Camera.Constants.Type.back} ref={cameraRef}>
          <View style={styles.captureContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.capture}>
              <Text style={styles.captureText}>SNAP</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraWrapper: {
    width: '100%', // Full screen width
    aspectRatio: aspectRatio,
    overflow: 'hidden', // This will crop the camera preview
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    fontSize: 14,
    color: 'black',
  },
});

export default CameraScreen;
