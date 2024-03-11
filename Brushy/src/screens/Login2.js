// Import all of the necessary libraries, screens and components
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from "react-native-reanimated"
import { useState } from 'react';
import { Switch } from 'react-native-paper'; // For password visibility
import { backgroundImg, logo } from "../assets";
import { CustomButton, Input } from "../components";
import { useGlobally} from '../core'; // Custom components

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [requestError, setRequestError] = useState('');
    const [seePassword, setSeePassword] = useState(false);

    const login = useGlobally(state => state.login); // Login API call

    // function that checks user input before sending an API call
    async function onLogIn() {
        // Clear Previous error
        setRequestError('')
        //Check username
        const noEmail = !email
        if (noEmail) {
            setEmailError('Email is required')
        }
        //check password
        const noPassword = !password
        if (noPassword) {
            setPasswordError('Password is required')
        }
        //break out of this function if there were any issues
        if (noEmail || noPassword) {
            return
        }
        try{
            await login({ email: email, password: password }) 
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setRequestError('Invalid email or password.');
            } else {
                setRequestError('An unexpected error ocurred. Please try again.')
              }
            }
        }
    


    return (
        <SafeAreaView style={{flex:1}}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View style ={styles.container}>
            <StatusBar style="light"/>
            <Image
                style={styles.backgroundImage}
                source={backgroundImg}
            />
            <View style={styles.logoContainer}>
                <Animated.Image
                    entering={FadeInUp.delay(200).duration(2000).springify().damping(3)}
                    style={styles.leftLogo}
                    source={logo}
                />
            </View>
            <View style={styles.formContainer}>
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
                <Animated.View 
                    entering={FadeInDown.duration(2000).springify()}
                    style={styles.forms}>
                        <Input 
                            title="Password"
                            value={password}
                            error={passwordError}
                            setValue={setPassword}
                            setError={setPasswordError}
                            clear={setRequestError}
                            />
                </Animated.View>
                <Animated.View
                    entering={FadeInDown.duration(2000).springify()}
                    style={styles.forms}>
                    { requestError ? (
                        <Text style={styles.errorText}>{requestError}</Text>
                    ) : null}
                    <CustomButton title='Log In' onPress={onLogIn}/>
                </Animated.View>
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
        marginTop: '110%',
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


});