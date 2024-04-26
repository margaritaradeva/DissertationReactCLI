// Import necessary React Native and additional libraries
import { View, Text, Image, StyleSheet, StatusBar, Animated } from "react-native";
import { useEffect, useState } from 'react';
import { Switch } from 'react-native-paper'; // Import for additional components like Switch (not used in the provided code but imported)
import { backgroundImg, logo } from "../assets"; // Importing assets, ensure these are correctly located in your project
import { CustomButton, Input, Title } from "../components"; // Import custom components that are assumed to be created separately
import { useGlobally } from '../core'; // Import a custom hook for global state management
import { rewardsScreen } from "../assets/backgrounds"; // Import a specific background image

// Define the RewardsScreen functional component with navigation prop for routing
export default function RewardsScreen({ navigation }) {
    // Destructuring methods and state variables from the global custom hook
    const { userDetails, getDetails, setImageID, dogFullBody, setDogFullBodyImage } = useGlobally();

    // State definitions for managing the animations and dog's position on the screen
    const [imageSize, setImageSize] = useState({ width: 180, height: 180 }); // Initial size of the animated dog image
    const [progressAnim] = useState(new Animated.Value(0)); // Initial state of progress for animations
    const [sizeAnim] = useState(new Animated.ValueXY({ x: 180, y: 180 })); // Animation object for width and height
    const [progress, setProgress] = useState(0); // Progress state to simulate loading or progression
    const [dogPosition, setDogPosition] = useState({ x: '0%', y: '0%' }); // State for the dog's position on the screen

    // Define the images for different levels of the game or application
    const images = {
        dogFullBody: [
            require('../assets/mini_shop/level1_item.png'),
            require('../assets/mini_shop/level2_item.png'),
            require('../assets/mini_shop/level3_item.png'),
            require('../assets/mini_shop/level4_item.png'),
            require('../assets/mini_shop/level5_item.png'),
            require('../assets/mini_shop/level6_item.png'),
            require('../assets/mini_shop/level7_item.png'),
            require('../assets/mini_shop/level8_item.png'),
            require('../assets/mini_shop/level9_item.png'),
            require('../assets/mini_shop/level10_item.png')
        ],
        logo: [
            require('../assets/mini_shop/level1.png'),
            require('../assets/mini_shop/level2.png'),
            require('../assets/mini_shop/level3.png'),
            require('../assets/mini_shop/level4.png'),
            require('../assets/mini_shop/level5.png'),
            require('../assets/mini_shop/level6.png'),
            require('../assets/mini_shop/level7.png'),
            require('../assets/mini_shop/level8.png'),
            require('../assets/mini_shop/level9.png'),
            require('../assets/mini_shop/level10.png'),
        ],
    };

    // Define dog path positions at various points of the screen based on game progress
    const pathPositions = [
        { x: '20%', y: '80%'}, // Start position
        // Incremental positions based on percentage of progress, scaling across the screen from bottom to top
        { x: '40%', y: '70%'}, // 1-5 %
        { x: '50%', y: '68%'}, // 6-10 %
        { x: '55%', y: '61%'}, // 11-15%
        { x: '39%', y: '59%'}, // 16-20%
        { x: '24%', y: '54%'}, // 21-25%
        { x: '26%', y: '47%'}, // 26-30%
        { x: '36%', y: '49%'}, // 31-35%
        { x: '48%', y: '46%'}, // 35-40%
        { x: '48%', y: '43%'}, // 41-45%
        { x: '41%', y: '43%'}, // 45-50%
        { x: '37%', y: '41%'}, // 51-55%
        { x: '37%', y: '34%'}, // 55-60% 
        { x: '44%', y: '32%'}, // 61-65%
        { x: '54%', y: '29%'}, // 66-70%
        { x: '63%', y: '25%'}, // 71-75%
        { x: '52%', y: '25%'}, // 76-80%
        { x: '44%', y: '22%'}, // 81-85%
        { x: '52%', y: '18%'}, // 85-90%
        { x: '56%', y: '13%'}, // 91-95%
        { x: '50%', y: '10%'}, // 96-99%
        { x: '50%', y: '5%'}, // Finish position at 100%
    ];

    // Fetch user details upon component mount and ensure they are updated appropriately
    useEffect(() => {
        const fetchDetails = async () => {
            await getDetails(); // Assuming getDetails fetches and sets userDetails
        };
        fetchDetails();
    }, []);

    // Function to dynamically adjust character size based on game progress
    const changeCharacterSize = (index) => {
        const original = 180; // Original size
        const decreased = index * 8; // Decrease factor based on level
        const newSize = Math.max(original - decreased, 0); // Ensure size does not go negative
        Animated.timing(sizeAnim, {
            toValue: { x: newSize, y: newSize },
            duration: 1000, // Animation lasts 1 second
            useNativeDriver: false, // Disable native driver for direct manipulation
        }).start(); // Start the animation
    };

    // Periodically simulate progress changes with a 1-second interval
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 5;
                return newProgress > 100 ? 0 : newProgress; // Reset after reaching 100
            });
        }, 1000);
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    // Calculate new position for the dog based on current progress
    useEffect(() => {
        const calculatePosition = (progress) => {
            const index = Math.min(Math.floor(progress / 10), pathPositions.length - 1);
            return pathPositions[index];
        };

        const newPosition = calculatePosition(progress);
        setDogPosition(newPosition); // Update the dog's position state
    }, [progress]);

    // Watch for changes in userDetails to update dog image and animate position
    useEffect(() => {
        if (userDetails?.image_id) {
            const photoIndex = userDetails.image_id - 1; // Adjust index if necessary
            if (photoIndex >= 0 && photoIndex < images.dogFullBody.length) {
                const dogBodyImage = images.dogFullBody[photoIndex];
                setDogFullBodyImage(dogBodyImage); // Set new dog image from array
            }
        }
        // Additional code can go here to handle other effects related to userDetails changes
    }, [userDetails]);

    // Animated styles for the dog based on progress and size animations
    const dogPositionStyle = {
        ...styles.dogImage, // Spread in base dog image styles
        left: progressAnim.interpolate({
            inputRange: pathPositions.map((_, index) => index),
            outputRange: pathPositions.map(pos => pos.x)
        }),
        top: progressAnim.interpolate({
            inputRange: pathPositions.map((_, index) => index),
            outputRange: pathPositions.map(pos => pos.y)
        }),
        width: sizeAnim.x, // Animated width
        height: sizeAnim.y, // Animated height
    };

    // Render the component
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.background}>
                <Image
                    style={styles.backgroundImage}
                    source={rewardsScreen}
                />
            </View>
            {dogPosition && dogFullBody && (
                <Animated.Image
                    style={dogPositionStyle}
                    source={dogFullBody}
                />
            )}
        </View>
    );
}

// StyleSheet for the component
const styles = StyleSheet.create({
    container: {
        flex: 1, // Fill the entire screen
        backgroundColor: '#FFFFFF' // Background color white
    },
    backgroundImage: {
        flex: 1, // Fill the entire space of its container
        width: '100%', // Full width
        position: 'absolute' // Positioned absolutely to allow layering
    },
    dogImage: {
        position: 'absolute', // Positioned absolutely to allow precise placement
        resizeMode: 'contain' // Ensure the image is scaled correctly without distortion
    },
    background: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    }
});
