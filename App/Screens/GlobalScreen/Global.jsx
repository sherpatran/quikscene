import { View, Text } from 'react-native'
import { React, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'
import Config from 'react-native-config';


const googleAPIKey = Config.GOOGLE_MAPS_API_KEY;

export default function Global() {
    const position = { lat : 34.41326781821096, lng : -119.8556770115944 };

  return (
    <View>
        <Text>hi</Text>
    </View>
    // <APIProvider apiKey=googleAPIKey >
    // <div> Google Maps</div>>
    // </APIProvider>
  );
}