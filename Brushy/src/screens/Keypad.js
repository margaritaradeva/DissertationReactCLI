import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Icons

// Keys for the pad
const digits = [1,2,3,4,5,6,7,8,9,'',0, 'del']

// Take the width of the screen
const {width} = Dimensions.get('window')

// Define the size of the digit circles
const circleSize = width * 0.2

// Define the size of the text in the circles
const circleTextSize = circleSize * 0.4

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
    const handlePress = (item) => {
        if (item !== '' && item !== 'del') {
            setPin(prevPin => [...prevPin, item])
            console.log(pin)
        } else if (item === 'del') {
            setPin(prevPin => prevPin.slice(0, prevPin.length - 1 ))
            console.log(pin)
        }

        
    };
    return (
        <View style={styles.container}>
            <Text>Please enter your pin</Text>
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
})
