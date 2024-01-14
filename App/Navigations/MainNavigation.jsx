import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Friends from '../Screens/FriendScreen/Friends';
import Global from '../Screens/GlobalScreen/Global';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Tab = createMaterialTopTabNavigator();

function MainTabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { 
              paddingTop: hp('10%'), 
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
