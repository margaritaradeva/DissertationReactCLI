// Import all of the necessary libraries, screens and components
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { useEffect, useState } from 'react';
import { Switch } from 'react-native-paper'; // For password visibility
import { backgroundImg, logo } from "../assets";
import { CustomButton, Input, Title } from "../components";
import { useGlobally} from '../core'; // Custom components
import { Animated } from "react-native";

export default function RewardsScreen({navigation}) {
    const { userDetails, getDetails, setImageID, dogFullBody, setDogFullBodyImage} = useGlobally()
    // const [dogFullBodyLocal, setDogFullBodyLocal] = useState({source: null, width: 180, height: 180});
    
    const [imageSize, setImageSize] = useState({ width: 180, height: 180 });
    const [progressAnim] = useState(new Animated.Value(0))
    const [sizeAnim] = useState(new Animated.ValueXY({ x: 180, y: 180 }));
    const [progress, setProgress] = useState(0); // Simulate progress updates
    const [dogPosition, setDogPosition] = useState({ x: '0%', y: '0%' });

    
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
    const pathPositions = [
        { x: '20%', y: '80%'}, // 0%
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
        { x: '50%', y: '5%'}, // 100%
    ]

    const getPositionOfDog = (percentage) => {
        let index = 0
        if (percentage === 0) {
            index = 0
        } else if (percentage < 100) {
            index = Math.floor((percentage-1)/5) + 1
            console.log(index)
        } else {
            index = pathPositions.length - 1
        }
        
        
        return pathPositions[index]
    }
    useEffect(() => {
        const fetchDetails = async () => {
          await getDetails();
          
        };
      
        fetchDetails();
        
      }, []);
      
    const changeCharacterSize = (index) => {
        const original = 180
        const decreased = index * 8
        const newSize = Math.max(original - decreased, 0)
        Animated.timing(sizeAnim, {
            toValue: {x :newSize, y: newSize},
             duration: 1000,
            useNativeDriver: false,
        }).start()
        
    }

    useEffect(() => {
        // Simulate progress change
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 5;
                return newProgress > 100 ? 0 : newProgress;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // This function calculates the position based on the progress
        const calculatePosition = (progress) => {
            const index = Math.min(Math.floor(progress / 10), pathPositions.length - 1);
            return pathPositions[index];
        };

        const newPosition = calculatePosition(progress);
        setDogPosition(newPosition);
    }, [progress]);

    
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
        console.log('current xp,', userDetails.current_level_xp)
        if (userDetails.current_level_xp > 0){
            console.log('current xp, MAX XP', userDetails.current_level_xp, userDetails.current_level_max_xp)
            //const percentage = (userDetails.current_level_xp / userDetails.current_level_max_xp) * 100
            const percentage = 35
            console.log('per',percentage)
            const size = changeCharacterSize(Math.floor(percentage/10))
            animateDogPosition(percentage)
            //
            
            setDogPosition(getPositionOfDog(0))
            // // 
            
            setImageSize(size)
            // console.log('dddd',imageSize)
            // setDogFullBodyLocal({
            //     source: images.dogFullBody[userDetails.image_id - 1],
            //     width: size,
            //     height: size
            // })
        } else if (userDetails.current_level_xp === 0){
            const percentage = 0
            animateDogPosition(percentage)
            // const size = changeCharacterSize(percentage)
            // setDogPosition(getPositionOfDog(percentage))
            // setImageSize(size)
        }

      }, [userDetails]);

      const animateDogPosition = (percentage) => {

        

        let targetIndex = 0

        if (percentage === 0) {
            index = 0
        } else if (percentage < 100) {
            targetIndex = Math.floor((percentage-1)/5) + 1
            console.log(targetIndex)
        } else {
            targetIndex = pathPositions.length - 1
        }
        Animated.timing(progressAnim, {
            toValue: targetIndex,
            duration:3000,
            useNativeDriver: false
        }).start()
      }

      const dogPositionStyle = {
        ...styles.dogImage,
        left: progressAnim.interpolate({
            inputRange: pathPositions.map((_, index)=> index),
            outputRange: pathPositions.map(pos => pos.x)
        }),
        top: progressAnim.interpolate({
            inputRange: pathPositions.map((_,index)=>index),
            outputRange: pathPositions.map(pos=>pos.y)
        }),
        width: sizeAnim.x, 
        height: sizeAnim.y,
      }

      
    
    return (
     
        <View style ={styles.container}>
            <StatusBar style="light"/>
            <View style={styles.background}>
            <Image
                style={styles.backgroundImage}
                source={require('../assets/rewards.png')}
            /></View>
            {dogPosition && dogFullBody  && (
            <Animated.Image 
                style={dogPositionStyle}
                source={dogFullBody}/>)}
            </View>
       
    )
                    }
                

const styles = StyleSheet.create({
    // Main container
    container: {
        flex:1, // Take up all of the space
        backgroundColor: '#FFFFFF' // White
    },
    backgroundImage: {
        flex: 1, // Take up all of the available space
        width: '100%',
        position: 'absolute'
    },
    dogImage: {
        position: 'absolute',
        resizeMode: 'contain'
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
    


});