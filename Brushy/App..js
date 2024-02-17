import { NavigationContainer } from '@react-navigation/native'; // Main navigation container
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; // Bottom tabs navigator from Material design
import { Provider } from 'react-native-paper'; // Provide theme context to the react-native -paper components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Icons
import { HomeScreen, ParentScreen, RewardsScreen, SignIn, SignUp, LoadingScreen } from './src/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

// Create the bottom tab navigator (menu) 
// Docs available at https://reactnavigation.org/docs/material-bottom-tab-navigator
const Tab = createMaterialBottomTabNavigator();

// Create a stack navigator for the signIn/logIn screens
const Stack =  createNativeStackNavigator();

function AuthenticationStack() {
  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
       name="Sign In"
       component={SignIn}
       options={{headerShown:false}}/>
      <Stack.Screen
      name='Sign Up'
      component={SignUp}
      options={{headerShown:false}}/>
  </Stack.Navigator>
  </NavigationContainer>
  );
}


function MainStack() {
  return (
    // The provider component will enable theme usage accross all of the screens (components)
    <Provider>
      {/* NavigationContainer - main container, necessary to put all tabs working together */}
      <NavigationContainer>
        {/* Tab.Navigator - tell the app what the navigation structure of the bottom tabs is */}
        <Tab.Navigator>
          {/* Tab.Screen - defines each individual tab item which directs the user to a screen */}
          <Tab.Screen
            name="Home"
            component={HomeScreen}
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
      </NavigationContainer>
    </Provider>
  );
}



// Main components of the application 
export default function App() {
  const [authenticated, setAuthenticated] = useState(false); // For authentication
  const [isLoading, setIsLoading] = useState(true); // For initial animation when we open the app

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAuthenticated(false); // Change this based on your actual initialisation logic
    }, 5000); // for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return authenticated ? <MainStack /> : <AuthenticationStack />;
}