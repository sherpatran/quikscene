import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './App/Navigations/AppNavigation';
import './App/firebaseConfig'; // Update with the correct path

function App() {
  return (
    <NavigationContainer>
       <AppNavigation />
    </NavigationContainer>
  );
}

export default App;
