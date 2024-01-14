import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/LoginScreen/Login';
import SignUp from '../Screens/LoginScreen/SignUp';
import MainNavigation from '../Navigations/MainNavigation';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Main" component={MainNavigation} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
