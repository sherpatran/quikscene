import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Friends from '../Screens/FriendScreen/Friends';
import Global from '../Screens/GlobalScreen/Global';

const Tab = createMaterialTopTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Friends" component={Friends} />
      <Tab.Screen name="Global" component={Global} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
