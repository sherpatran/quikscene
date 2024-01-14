import { View, Text } from 'react-native'
import { React, useState } from 'react'
import { GoogleMap, APIProvider, Map, AdvancedMarker, Pin, InfoWindow, LoadScript } from '@vis.gl/react-google-maps'
import Config from 'react-native-config';


const googleAPIKey = Config.GOOGLE_MAPS_API_KEY;
const position = { lat : 34.41326781821096, lng : -119.8556770115944 };

const containerStyle = {
    width: '100%', // Adjust the width as needed
    height: '400px' // Adjust the height as needed
  };

const MyMapComponent = () => {
    return (
      <LoadScript
        googleMapsApiKey= {googleAPIKey} // Replace with your API key
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={10}
          mapId="554d8ebda2a80779" // Replace with your custom map ID
        >
            <AdvancedMarker position = {position}>
                <Pin background={"red"} 
                    borderColor={"black"} 
                    glyphColor={"white"}/>
                </AdvancedMarker>
        </GoogleMap>
      </LoadScript>
    );
  };

export default MyMapComponent;
