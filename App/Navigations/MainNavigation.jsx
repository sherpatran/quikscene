import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Friends from '../Screens/FriendScreen/Friends';
import Global from '../Screens/GlobalScreen/Global';
import CustomTabBar from '../components/CustomTabBar'; // Import the custom tab bar component

const Tab = createMaterialTopTabNavigator();

function MainTabNavigator() {
    return (
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />} // Use the custom tab bar
        screenOptions={{
          tabBarStyle: { 
              backgroundColor: 'black', // Set the background color to black
          },
          tabBarLabelStyle: {
              color: 'white', // Set the text color to white for visibility
          },
          tabBarIndicatorStyle: {
              backgroundColor: 'white', // Set the indicator line color to white
          },
          // ... other style options ...
        }}
      >
        <Tab.Screen name="Friends" component={Friends} />
        <Tab.Screen name="Global" component={Global} />
      </Tab.Navigator>
    );
}

export default MainTabNavigator;
