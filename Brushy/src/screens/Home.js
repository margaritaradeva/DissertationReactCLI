import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Button, Text, Modal, TouchableOpacity, TextInput, Platform, Dimensions } from 'react-native';
import { CountdownTimer } from '../components/common';
import { api, useGlobally } from '../core';
import { bathroom, bathroomZoomedIn } from '../assets/backgrounds';
import { BlurView } from '@react-native-community/blur';
import secure from '../core/secure';

export default function Home() {
  const { dogFullBody, userDetails, getDetails, setDogFullBodyImage } = useGlobally();
  const [showModalStart, setShowModalStart] = useState(false);
  const [value, setValue] = useState('');
  const zoomedInDog = require('../assets/zoomedInDog.png');

  // Object containing images for different levels
  const images = {
    dogFullBody: [
      require('../assets/mini_shop/level1_item.png'),
      require('../assets/mini_shop/level2_item.png'),
      // Add more level images here...
    ],
  };

  // Fetch user details when component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      await getDetails();
    };

    fetchDetails();
  }, []);

  // Update dog image based on user details
  useEffect(() => {
    if (userDetails?.image_id) {
      const photoIndex = userDetails.image_id - 1;
      if (photoIndex >= 0 && photoIndex < images.dogFullBody.length) {
        const dogBodyImage = images.dogFullBody[photoIndex];
        setDogFullBodyImage(dogBodyImage);
        if (userDetails.is_char_name_set === false) {
          setShowModalStart(true);
        }
      }
    }
  }, [userDetails]);

  // Animation setup
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const startAnimationAndTimer = () => {
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

  // Function to set up character name
  async function SetUpName() {
    try {
      const credentials = await secure.get('credentials');
      const response = await api({
        method: 'POST',
        url: '/application/updateCharacterName/',
        data: {
          email: credentials.email,
          new_name: value,
        },
      });
      setShowModalStart(false);
    } catch (error) {
      console.log('error');
    }
  }

  return (
    <View style={styles.container}>
      {/* Display countdown timer */}
      <CountdownTimer seconds={120} startTimer={startAnimationAndTimer} onModalClose={resetAnimation} name={userDetails.character_name ? userDetails.character_name : 'there'} />

      {/* Background images and animations */}
      <View style={styles.backgroundContainer}>
        <Animated.Image source={bathroom} style={[styles.backgroundImage, { opacity: bathroomOpacity }]} />
        <Animated.Image source={bathroomZoomedIn} style={[styles.backgroundImage, { opacity: bathroomZoomedInOpacity }]} />
        <View style={styles.animationContainer}>
          {/* Main dog image */}
          <Animated.Image source={dogFullBody} style={[styles.image, { opacity: bathroomOpacity }]} resizeMode="contain" />
          {/* Zoomed-in dog image */}
          <Animated.Image source={zoomedInDog} style={[styles.image2, styles.absolutePosition, { opacity: bathroomZoomedInOpacity }]} resizeMode="contain" />
        </View>
      </View>

      {/* Modal for setting up character name */}
      <Modal visible={showModalStart} transparent={true} animationType="slide" onRequestClose={() => setShowModalStart(false)}>
        <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.infoText}>Pick a name for your character </Text>
            <View style={styles.modalButton}>
              <TextInput
                placeholder={'Character Name'}
                placeholderTextColor="gray"
                autoCapitalize="none"
                autoComplete="off"
                style={styles.inputText}
                value={value}
                onChangeText={(text) => {
                  setValue(text);
                }}
              />
              <TouchableOpacity style={styles.button} onPress={() => SetUpName()}>
                <Text style={styles.buttonText}>Set my name!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  absolutePosition: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  modalView: {
    margin:10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width:0,
      height:2,
    },
    shadowOpacity:0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex:1,
  },
  modalButton: {
    flexDirection: 'column',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#2E95CA',
    padding: 6,
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'black',

    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1
  },
  buttonText: {
   
      color: '#FFFFFF',
      textShadowColor: '#000000',
      fontSize: 16,
      fontWeight: 'bold'
  
  },
  infoText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: 'black'
  },
  image2: {
    width: 450,
    height: 450,
    marginTop: '44%',
    marginRight: '15%',
  },
  inputText: {
    backgroundColor:'white',
        height: Platform.OS == 'android' ? 40 : 20,
        paddingVertical: 0,
        borderColor: '#acacac',
        borderWidth:1,
        fontSize: 14,
        backgroundColor:'#f2f2f2',
        lineHeight: 14 ,
        color: 'black',
        borderRadius: 16, height:52, width:'100%',
         paddingHorizontal:16,fontSize:16
  }
});
