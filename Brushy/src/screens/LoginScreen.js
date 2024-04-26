// Import all of the necessary libraries, screens, and components
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import Animated, { FadeIn, withTiming, Easing, FadeInDown, FadeInUp, FadeOut, useAnimatedStyle, useSharedValue, withRepeat, withSequence } from "react-native-reanimated"
import { useEffect, useState } from 'react';
import { Switch } from 'react-native-paper'; // For password visibility

import { backgroundImg } from "../assets/backgrounds";
import { logo } from "../assets/common";
import { CustomButton, Input, Title } from "../components/common";
import { useGlobally} from '../core'; // Custom components

// Login screen component
export default function LoginScreen({navigation}) {
    // Shared value for animation
    const translateY = useSharedValue(0)
    const animationDuration = 1000

    // Animation effect for logo
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

    // Animated style for logo
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value}],
        }
    })

    // State variables for email, password, errors, and password visibility
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [requestError, setRequestError] = useState('');
    const [seePassword, setSeePassword] = useState(false);

    // Login function
    const login = useGlobally(state => state.login); // Login API call
    let validationErrors = false
    // Function that checks user input before sending an API call
    async function onLogIn() {
        // Clear previous error
        setRequestError('')
        // Check email
        const noEmail = !email
        if (noEmail) {
            setEmailError('Email is required')
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            validationErrors = true
        }
    }
        // Check password
        const noPassword = !password
        if (noPassword) {
            setPasswordError('Password is required')
        }
        // Break out of this function if there were any issues
        if (noEmail || noPassword || validationErrors) {
            return
        }
        try{
            await login({ email: email, password: password }) 
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setRequestError('Invalid email or password.');
            } else {
                console.log(error)
                setRequestError('An unexpected error ocurred. Please try again.')
              }
            }
        }
    
    // JSX
    return (
        <SafeAreaView style={{flex:1}}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View style ={styles.container}>
            <StatusBar style="light"/>
            {/* Background image */}
            <Image
                style={styles.backgroundImage}
                source={backgroundImg}
            />
            {/* Animated logo */}
            <Animated.View style={[animatedStyle, {marginTop:'5%'}]}>
          <Title text="Brushy" color="white"/>
          <Title text="Login" color="white"/>
          </Animated.View>
            <View style={styles.logoContainer}>
                <Animated.Image
                    entering={FadeInDown.delay(200).duration(500).springify()}
                    style={styles.leftLogo}
                    source={logo}
                />
            </View>
            {/* Form container */}
            <View style={styles.formContainer}>
                {/* Email input */}
                <Animated.View 
                    entering={FadeInDown.duration(2000).springify()}
                    style={styles.forms}>
                        <Input 
                            title="Email"
                            value={email}
                            error={emailError}
                            setValue={setEmail}
                            setError={setEmailError}
                            clear={setRequestError} />
                </Animated.View>
                {/* Password input */}
                <Animated.View 
                    entering={FadeInDown.duration(2000).springify()}
                    style={styles.forms}>
                        <View style={styles.passwordContainer}>
                        <Input 
                            title="Password"
                            value={password}
                            error={passwordError}
                            setValue={setPassword}
                            setError={setPasswordError}
                            clear={setRequestError}
                            secureTextEntry={!seePassword}
                            style={{flex:1}}
                            />
                            {/* Password visibility toggle */}
                            <TouchableOpacity
                                    onPress={() => setSeePassword(!seePassword)}
                                    style={styles.changeButton}>
                                <Text style={styles.hidePasswordText}>
                                    {seePassword ? "Hide" : "Show"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                </Animated.View>
                {/* Error message */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(2000).springify()}
                    style={styles.forms}>
                    { requestError ? (
                        <Text style={styles.errorText}>{requestError}</Text>
                    ) : null}
                    {/* Login button */}
                    <CustomButton title='Log In' onPress={onLogIn}/>
                </Animated.View>
                {/* Sign-up text */}
                <Animated.View 
                    entering={FadeInDown.duration(2000).springify()}
                    style={styles.signUpRow}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                            <Text style={styles.signUpText}>Sign up</Text>
                        </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </SafeAreaView>
    )
}

// Styles for the Login screen
const styles = StyleSheet.create({
    // Main container
    container: {
        flex:1, // Take up all of the space
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF' // White
    },
    backgroundImage: {
        flex: 1, // Take up all of the available space
        width: '100%',
        position: 'absolute'
    },
    logoContainer: {
        flex:1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
    },
    leftLogo: {
        width: 115,
        height: 115,
    },
    formContainer: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width:'100%',
        marginTop: '60%',
    },
    forms: {
        width:'100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    signUpRow: {
        flexDirection: 'row',
    },
    signUpText: {
        color:'#00008b'
    },
    errorText: {
        color: '#ff0000',
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
        marginTop:'3%',
    },
    passwordContainer: {
        flexDirection: 'row',
        position: 'relative'
    },
    changeButton: {
        position:'absolute',
        right: 15,
        top: 25,
        padding: 10
    },
    hidePasswordText: {
        color: '#636363'
    },


});
