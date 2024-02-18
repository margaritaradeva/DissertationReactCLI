import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; // Bottom tabs navigator from Material design
import { Provider } from 'react-native-paper'; // Provide theme context to the react-native -paper components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Icons
import Home from './Home';
import RewardsScreen from './RewardsScreen';
import ParentScreen from './ParentScreen';
// Create the bottom tab navigator (menu) 
// Docs available at https://reactnavigation.org/docs/material-bottom-tab-navigator
const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen() {
  return (
   
    // The provider component will enable theme usage accross all of the screens (components)
    <Provider>
     
        {/* Tab.Navigator - tell the app what the navigation structure of the bottom tabs is */}
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'pink',
          }}>
          {/* Tab.Screen - defines each individual tab item which directs the user to a screen */}
          <Tab.Screen
            name="Homee"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="toothbrush" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Rewards"
            component={RewardsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="star" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Parents"
            component={ParentScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-switch-outline" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
    </Provider>
  );}