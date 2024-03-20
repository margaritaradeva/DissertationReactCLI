import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Icons
import { MotiView } from 'moti';
import { api } from "../core";


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


export default function Pin() {
    const [pin, setPin] = useState([])
    const [firstPin, setFirstPin] = useState(null)
    const [confirmingPin, setConfirmingPin] = useState(false);
    const [loading, setLoading] = useState(true) // used for knowing if the async function has finished execution
    const [message, setMessage] = useState('')
    const [isPinSet, setIsPinSet] = useState(false)
    

    useEffect(() => {
        // When the component renders check of the pin has ever been set before
        checkPinStatus()
        
    },[])
    
    useEffect(() => {
        if (pin.length === pinLength) {
            if (!confirmingPin) {
                setFirstPin(pin)
                setPin([])
                setConfirmingPin(true)
            } else {
                console.log(firstPin,pin)
            }
        }
    })



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

    const handlePress = (item) => {

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
        }
    };

   


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
                animate={{height: isSelected ? pinTextSize : 2, marginBottom: isSelected ? pinTextSize : 0}} />
            })}
        </View>
            <PinPad onPress={handlePress}/>
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
})
