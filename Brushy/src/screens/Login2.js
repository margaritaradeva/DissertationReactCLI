import { View, Text, Button, Image, StyleSheet, StatusBar } from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from "react-native-reanimated"
import { backgroundImg, logo } from "../assets";
import { Input } from "../components";

export default function LoginScreen(props) {
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
            <Text style={styles.textLogIn}>Log In</Text>
            <Input title="Email" margin="5" />
            <Input title="Password"/>
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
        backgroundColour: '#FFFFFF' // White
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
    textLogIn: {
        fontSize:30,
        fontWeight: 'bold',
        color: '#00008B',
        alignSelf: 'flex-start',
        marginLeft:'50%',
        transform: [
            { translateX: -50 },],
        marginTop: '110%',
    },
    formContainer: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width:'100%',
    }
    


});