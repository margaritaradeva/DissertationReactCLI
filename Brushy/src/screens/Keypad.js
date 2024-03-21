import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Icons
import { MotiView } from 'moti';
import { api } from "../core";
import { BlurView } from "@react-native-community/blur";
import { CustomButton } from "../components";
import { Modal, TextInput } from "react-native";


// Keys for the pad
const digits = [1,2,3,4,5,6,7,8,9,'',0, 'del']

// Take the width of the screen
const {width} = Dimensions.get('window')

// Define the size of the digit circles
const circleSize = width * 0.2

// Define the size of the text in the circles
const circleTextSize = circleSize * 0.4

// Define pin length
const pinLength = 6

// Define the size for block of text where the entered pin is displayed
const pinSize = width/2

// Define the size for each little square containing a digit
const pinTextSizeMax = pinSize / pinLength
const pinTextSize = pinTextSizeMax - 10 

function PinPad({onPress}) {
    return <FlatList 
        numColumns={3}
        data={digits}
        style={{flexGrow:0}}
        scrollEnabled={false}
        columnWrapperStyle={{gap: 20}}
        contentContainerStyle={{gap:20}}
        keyExtractor={(_,index) => index.toString()}
        renderItem={ ({item}) => {
            return <TouchableOpacity
            disabled={item===''}
            onPress={() => onPress(item)}>
                <View style={[styles.circles, {borderWidth: (item === '' || item === 'del') ? 0 : 1}]} >
                    {item === 'del'? <MaterialCommunityIcons name="backspace-outline" color={'#000000'} size={circleTextSize}/> :
                        <Text style={styles.circleText}>{item}</Text>}
                </View>
            </TouchableOpacity>
        }}
        />
}


export default function Pin({navigation}) {
    const [showModal, setShowModal] = useState(false);
    const [pin, setPin] = useState([])
    const [firstPin, setFirstPin] = useState(null)
    const [confirmingPin, setConfirmingPin] = useState(false);
    const [loading, setLoading] = useState(true) // used for knowing if the async function has finished execution
    const [message, setMessage] = useState('')
    const [isPinSet, setIsPinSet] = useState(false)
    const [matchedPins, setMatchedPins] = useState(false)
    const [move, setMove] = useState(false)

    const triggerAnimation = () => {
        setMatchedPins(true)
        setTimeout(() => {
            setMatchedPins(false)
            setMessage('Please set up your pin')
        }, 600)
    }
    useEffect(() => {
        // When the component renders check of the pin has ever been set before
        checkPinStatus()
        setPin([])
        setConfirmingPin(false)
    },[])
    
    useEffect(() => {
        if (!isPinSet) {
            if (pin.length === pinLength) {
                if (!confirmingPin) {
                    setFirstPin(pin)
                setPin([])
                setConfirmingPin(true)
            } else {
                const arePinsIdentical = firstPin.length === pin.length && firstPin.every((element, index) => element === pin[index])
                if (!arePinsIdentical) {
                    // shake the numbers left and right do show they werent identical
                    // Prompt users to make enter both pins again
                    setMessage('Pins do not match')
                    triggerAnimation()
                    setTimeout(() => {
                        setPin([])
                        setFirstPin(null)
                        setConfirmingPin(false)
                    },600)
                } else {
                    const pinString = firstPin.join('')
                    console.log(pinString)
                    setUpPin(pinString)
                }
            }
        }
    } else {
        if (pin.length === pinLength) {
            const pinString = pin.join('')
            console.log(pinString)
            checkPin(pinString)
        }

    }
    }, [pin])


    useEffect (() => {
        if (move) {
            setMessage('Please enter your pin')
          setPin([])
          setMove(false)
          setMessage('Please enter your pin')
        navigation.navigate("Parents Settings")  
        }
        

    }, [move])


    useEffect (() => {
        if (confirmingPin) {
            setMessage('Please confirm your pin')
        } else if (isPinSet) {
            setMessage('Please enter your pin');
        } else {
            setMessage('Please set up your pin');
        }
    },[confirmingPin, isPinSet])

    async function checkPinStatus() {
        try{
            const response = await api.get('/application/isPinSet/')
            setIsPinSet(response.data.is_pin_set)
            setLoading(false)
        }catch (error) {
            console.error("errorrrrr", error)
        }
        setLoading(false)
        
       
    }
    async function setUpPin(pinToSet) {
        try{
            const response = await api({
                method: 'POST',
                url: '/application/setPin/',
                data: {
                  "parent_pin":pinToSet
                }
          
              })
              
              setPin([])
            setMessage('Please enter your pin')
            setMove(true)
            setConfirmingPin(false)
            } catch (error){
                console.log(error)
    
    
              }
    }
    async function forgotPin() {
        setIsPinSet(false)
    }

    async function checkPin(pinToCheck) {
        try{
        const response = await api({
            method: 'POST',
            url: '/application/checkPin/',
            data: {
                "parent_pin":pinToCheck
            }
        })
        if (response.status === 200) {
            console.log('yay')
            setPin([])
            setMessage('Please enter your pin')
            setMove(true)
            
        } 
        } catch (error) {
            console.log(error)
            setMessage('Pin is incorrect')
            triggerAnimation()
                    setTimeout(() => {
                        setPin([])
                    },600)
        }
    }


    const handlePress = (item) => {
        if (!isPinSet){
        if (item !== '' && item !== 'del') {
           if (!confirmingPin && pin.length < pinLength){
            setPin(prevPin => [...prevPin, item])
           } else if (confirmingPin && pin.length < pinLength) {
            setPin(prevPin => [...prevPin, item])
           }
           
        } else if (item === 'del') {
            setPin(prevPin => {
            const newPin = prevPin.slice(0, prevPin.length - 1 )
            console.log(newPin)
            return newPin})
        }}else {
            if (item !== '' && item !== 'del') {
                if (pin.length <pinLength){
                    setPin(prevPin => [...prevPin, item])
                } 
            }else if (item = 'del') {
                setPin(prevPin => {
                    const newPin = prevPin.slice(0, prevPin.length - 1)
                    return newPin
                })
            }
        }
    };

   
    async function closeModal  () {
        
    setShowModal(false)
    
}

   function showModalOnScreen (){
    setShowModal(true)
   }


    return (
       
        <View style={styles.container}>
            {loading? (
                <Text style={styles.messageText}>Loading</Text>
            ) :(
                <View style={styles.message}>
                    <Text style={styles.messageText}>
                        {message}
                    </Text>
                    </View>
                )}
               
            <View style={styles.onRow}>
            {[...Array(pinLength).keys()].map( i => {
                const isSelected =  i < pin.length;
                return <MotiView 
                key = {`pin-${i}`}
                style ={styles.pinArray}
                transition={{type:'timing',duration:100}}
                animate={{height: isSelected ? pinTextSize : 2, marginBottom: isSelected ? pinTextSize : 0, translateX: matchedPins ? [0, -20, 20, -20, 20, 0] : 0,}} />
            })}
        </View>
            <PinPad onPress={handlePress}/>
            <View style={styles.onRowForgotPin}>
            <Text>Forgot your Pin?</Text>
             <TouchableOpacity>
                <Text style={styles.forgotPin} onPress={showModalOnScreen}> Reset</Text>
                 </TouchableOpacity></View>



                 <Modal  animationType="slide" transparent={true} visible={showModal} onRequestClose={()=> setShowModal(false)}>
            <BlurView 
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={100}
                reducedTransparencyFallbackColor="white"/>
           <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
           <TextInput placeholder="email"/>
           <TextInput placeholder="password"/>
       
            <CustomButton title="close" onPress={closeModal}/></View>
          </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    // Main container
    container: {
        flex:1, // Take up all of the space
        justifyContent: 'center',
        alignItems: 'center',
    },
    circles: {
        width:circleSize, 
        height:circleSize,
        borderRadius:circleSize,
        borderColor:'black',
        alignItems:'center',
        justifyContent: 'center',
    },
    circleText: {
        fontSize:circleTextSize,
    },
    pinArray: {
        width: pinTextSize,
        borderRadius: pinTextSize,
        backgroundColor:'red',
    },
    onRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 40,
        // backgroundColor: 'green',
        height: pinTextSize*2,
        alignItems: 'flex-end'
    },
    message: {
        marginBottom:20,
    },
    messageText: {
        fontSize: 20,
        color: '#000000'
    },
    forgotPin: {
        color:'#00008b',
    },
    onRowForgotPin: {
        flexDirection: 'row',
        marginTop: 20,
    },
})
