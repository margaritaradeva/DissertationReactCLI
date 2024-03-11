import { View, Text, Button, Image, StyleSheet, StatusBar, TouchableOpacity, Keyboard, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView } from "react-native";
import { useEffect, useState } from 'react';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from "react-native-reanimated"
import { api, utils, useGlobally } from '../core';
import { backgroundSignUp, logo } from "../assets";
import { CustomButton, Input } from "../components";




export default function SignUpScreen({navigation}) {
    const login = useGlobally(state => state.login) // login function API call

    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    //error handling
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [repeatedPasswordError, setRepeatedPasswordError] = useState('');

    const [passwordStrength, setPasswordStrength] = useState('Very weak');
    const [requestError, setRequestError] = useState('');

    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasLower = /[a-z]/.test(password);

    useEffect (() => {
        updatePasswordFeedback(password);
    }, [password]);

    function updatePasswordFeedback(password){

        let strength = 0

        // Check the strength
        if (password.length >=8) {
            strength++;
        }
        if (hasNumber) {
            strength++;
        }
        if (hasSpecial) {
            strength++;
        }
        if (hasUpper){
            strength++;
        }
        if (hasLower) {
            strength++;
        }

        // Show the user the strength
        switch (strength) {
            case 1:
                setPasswordStrength('Very Weak');
                break;
            case 2:
                setPasswordStrength('Weak');
                break;
            case 3:
                setPasswordStrength('Moderate');
                break;
            case 4:
                setPasswordStrength('Strong');
                break;
            case 5:
                setPasswordStrength('Very Strong');
                break;
            default:
                setPasswordStrength('Very weak');
                break;
        }
    };


    function capitalizeFirstLetter(string){
        if (!string) return string
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    function handleFirstNameChange(text) {
        const capitalized = capitalizeFirstLetter(text)
        setFirstName(capitalized)
    }
    function handleLastNameChange(text) {
        const capitalized = capitalizeFirstLetter(text)
        setLastName(capitalized)
    }


    function onSignUp() {
        let validationErrors = false;
        // Clear Previous error
        setRequestError('')


        //Check email
        const noEmail = !email
        if (noEmail) {
            setEmailError('Email is required')
            validationErrors = true
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            validationErrors = true
            }
        }
        //check First Name
        const noFirstName = !firstName
        if (noFirstName) {
            setFirstNameError('Please enter your first name');
            validationErrorshasValidationIssues = true;
        } 
        //check Last name
        const noLastName = !lastName
        if (noLastName) {
            setLastNameError('Please enter your last name');
            validationErrors = true;
        } 
         //check password-len 8, uppercase, special char and num
        const noPassword = !password
        if (noPassword || password.length <8 ) {
        setPasswordError('Password must be at least 8 characters long');
        hasValidationIssues = true;
        } else {
            if (!hasUpper){
                setPasswordError('Password must contain at least one uppercase letter');
                validationErrors = true;
            } else if (!hasNumber) {
                setPasswordError('Password must contain at least one number');
                validationErrors = true;
            } else if (!hasSpecial){
                setPasswordError('Password must contain at least one special character');
                validationErrors = true;
            } else if (password.length>30) {
                setPasswordError('Password must be no longer than 35 characters');
                validationErrors = true;
            }else if (!hasLower) {
                setPasswordError('Password must contain at least one lowercase letter')
            }else {
                setPasswordError(''); // clear any previous error
            }
        }
        const noRepeatedPassword = !repeatedPassword
        if (noRepeatedPassword) {
            setRepeatedPasswordError('Please  confirm your password');
            validationErrors = true;
        }
        if (password !== repeatedPassword){
            setRepeatedPasswordError('Passwords do not match');
            validationErrors = true;
        }
        //break out of this function if there were any issues
        if (validationErrors) {return} 
        else{

        //make sign up and sign in request
        api({
            method: 'POST',
            url: '/application/signup/',
            data: {
              email: email,
              first_name: firstName,
              last_name: lastName,
              password: password
            }
      
          })
        .then(response => {
            const credentials ={
                email:email,
                password:password
            }
            login(credentials, response.data.user);
        })
          // from Axios.com
        .catch(error => {
            if (error.response.status==409){
                setRequestError('A user with this email already exists')
            }
        });
        
    
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
                                source={backgroundSignUp}
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
                                    entering={FadeInDown.duration(1000).springify()}
                                    style={styles.forms}>
                                        <Input 
                                            title="First Name"
                                            value={firstName}
                                            error={firstNameError}
                                            setValue={handleFirstNameChange}
                                            setError={setFirstNameError}
                                            clear={setRequestError}/>
                                </Animated.View>
                                <Animated.View 
                                    entering={FadeInDown.duration(1000).springify()}
                                    style={styles.forms}>
                                        <Input 
                                            title="Last Name"
                                            value={lastName}
                                            error={lastNameError}
                                            setValue={handleLastNameChange}
                                            setError={setLastNameError}
                                            clear={setRequestError}/>
                                </Animated.View>
                                <Animated.View 
                                    entering={FadeInDown.duration(2000).springify()}
                                    style={styles.forms}>
                                        <Input 
                                            title="Email"
                                            value={email}
                                            error={emailError}
                                            setValue={setEmail}
                                            setError={setEmailError}
                                            clear={setRequestError}/>
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
                                            clear={setRequestError}/>
                                </Animated.View>
                                <Animated.View 
                                    entering={FadeInDown.duration(2000).springify()}
                                    style={styles.forms}>
                                        <Text>Password strength: {passwordStrength}</Text>
                                        <Input 
                                            title="Repeat Password"
                                            value={repeatedPassword}
                                            error={repeatedPasswordError}
                                            setValue={setRepeatedPassword}
                                            setError={setRepeatedPasswordError}
                                            clear={setRequestError}/>
                                </Animated.View>
                                <Animated.View
                                    entering={FadeInDown.duration(2000).springify()}
                                    style={styles.forms}>
                                        { requestError ? (
                                        <Text style={styles.errorText}>{requestError}</Text>
                                         ) : null}
                                        <CustomButton title='Sign Up' onPress={onSignUp} />
                                </Animated.View>
                                <Animated.View 
                                    entering={FadeInDown.duration(2000).springify()}
                                    style={styles.signUpRow}>
                                        <Text>Already have an account? </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('Log In')}>
                                            <Text style={styles.signUpText}>Log in</Text>
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
        marginTop:'-285%'
    },
    formContainer: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width:'100%',
        marginTop: '63%',
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