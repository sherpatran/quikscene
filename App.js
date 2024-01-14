import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './App/Navigations/AppNavigation';

function App() {
  return (
    <NavigationContainer>
       <AppNavigation />
    </NavigationContainer>
  );
}

export default App;
