// Import all of the necessary libraries, screens and components
import React, { useRef, useState } from "react";
import { StyleSheet, View, Image, Text, Pressable, ScrollView, Dimensions } from "react-native";
import { dog } from '../assets';

// Get the device's screen width so the background can be displayed properly using 100% of the screen
const { width } = Dimensions.get('window');

// Background component that displays the background images within the ScrollView
// It accepts an image prop to determine the background image of a section
const Background = ({ image }) => (
    <View style={[styles.background, {backgroundColor: image}]}/>
);

// CHANGE LATER - For now just a button that implements the logic of ScrollView
const ScrollButton = ({ onPress }) => (
    <View style={styles.buttonWrapper}>
        <Pressable style={styles.pressableButton} onPress={onPress}>
            {({ pressed }) => (
                <Text style={styles.pressableButtonText}>
                    {pressed ? 'Scrolling...' : 'Scroll'}
                </Text>
            )}
        </Pressable>
    </View>
);

// Display the character in the central to the background images
const Character = ({ character }) => (
    <View style={styles.characterWrapper}>
        <Image source={character} style={styles.characterImage} resizeMode='contain'/>
    </View>
);

// Main component of the Rewards Screen which functionality is to move the 
// background images while the dog stays centred. Additionally, a user can scroll manually all the way back,
// but they cannot scroll right further than the position they have currently reached.
const RewardsScreen = () => {

    // Background images that scroll together to create the illusion it is one big image
    const backgroundImages = ['skyblue', 'seagreen', 'sandybrown', 'yellow', 'pink', 'purple', 'green', 'white', 'orange'];
    
    const scrollViewRef = useRef(); // hook to keep a mutable reference to the scrollView to be able to control its position
    const [scrollPosition, setScrollPosition] = useState(0); // hook to manage the current position of ScrollView
    
    // CHANGE LATER TO CHANGE DYNAMICALLY
    const scrollIncrement = 100;
    const scrollByIncrement = () => {
        let newScrollPosition = scrollPosition + scrollIncrement;
        scrollViewRef.current.scrollTo({ x: newScrollPosition, animated:true});
    }
    // Function/Event handler to update the scrol position state based on ScrollView's curremt position
    const handleScrollPosition = (current) => {
        const currentScrollPosition = current.nativeEvent.contentOffset.x;
        setScrollPosition(currentScrollPosition); // Update the scroll position
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScrollPosition}
                scrollEventThrottle={16}
                style={styles.container}
            >
                {/* Render a background  for each image in backgroundImages array (acts as a for function)  */}
                {backgroundImages.map((image, index) => (
                    <Background key={index} image={image} />
                ))}
            </ScrollView>

            {/* DELETE LATER */}
            <ScrollButton onPress={scrollByIncrement} />
            <Character character={dog} />


        </View>
    );
};
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width,
        height: '100%'
    },

    characterImage: {
        width: 100,
        height: 100,
    },
    characterWrapper: {
        // Position the charactre centrally over the ScrollView
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
            { translateX: -50 }, // Center the character horizontally.
            { translateY: -50 }, // Center the character vertically.
          ],
    },
    container: {
        flex: 1,
    },


    // DELETE LATER
    buttonWrapper: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        // Additional styles for button wrapper if needed
    },
    pressableButton: {
        backgroundColor: '#007bff', // Example background color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        // Additional styles for Pressable button
    },
    pressableButtonText: {
        color: '#ffffff', // Example text color
        // Additional text styles
    },

});

export default RewardsScreen;