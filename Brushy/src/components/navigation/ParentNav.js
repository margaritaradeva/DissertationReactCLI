// IMport all the necessary libraries, screens and components
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack navigator
import { Search, Friends, Statistics, Settings, ParentScreen } from '../../screens'; // Screens
import { profile } from '../../assets'; // Profile Picture
import { Image, StyleSheet } from 'react-native'; 

// Create a stack navigator instance
const ParentStack = createNativeStackNavigator();
export default function ParentNav() {
  return (
    <ParentStack.Navigator>
      {/* Main (First) screen to load is the parents screen. All of the other ones will be displayed in a list*/}
      <ParentStack.Screen name="Parents Settings" component={ParentScreen}
      options={{
        headerLeft: () => (
          <Image
                source={profile}
                style={styles.profilePic}
                resizeMode='contain'/>
        ),
      }}/>
      <ParentStack.Screen name="Add Friends" component={Search} />
      <ParentStack.Screen name="Friends" component={Friends} />
      <ParentStack.Screen name="Statistics" component={Statistics} />
      <ParentStack.Screen name="Settings" component={Settings} />
    </ParentStack.Navigator>
  );
}

const styles = StyleSheet.create({
  profilePic: {
      width: 40,
      height: 40,
      marginRight: 10,
      borderRadius: 26,
  },
});
