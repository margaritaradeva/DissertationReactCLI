import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../../screens/Search';
import Friends from '../../screens/Friends';
import Statistics from '../../screens/Statistics';
import Settings from '../../screens/Settings';
import { ParentScreen } from '../../screens';
import { profile } from '../../assets';
import { Image } from 'react-native';

const ParentStack = createNativeStackNavigator();
export default function ParentNav() {
  return (
    <ParentStack.Navigator>
      <ParentStack.Screen name="Parents Settings" component={ParentScreen}
      options={{
        headerLeft: () => (
          <Image
                source={profile}
                style={{width:40, height:40, marginRight:10, borderRadius:26}}
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

