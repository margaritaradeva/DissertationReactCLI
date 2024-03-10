import { View, Text, Button, Image, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from "react-native-reanimated"
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
                <Image
                    style={styles.leftLogo}
                    source={logo}
                />
            </View>
           
            <View style={styles.formContainer}>
            <Input title="Email" margin="5" />
            <Input title="Password"/>
            <CustomButton title='Log In' />
            <Text>Don't have an account?
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                <Text>Sign up</Text>
            </TouchableOpacity>
            </Text>
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
    }
    


});