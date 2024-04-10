import {
  Text,
  View,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Easing
} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import {BlurView} from '@react-native-community/blur';
import LottieView from 'lottie-react-native';
import { api, useGlobally } from '../../core';
import secure from '../../core/secure';
import CustomButton from './CustomButton';
import {reward} from '../../assets/animations';
import Sound from 'react-native-sound'
import { backgroundMusic, brushingTeeth } from '../../assets/sounds';
import { TopFrontLeft, TopFront, TopFrontRight, BottomFront, BottomLeft,
BottomRight, BehindTopFront, BehindTopLeft, BehindTopRight, BehindBottomFront, BehindBottomLeft, BehindBottomRight,
TopChewingFront,
TopChewingLeft,
TopChewingRight,
BottomChewingFront,
BottomChewingLeft,
BottomChewingRight} from '../../assets/brushes';
import { startButton, PauseButton, terminateButton, emptyButton, whiteButton } from '../../assets/common';


import Leveling from './LevelUp';


export default function CountdownTimer({seconds, startTimer, onModalClose}) {
  const [timer, setTimer] = useState(seconds);
  const [isActive, setIsActive] = useState(false);
  const [rewardUser, setRewardUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [totalBrushTime, setTotalBrushTime] = useState(0);
  const [requestComplete, setRequestComplete] = useState(null);
  const [showLeveling, setShowLeveling] = useState(false);
  const [shouldUpdateLevel, setShouldUpdateLevel] = useState(false);
  const {userLevel, getUserLevel} = useGlobally();
  const [showTerminateModal, setShowTerminateModal] = useState(false)
  const [showTerminateButton, setShowTerminateButton] = useState(false)
  const backgroundMusicSoundRef = useRef(null);

  const brushingImages = {
    topFrontLeft: TopFrontLeft,
    topFront: TopFront,
    topFrontRight: TopFrontRight,
    bottomFront: BottomFront,
    bottomLeft: BottomLeft,
    bottomRight: BottomRight,
    behindTopFront: BehindTopFront,
    behindTopLeft: BehindTopLeft,
    behindTopRight: BehindTopRight,
    behindBottomFront: BehindBottomFront,
    behindBottomLeft: BehindBottomLeft,
    behindBottomRight: BehindBottomRight,
    topChewingFront: TopChewingFront,
    topChewingLeft: TopChewingLeft,
    topChewingRight: TopChewingRight,
    bottomChewingFront: BottomChewingFront,
    bottomChewingLeft: BottomChewingLeft,
    bottomChewingRight: BottomChewingRight,

  };
 
  const [where, setWhere] = useState('topFront')
  // Animated values for the brushing motions
  const moveAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    // Reset the animation
    moveAnim.setValue(0);
  


    // Define the animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, [where]);

  // Determine the style for the brushing motion
  const brushingStyle = {
    transform: [],
  };

 

  if (where === 'topFront' || where === 'topFrontLeft' || where === 'topFrontRight' || where === 'bottomFront' || where === 'bottomLeft' || where === 'bottomRight' || where === 'behindBottomLeft' || where === 'behindBottomRight' ||
  where === 'bottomChewingLeft' || where === 'bottomChewingRight'){
    brushingStyle.transform.push({
      translateY: moveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10], // Move the brush image sideways
      }),
    });
  }


  if (where === 'topChewingFront' || where === 'topChewingLeft' ||  where === 'topChewingRight'){
    brushingStyle.transform.push({
      translateX: moveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20], // Move the brush image sideways
      }),
    });
  }
  if ( where === 'bottomChewingFront'){
    brushingStyle.transform.push({
      translateX: moveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10], // Move the brush image sideways
      }),
    });
  }
 
  // if (where === 'topFrontLeft'){
  //   brushingStyle.transform.push({
  //     translateX: moveAnim.interpolate({
  //       inputRange: [0, 1],
  //       outputRange: [0, 30], // Move the brush image sideways
  //     }),
  //   });
  // }



  // async function getCurrentSeconds() {
  //   try {
  //     const credentials = await secure.get('credentials');
  //     console.log(credentials.email);
  //     const response = await api({
  //       method: 'POST',
  //       url: '/application/authenticated/',
  //       data: {
  //         email: credentials.email,
  //       },
  //     });
  //     setTotalBrushTime(response.data.total_brush_time);

  //     return response.data.total_brush_time;
  //     // console.log(response.data.total_brush_time)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    if (backgroundMusicSoundRef.current === null) {
      console.log('debug1')
      backgroundMusicSoundRef.current = new Sound(backgroundMusic, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        backgroundMusicSoundRef.current.setVolume(0.5);
        console.log('Sound loaded and volume set'); 
      });
    }
    backgroundMusicSoundRef.current.setVolume(0.5);
    console.log('debug2')
    // Cleanup function to release the sound object
    return () => {
      backgroundMusicSoundRef.current.release();
      
    };
    
  }, []);


  const activate = () => {
    setIsActive(!isActive);
    if (isActive) {
      
      console.log('Attempting to pause music');
      if (backgroundMusicSoundRef.current) {
        backgroundMusicSoundRef.current.pause(() => {
          console.log('Music is paused');
        })
      };
      console.log('whateveere')
      
      setShowTerminateButton(true)
      startAnimation()
    } else {
      
      if (backgroundMusicSoundRef.current) {
        backgroundMusicSoundRef.current.play((success) => {
          if (success) {
            console.log('here')
            
            console.log('Music is playing');
          } else {
            console.log('Failed to play music');
            backgroundMusicSoundRef.current.reset();
          }
        });
      }
      backgroundMusicSoundRef.current.setVolume(0.08);
      setShowTerminateButton(true)
      startTimer();
      startAnimation()
    }
  };

  useEffect(() => {
    if (shouldUpdateLevel) {
      // Reset flag to prevent multiple updates
      setShouldUpdateLevel(false);
      // Now we can update leveling (e.g., by showing Leveling component or calling a function here)
      setShowLeveling(true);
    }
  }, [shouldUpdateLevel]);

  async function getBrushTime() {
    const elapsedTime = seconds - timer;
    console.log('elapsed time', elapsedTime);
    try {
      const credentials = await secure.get('credentials');
      const response = await api({
        method: 'POST',
        url: '/application/update_brushtime/',
        data: {
          email: credentials.email,
          added_time: elapsedTime,
        },
      });
      const updatedTime = response.data.total_brush_time;
      console.log('updated time:', updatedTime);
      setTotalBrushTime(updatedTime);
      setRequestComplete(true);
      setRewardUser(true);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function closeModal() {
    setTimer(seconds);
    setShowModal(false);
    onModalClose();
    setShowLeveling(false)
    setShowTerminateButton(false)
    console.log(showModal);
  }
  useEffect(() => {
    let timerInterval;

    // Should not start the timer if the initial time is 0 seconds

    if (isActive && timer > 0) {
      setShowLeveling(false);
      timerInterval = setInterval(() => {
        setTimer(prevSeconds => prevSeconds - 1);
      }, 1000);
    }
    
    if (timer === 114 && isActive) {
      setWhere('topFrontLeft')
    }
    if (timer === 107 && isActive) {
      setWhere('topFrontRight')
    }
    if (timer === 100 && isActive) {
      setWhere('bottomFront')
    }
    if (timer === 94 && isActive) {
      setWhere('bottomLeft')
    }
    if (timer === 87 && isActive) {
      setWhere('bottomRight')
    }
    if (timer === 80 && isActive) {
      setWhere('behindTopFront')
    }
    if (timer === 74 && isActive) {
      setWhere('behindTopLeft')
    }
    if (timer === 67 && isActive) {
      setWhere('behindTopRight')
    }
    if (timer === 60 && isActive) {
      setWhere('behindBottomFront')
    }
    if (timer === 54 && isActive) {
      setWhere('behindBottomLeft')
    }
    if (timer === 47 && isActive) {
      setWhere('behindBottomRight')
    }
    if (timer === 40 && isActive) {
      setWhere('topChewingFront')
    }
    if (timer === 34 && isActive) {
      setWhere('topChewingLeft')
    }
    if (timer === 27 && isActive) {
      setWhere('topChewingRight')
    }
    if (timer === 20 && isActive) {
      setWhere('bottomChewingFront')
    }
    if (timer === 14 && isActive) {
      setWhere('bottomChewingLeft')
    }
    if (timer === 7 && isActive) {
      setWhere('bottomChewingRight')
    }
    if (timer === 0 && isActive) {
      clearInterval(timerInterval);
        setIsActive(false);
      
      getBrushTime();
      updateStistics()
      setShouldUpdateLevel(true);
      setWhere('topFront')
    }
    return () => clearInterval(timerInterval);
  }, [isActive, timer, shouldUpdateLevel]);

  async function updateStistics() {
    try{

    
    const credentials = await secure.get('credentials')
    const response = await api({
      method: 'POST',
      url: '/application/updateStreak/',
      data: {
        email: credentials.email,
      },
    });
    const response2 = await api({
      method: 'POST',
      url: '/application/updateActivity/',
      data: {
        email: credentials.email,
      },
    });
    console.log(response.data)
    console.log(response2.data)
  } catch (error) {
    console.log('error updating streak')
  }
  }
  useEffect(() => {
        getUserLevel();
  }, []);



  const handleTerminate = () => {
    setIsActive(false); // pause timer
    setShowTerminateModal(true) // show the modal
  }

  const confirmTerminate = () => {
    setShowTerminateModal(false); // close modal
    setTimer(seconds)
    onModalClose()
    setWhere('topFront')
    setShowTerminateButton(false)
  }

  const cancelTerminate = () => {
    setShowTerminateModal(false)
  }

  return (
    <View style={{...styles.timerContainer, ...StyleSheet.absoluteFillObject}}>
         {where === 'topFront' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImage, brushingStyle]}
        resizeMode='contain'
      />  
        )}
        {where === 'topFrontLeft' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageTopLeft, brushingStyle]}
        resizeMode='contain'
      />  
        )}

{where === 'topFrontRight' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageTopRight, brushingStyle]}
        resizeMode='contain'
      />  
        )}
         {where === 'bottomFront' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageBottomFront, brushingStyle]}
        resizeMode='contain'
      />  
        )}
        {where === 'bottomLeft' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageBottomLeft, brushingStyle]}
        resizeMode='contain'
      />  
        )}
        {where === 'bottomRight' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageBottomRight, brushingStyle]}
        resizeMode='contain'
      />  
        )}
        {where === 'behindTopFront' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={styles.brushingImageBehindTopFront}
        resizeMode='contain'
      />  
        )}
        {where === 'behindTopLeft' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={styles.brushingImageBehindTopLeft}
        resizeMode='contain'
      />  
        )}
        {where === 'behindTopRight' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={styles.brushingImageBehindTopRight}
        resizeMode='contain'
      />  
        )}
        {where === 'behindBottomFront' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={styles.brushingImageBehindBottomFront}
        resizeMode='contain'
      />  
        )}
        {where === 'behindBottomLeft' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageBehindBottomLeft, brushingStyle]}
        resizeMode='contain'
      />  
        )}
        {where === 'behindBottomRight' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageBehindBottomRight, brushingStyle]}
        resizeMode='contain'
      />  
        )}
         {where === 'topChewingFront' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageTopChewingFront, brushingStyle]}
        resizeMode='contain'
      />  
        )}
        {where === 'topChewingLeft' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageTopChewingLeft, brushingStyle]}
        resizeMode='contain'
      />  
        )}
         {where === 'topChewingRight' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageTopChewingRight, brushingStyle]}
        resizeMode='contain'
      />  
        )}
         {where === 'bottomChewingFront' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageBottomChewingFront, brushingStyle]}
        resizeMode='contain'
      />  
        )}
        {where === 'bottomChewingLeft' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageBottomChewingLeft, brushingStyle]}
        resizeMode='contain'
      />  
        )}
        {where === 'bottomChewingRight' && isActive && (
          <Animated.Image
        source={brushingImages[where]}
        style={[styles.brushingImageBottomChewingRight, brushingStyle]}
        resizeMode='contain'
      />  
        )}
      <View style={{flexDirection: 'row', marginLeft: '70%'}}>
      {showTerminateButton? 
<>
          <TouchableOpacity onPress={handleTerminate}>
          <Image 
            source={terminateButton}
            style={[styles.buttonImage,{marginLeft:120}]}/>
            </TouchableOpacity>

            <Modal  
            visible={showTerminateModal}
            transparent={true}
            animationType='slide'
            onRequestClose={() => setShowTerminateModal(false)}>
            <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />

        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.infoText}>Are you sure you want to end your session? All of your current progress for this session will be lost.</Text>
            <View style={styles.modalButton}>
              <TouchableOpacity style={styles.button} onPress={confirmTerminate}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={cancelTerminate}>
                <Text style={styles.buttonText}>No. Please resume</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
            </Modal>
            
            
            </>
        : 
        
        <Image 
            source={whiteButton}
            style={[styles.buttonImage,{marginLeft:15}]}/>}    
        <TouchableOpacity onPress={activate}>
          <Image
            source={isActive ? PauseButton : startButton}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        
       
         <ImageBackground
            source={emptyButton}
            resizeMode="cover"
            style={styles.logoContainer}>
          <Text style={styles.userLevelButtonText}>{timer}      seconds</Text>
        </ImageBackground>
        {userLevel ? 
       
        <ImageBackground
            source={emptyButton}
            resizeMode="cover"
            style={styles.logoContainer}>
          <Text style={[styles.userLevelButtonText, {marginTop:10}]}>Level: {userLevel}</Text>
        </ImageBackground>
        
        
        : <Text>Loading</Text>}
        
        {showLeveling?
           
            <Leveling addedSeconds={seconds}/>
        : null}
        
      </View>
      <Modal
        style={{flex: 1, marginTop: '20%', justifyContent: 'center'}}
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {rewardUser ? (
            <>
              <LottieView
                source={reward}
                autoPlay
                style={{width: 200, height: 200}}
                loop={false}
                speed={0.5}
              />
              <Text>Congratulations!</Text>
            </>
          ) : null}
          {requestComplete ? (
           
            <Text>{totalBrushTime} seconds</Text>
          ) : (
            <Text>Loading</Text>
          )}
          <CustomButton title="close" onPress={closeModal} />
        </View>
      </Modal>
      
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '150%',
    marginRight: '60%',
    zIndex: 2, // Make sure the timer is above other elements
  },
  buttonImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginLeft: '0%',
    zIndex: 3
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:3
 
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15
  },
  button: {
    backgroundColor: '#2E95CA',
    padding: 12,
    marginLeft: 20,
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
  logoContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    marginLeft:10,
    marginTop:5,
    alignItems:'center',
    resizeMode: 'contain',
    
  },
  userLevelButtonText: {
    color: '#015B87',
    fontWeight: 'bold',
    textAlign:'center',
    fontSize: 16,
    marginBottom:10
  },
  brushingImage: {
    width: 250,
    height: 250,
    top: -270,
    right: -250,
    position: 'absolute',
    zIndex: 1
  },
  brushingImageTopLeft: {
    width: 250,
    height: 250,
    top:-290,
    right: -60,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageTopRight: {
    width: 250,
    height: 250,
    top:-295,
    right: -285,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBottomFront: {
    width: 250,
    height: 250,
    top:-180,
    right: -245,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBottomLeft: {
    width: 250,
    height: 250,
    top:-180,
    right: -135,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBottomRight: {
    width: 250,
    height: 250,
    top:-180,
    right: -226,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBehindTopFront: {
    width: 270,
    height: 270,
    top:-242,
    right: -210,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBehindTopLeft: {
    width: 270,
    height: 270,
    top:-247,
    right: -165,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBehindTopRight: {
    width: 270,
    height: 270,
    top:-254,
    right: -265,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBehindBottomFront: {
    width: 270,
    height: 270,
    top:-253,
    right: -165,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBehindBottomLeft: {
    width: 270,
    height: 270,
    top:-216,
    right: -154,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBehindBottomRight: {
    width: 270,
    height: 270,
    top:-216,
    right: -209,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageTopChewingFront: {
    width: 270,
    height: 270,
    top:-292,
    right: -260,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageTopChewingLeft: {
    width: 270,
    height: 270,
    top:-284,
    right: -198,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageTopChewingRight: {
    width: 270,
    height: 270,
    top:-282,
    right: -166,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBottomChewingFront: {
    width: 270,
    height: 270,
    top:-223,
    right: -266,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBottomChewingLeft: {
    width: 270,
    height: 270,
    top:-203,
    right: -159,
    zIndex: 1,
    position: 'absolute'
  },
  brushingImageBottomChewingRight: {
    width: 270,
    height: 270,
    top:-203,
    right: -226,
    zIndex: 1,
    position: 'absolute'
  }
});
