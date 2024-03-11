// Import all necessary libraries, screens and components
import { StyleSheet, Text, Animated, View, Image, SafeAreaView, StatusBar } from 'react-native';
import { useEffect } from 'react';
import { loadingscreen } from '../assets';
import { Title } from '../components';

export default function LoadingScreen() {
    const translateY = new Animated.Value(0)
    const animationDuration = 700

    useEffect(() => {
      Animated.loop(
      Animated.sequence([
      Animated.timing(translateY , {
        toValue: 20,
        duration: animationDuration,
        useNativeDriver: true
      }),
      Animated.timing(translateY , {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true
      })
    ])).start()
    },[])
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle={'light-content'}/>
        <View style={styles.container}>
          <Image
              style={styles.backgroundImage}
              source={loadingscreen}/>
        <Animated.View style={{transform: [{translateY}]}}>
          <Title text="Brushy" color="black"/>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex:1, // Take up all of the space
      justifyContent: 'center',
      alignItems: 'center',
    },
    safeArea: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1, // Take up all of the available space
      width: '100%',
      position: 'absolute'
    },
    
  });