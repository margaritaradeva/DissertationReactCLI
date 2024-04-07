import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {api, useGlobally} from '../core';
import { backgroundImg, level1 } from "../assets";
import { useEffect, useState } from "react";
import secure from "../core/secure";
import { Title } from "../components";
import Animated, {useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing} from "react-native-reanimated";
import { bathroom } from "../assets";
export default function Shop() {
    
    const setDogFullBodyImage = useGlobally(state => state.setDogFullBodyImage)
    const logo = require('../assets/level2.png')
    const [currentLevel, setCurrentLevel] = useState(5);
    const {dogFullBody, userDetails, getDetails, setImageID} = useGlobally()
    const [check, setCheck]= useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [previewImage, setPreviewImage] = useState(dogFullBody)
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
        getDetails();
        
        setCheck(true)
      }, []);

      useEffect(() => { 
        if (check && userDetails.photo_id){
            const photoIndex = userDetails.image_id - 1
            const dogBodyImage = images.dogFullBody[photoIndex]
            setDogFullBodyImage(dogBodyImage)
            console.log(dogBodyImage)
        }
        
        
      }, [check, userDetails]);
    

    const items = new Array(10).fill(null).map((_, index) => ({
        id: index + 1,
        name: `Level ${index +1}`,
        Level: index + 1,
        logo: images.logo[index],
        image: images.dogFullBody[index],
        isLocked: index + 1 >userDetails.current_level,
    }))
    const handleSelectedItem = (item, id) => {
        console.log('here')
        setSelectedItem({...item, newID: id})
        setPreviewImage(item.image)
        // setDogFullBodyImage(item.image)
        // setImageID({newID: id})
        
    }
    const translateY = useSharedValue(0)
    const animationDuration = 1000

    useEffect(() => {
      translateY.value = withRepeat(
        withSequence(
            withTiming(20, {duration: animationDuration, easing: Easing.linear}),
            withTiming(0, {duration: animationDuration, easing: Easing.linear})
        ),
        -1,
        true
      );
    },[])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value}],
        }
    })
    
    
    return (
        <View style={styles.container}>
            <ScrollView>
                
                
                    <Image
                        source={backgroundImg}
                        style={styles.backgroundImage}
                        
                    />
         
            <Animated.View style={[animatedStyle, {marginTop:'5%', marginBottom:'5%'}]}>
            <Title text="Wardrobe" color="white"/>
        
          </Animated.View>
          <ImageBackground source={bathroom} style={[styles.previewBackground, {borderRadius: 175}]}>
          <Image source={previewImage} style={styles.upperImage}/>
          </ImageBackground>
            <ScrollView contentContainerStyle={styles.itemsContainer}>
            
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.item,
                            item.isLocked && styles.lockedItem,
                            selectedItem && selectedItem.id === item.id && styles.selectedItem
                        ]}
                        onPress={() => handleSelectedItem(item, index + 1)}
                        disabled={item.isLocked}>
                        <Image style={styles.itemImage} source={item.logo} />
                        <Text style={styles.itemName}>{item.name}</Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>
            </ScrollView>
            { selectedItem && (
                <TouchableOpacity
                style={styles.confirmButton}
                    onPress={() => {
                        setDogFullBodyImage(selectedItem.image)
                        setImageID({newID: selectedItem.newID})
                        setPreviewImage(selectedItem.image)
                        setSelectedItem(null)
                    }}>
                    <Text style={styles.confirmButtonText}> Confirm Selection</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        width: 150,
        height: 150,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 75,
        borderWidth: 3,
        borderColor: 'black'
    },
    lockedItem: {
        opacity: 0.5,
    },
    itemImage: {
        width: 100,
        height: 100,
        marginTop: 10,
        resizeMode: 'contain',
    },
    itemName: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    upperImage: {
        width: 250,
        height: 250,
        resizeMode: "contain",
        justifyContent:'center',
        alignSelf: 'center',
    },
    selectedItem: {
        borderColor: 'darkblue',
        borderWidth: 3,
        opacity: 0.3
    },
    backgroundImage: {
        flex: 1, // Take up all of the available space
        width: '100%',
        position: 'absolute'
    },
    confirmButton: {
        backgroundColor: '#2E95CA',
        padding: 12,
        margin: 20,
        borderRadius: 26,
        borderColor: 'black',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        textShadowColor: '#000000',
        fontSize: 23,
        fontWeight: 'bold'
    },
    previewBackground: {
        width: 350,
        height: 350,
        marginTop:30,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'black',
        borderRadius: 175,
        overflow: 'hidden',
        borderWidth:3

    },

})