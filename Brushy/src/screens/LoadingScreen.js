// Import necessary libraries, screens, and components
import React, { useEffect } from 'react';
import { StyleSheet, Text, Animated, View, Image, SafeAreaView, StatusBar } from 'react-native';
import { loadingscreen } from '../assets/backgrounds';
import { Title } from '../components/common';

export default function LoadingScreen() {
  // Initialize animated value for translateY animation
  const translateY = new Animated.Value(0);
  const animationDuration = 700; // Duration for each animation step

  useEffect(() => {
    // Start animation loop
    Animated.loop(
      // Sequence of translateY animations
      Animated.sequence([
        // Move view downwards
        Animated.timing(translateY, {
          toValue: 20, // Move down by 20 units
          duration: animationDuration,
          useNativeDriver: true, // Optimize animation performance
        }),
        // Move view upwards (back to original position)
        Animated.timing(translateY, {
          toValue: 0, // Move up to original position
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ])
    ).start(); // Start the animation loop
  }, []); // Run effect only on component mount

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        {/* Background image */}
        <Image style={styles.backgroundImage} source={loadingscreen} />
        {/* Animated view containing the title */}
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Title text="Brushy" color="black" />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up all available space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  safeArea: {
    flex: 1, // Take up all available space
  },
  backgroundImage: {
    flex: 1, // Take up all available space
    width: '100%', // Stretch image to cover entire width
    position: 'absolute', // Position image behind other content
  },
});
