import { NavigationContainer } from '@react-navigation/native'; // Main navigation container 
import { HomeScreen, SignIn, SignUp, LoadingScreen, Friends, Search, Statistics, Settings } from './src/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

// Create a stack navigator for the signIn/logIn screens
const Stack =  createNativeStackNavigator();



export default function App() {
    const [initialised, setInitialised] = useState(true); // Initial Login animation
    const [authenticated, setAuthenticated] = useState(true); // For authentication
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!initialised ? (
                <>
                  <Stack.Screen
                        name="Loading"
                        component={LoadingScreen}
                        options={{headerShown:false}}/>
                </>
                ) : !authenticated ? (

                <>
                  <Stack.Screen
                        name="Sign In"
                        component={SignIn}
                        options={{headerShown:false}}/>
                  <Stack.Screen
                        name='Sign Up'
                        component={SignUp}
                        options={{headerShown:false}}/>
                </> 
                ) : (
                <>
                   <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{headerShown:false}}/>
                    {/* <Stack.Screen
                        name="Rewards"
                        component={RewardsScreen}
                        options={{headerShown:false}}/>
                    <Stack.Screen
                        name="Parents"
                        component={ParentScreen}
                        options={{headerShown:false}}/> */}

                    </>
                )}
               
            </Stack.Navigator>

        </NavigationContainer>


    );



}
