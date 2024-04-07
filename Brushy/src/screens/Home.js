import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Button } from 'react-native';
import { CountdownTimer } from '../components';
import { useGlobally } from '../core';
import BrushingAnimation from '../components/Toothbrushing.';


export default function Home() {
  const {dogFullBody, userDetails, getDetails, setImageID, setDogFullBodyImage} = useGlobally()
const zoomedInDog = require('../assets/zoomedInDog.png');
const bathroom = require('../assets/bathroom.png');
const bathroomZoomedIn = require('../assets/background2.png'); // The zoomed-in background image
const [check, setCheck] = useState(false)

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
}

useEffect(() => {
  const fetchDetails = async () => {
    await getDetails();
    
  };

  fetchDetails();
  
}, []);


useEffect(() => {
  // Make sure `userDetails` is not null or undefined and has the `image_id` property
  if (userDetails?.image_id) {
    console.log('User details updated', userDetails.image_id);
    const photoIndex = userDetails.image_id - 1; // Adjust index if necessary
    if (photoIndex >= 0 && photoIndex < images.dogFullBody.length) {
      const dogBodyImage = images.dogFullBody[photoIndex];
      setDogFullBodyImage(dogBodyImage);
      console.log('Image set to:', dogBodyImage);
    }
  }
}, [userDetails]);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Starts at 0

  const startAnimationAndTimer = () => {
    // We will use just one animated value that starts at 0 and goes to 1
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };
  const resetAnimation = () => {
    fadeAnim.setValue(0);
  };
  const bathroomOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const bathroomZoomedInOpacity = fadeAnim;

  return (
    <View style={styles.container}>
      
      <CountdownTimer seconds={30}  startTimer={startAnimationAndTimer} onModalClose={resetAnimation}/>
      <View style={styles.backgroundContainer}>
        <Animated.Image
          source={bathroom}
          style={[styles.backgroundImage, { opacity: bathroomOpacity }]}
        />
        <Animated.Image
          source={bathroomZoomedIn}
          style={[styles.backgroundImage, { opacity: bathroomZoomedInOpacity }]}
        />
        <View style={styles.animationContainer}>
          <Animated.Image
            source={dogFullBody}
            style={[styles.image, { opacity: bathroomOpacity }]}
            resizeMode='contain'
          />
          <Animated.Image
            source={zoomedInDog}
            style={[
              styles.image2,
              styles.absolutePosition,
              { opacity: bathroomZoomedInOpacity },
            ]}
            resizeMode='contain'
          />
          
  <BrushingAnimation step={'topFrontRight'} />

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  animationContainer: {
    // marginBottom: 0,
    // height: 300,
    // width: 300,
    position: 'absolute',
  },
  image: {
    width: 350,
    height: 350,
    marginTop: '58%',
    marginLeft:'12%'
  },
  image2: {
    width: 450,
    height: 450,
    marginTop: '44%',
    marginRight: '15%',
  },
  absolutePosition: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
