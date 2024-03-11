import { View, Text, Button, Image, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from "react-native-reanimated"
import { backgroundImg, logo } from "../assets";
import { CustomButton, Input } from "../components";

export default function LoginScreen({navigation}) {
    return (
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
                    entering={FadeInDown.duration(1000).springify()}
                    style={styles.forms}>
                        <Input title="Email" margin="5" />
                </Animated.View>
                <Animated.View 
                    entering={FadeInDown.duration(1000).springify()}
                    style={styles.forms}>
                        <Input title="Password"/>
                </Animated.View>
                <CustomButton title='Log In' />
                <Animated.View 
                    entering={FadeInDown.duration(1000).springify()}
                    style={styles.signUpRow}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                            <Text style={styles.signUpText}>Sign up</Text>
                        </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
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


});