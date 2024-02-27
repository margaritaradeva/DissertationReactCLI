// Import all of the necessary libraries, screens and components
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; // Main navigation container and theming
import { SignIn, SignUp, LoadingScreen} from './src/screens'; // Screens
import { TabNavigation } from './src/components/navigation'; // Tab Navigation screen
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack navigator
import { useEffect } from 'react'; // React hooks
import useGlobally from './src/core/global'; // Custom hook for global state management


// Create a stack navigator instance
const Stack =  createNativeStackNavigator();

// Custom theme for the naviagtion container
const AppTheme = {
    ...DefaultTheme,
    colors: {
        background: 'lightblue'
    }
};

// Main App component
export default function App() {
    // State management hooks using the zustand global state ,amagement hook.
    const initialised = useGlobally(state => state.initialised); // Tracks if the app is initialised (otherwise shows loading screen)
    const authenticated = useGlobally(state => state.authenticated); // Tracks if a user is authenticated
    const init = useGlobally(state => state.init); // Function to initialise the app

    // This hook will call the init function when the components mounts:
    // When we log in, sign up, refresh the app it will show that "Loading screen/animation"
    useEffect(() => {
        init(); // Call the function
    },[]); // [] (dependency array) is empty-the effect runs once on component mount
    return (
        // Main navigation for the application
        <NavigationContainer theme={AppTheme}>
            {/* Loading screen when the app is not initialised yet */}
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
                {/* Sign In/Sign Up screeens when a user is not authenticated yet */}
                  <Stack.Screen
                        name="Sign In"
                        component={SignIn}
                        options={{headerShown:false}}
                        />
                  <Stack.Screen
                        name='Sign Up'
                        component={SignUp}
                        options={{headerShown:false}}/>
                </> 
                ) : (
                <>
                {/* When a user authenticates-navigate to the main screen of the application */}
                   <Stack.Screen
                        name="HomeScreen"
                        component={TabNavigation}
                        options={{headerShown:false}}/>

                    </>
                )}
               
            </Stack.Navigator>

        </NavigationContainer>


    );



}
