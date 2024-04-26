// Import necessary libraries, screens, and components
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search, Friends, Statistics, Settings, ParentScreen, Pin } from '../../screens';
import { profile } from '../../assets';
import { Image, StyleSheet } from 'react-native'; 
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Create a stack navigator instance
const ParentStack = createNativeStackNavigator();

// Define ParentNav component
export default function ParentNav() {
  return (
    <ParentStack.Navigator>
      {/* Main (First) screen to load is the Pin screen. All other screens will be displayed in a list */}
      <ParentStack.Screen name="Pin" component={Pin} options={{ headerShown: false }} />
      <ParentStack.Screen name="Parents Settings" component={ParentScreen} 
        options={{
          headerLeft: () => (
            <Image
              source={profile}
              style={styles.profilePic}
              resizeMode='contain'
            />
          ),
        }}
      />
      <ParentStack.Screen name="Add Friends" component={Search} />
      <ParentStack.Screen name="Friends" component={Friends} />
      <ParentStack.Screen name="Statistics" component={Statistics} />
      <ParentStack.Screen name="Settings" component={Settings} />
    </ParentStack.Navigator>
  );
}

// Define styles for the component
const styles = StyleSheet.create({
  profilePic: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 26,
  },
});
