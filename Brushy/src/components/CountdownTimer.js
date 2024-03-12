import { Text, View, StyleSheet } from "react-native"
import { useState, useEffect } from "react"
import CustomButton from "./CustomButton";



export default function CountdownTimer ({seconds}) {
    const [timer, setTimer] = useState(seconds);
    const [isActive, setIsActive] = useState(false); 

    const activate = () => {
        setIsActive(!isActive)
    }
    

    useEffect (() => {
        let timerInterval;

        // Should not start the timer if the initial time is 0 seconds

        if (isActive && timer >0) {
        timerInterval = setInterval(() => {
            setTimer((prevSeconds) => prevSeconds - 1);
        }, 1000);
    }
    if (timer === 0) {
        clearInterval(timerInterval)
        setIsActive(false)
    }
        return () => clearInterval(timerInterval)
    },[isActive, timer])


    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <CustomButton title="start" onPress={activate}/>
            <Text style={{fontSize:46}}>{timer}</Text>
        </View>
        )
}