// Import necessary libraries and components
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Icons
import { MotiView } from 'moti';
import { api } from "../core";
import { BlurView } from "@react-native-community/blur";
import { CustomButton, Input } from "../components/common";
import { Modal, TextInput } from "react-native";
import secure from "../core/secure";

// Define the keys for the pad
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];

// Take the width of the screen
const { width } = Dimensions.get('window');

// Define the size of the digit circles
const circleSize = width * 0.2;

// Define the size of the text in the circles
const circleTextSize = circleSize * 0.4;

// Define pin length
const pinLength = 6;

// Define the size for block of text where the entered pin is displayed
const pinSize = width / 2;

// Define the size for each little square containing a digit
const pinTextSizeMax = pinSize / pinLength;
const pinTextSize = pinTextSizeMax - 10;

// PinPad component for displaying and interacting with the pin pad
function PinPad({ onPress }) {
    return (
        <FlatList
            numColumns={3}
            data={digits}
            style={{ flexGrow: 0 }}
            scrollEnabled={false}
            columnWrapperStyle={{ gap: 20 }}
            contentContainerStyle={{ gap: 20 }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        disabled={item === ''}
                        onPress={() => onPress(item)}>
                        <View style={[styles.circles, { borderWidth: (item === '' || item === 'del') ? 0 : 1 }]}>
                            {item === 'del' ?
                                <MaterialCommunityIcons name="backspace-outline" color={'#000000'} size={circleTextSize} /> :
                                <Text style={styles.circleText}>{item}</Text>}
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
}

// Pin component for handling pin entry and pin setup
export default function Pin({ navigation }) {
    // State variables for pin entry and setup
    const [showModal, setShowModal] = useState(false);
    const [pin, setPin] = useState([]);
    const [firstPin, setFirstPin] = useState(null);
    const [confirmingPin, setConfirmingPin] = useState(false);
    const [loading, setLoading] = useState(true); // used for knowing if the async function has finished execution
    const [message, setMessage] = useState('');
    const [isPinSet, setIsPinSet] = useState(false);
    const [matchedPins, setMatchedPins] = useState(false);
    const [move, setMove] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [requestError, setRequestError] = useState('');
    const [seePassword, setSeePassword] = useState(false);

    // Function to trigger pin animation
    const triggerAnimation = () => {
        setMatchedPins(true);
        setTimeout(() => {
            setMatchedPins(false);
            setMessage('Please set up your pin');
        }, 600);
    };

    // useEffect to check pin status when component renders
    useEffect(() => {
        checkPinStatus();
        setPin([]);
        setConfirmingPin(false);
    }, []);

    // useEffect to handle pin entry and setup
    useEffect(() => {
        // Check if pin setup is in progress
        if (!isPinSet) {
            // Handle pin setup
            if (pin.length === pinLength) {
                if (!confirmingPin) {
                    setFirstPin(pin);
                    setPin([]);
                    setConfirmingPin(true);
                } else {
                    const arePinsIdentical = firstPin.length === pin.length && firstPin.every((element, index) => element === pin[index]);
                    if (!arePinsIdentical) {
                        // Prompt users to enter both pins again if they weren't identical
                        setMessage('Pins do not match');
                        triggerAnimation();
                        setTimeout(() => {
                            setPin([]);
                            setFirstPin(null);
                            setConfirmingPin(false);
                        }, 600);
                    } else {
                        const pinString = firstPin.join('');
                        console.log(pinString);
                        setUpPin(pinString);
                    }
                }
            }
        } else {
            // Handle pin entry
            if (pin.length === pinLength) {
                const pinString = pin.join('');
                console.log(pinString);
                checkPin(pinString);
            }
        }
    }, [message, isPinSet, pin]);

    // useEffect to navigate after successful pin entry
    useEffect(() => {
        if (move) {
            setMessage('Please enter your pin');
            setPin([]);
            setMove(false);
            setMessage('Please enter your pin');
            navigation.navigate("Parents Settings");
        }
    }, [move]);

    // useEffect to update message based on pin status
    useEffect(() => {
        if (confirmingPin) {
            setMessage('Please confirm your pin');
        } else if (isPinSet) {
            setMessage('Please enter your pin');
        } else {
            setMessage('Please set up your pin');
        }
    }, [confirmingPin, isPinSet]);

    // Function to check pin status
    async function checkPinStatus() {
        try {
            const response = await api.get('/application/isPinSet/');
            setIsPinSet(response.data.is_pin_set);
            setLoading(false);
        } catch (error) {
            console.error("errorrrrr", error);
        }
        setLoading(false);
    }

    // Function to set up pin
    async function setUpPin(pinToSet) {
        try {
            const response = await api({
                method: 'POST',
                url: '/application/setPin/',
                data: {
                    "parent_pin": pinToSet
                }
            });
            setPin([]);
            setMessage('Please enter your pin');
            setMove(true);
            setIsPinSet(true);
            setConfirmingPin(false);
        } catch (error) {
            console.log(error);
        }
    }

    // Function to handle forgot pin
    async function forgotPin() {
        setIsPinSet(false);
    }

    // Function to check pin
    async function checkPin(pinToCheck) {
        try {
            const response = await api({
                method: 'POST',
                url: '/application/checkPin/',
                data: {
                    "parent_pin": pinToCheck
                }
            });
            if (response.status === 200) {
                console.log('yay');
                setPin([]);
                setMessage('Please enter your pin');
                setMove(true);
            }
        } catch (error) {
            console.log(error);
            setMessage('Pin is incorrect');
            triggerAnimation();
            setTimeout(() => {
                setPin([]);
            }, 600);
        }
    }

    // Function to handle pin pad button press
    const handlePress = (item) => {
        if (!isPinSet) {
            if (item !== '' && item !== 'del') {
                if (!confirmingPin && pin.length < pinLength) {
                    setPin(prevPin => [...prevPin, item]);
                } else if (confirmingPin && pin.length < pinLength) {
                    setPin(prevPin => [...prevPin, item]);
                }

            } else if (item === 'del') {
                setPin(prevPin => {
                    const newPin = prevPin.slice(0, prevPin.length - 1);
                    console.log(newPin);
                    return newPin;
                });
            }
        } else {
            if (item !== '' && item !== 'del') {
                if (pin.length < pinLength) {
                    setPin(prevPin => [...prevPin, item]);
                }
            } else if (item === 'del') {
                setPin(prevPin => {
                    const newPin = prevPin.slice(0, prevPin.length - 1);
                    return newPin;
                });
            }
        }
    };

    // Function to close modal
    async function closeModal() {
        setShowModal(false);
    }

    // Function to show modal on screen
    function showModalOnScreen() {
        setShowModal(true);
    }

    // Function to reset pin
    async function resetPIN() {
        // Clear Previous error
        setRequestError('');
        // Check email
        const noEmail = !email;
        if (noEmail) {
            setEmailError('Email is required');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError('Please enter a valid email address');
            }
        }
        // Check password
        const noPassword = !password;
        if (noPassword) {
            setPasswordError('Password is required');
        }
        // Break out of this function if there were any issues
        if (noEmail || noPassword || validationErrors) {
            return;
        }
        try {
            const response = await api({
                method: 'POST',
                url: '/application/reauthenticate/',
                data: {
                    email: email,
                    password: password
                }
            });
            const credentials = await secure.get('credentials');
            if (email !== credentials.email && password !== credentials.password) {
                setRequestError('Invalid email or password');
            } else {
                setEmail('');
                setPassword('');
                forgotPin();
                setShowModal(false);
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                setRequestError('Invalid email or password.');
            } else {
                setRequestError('An unexpected error ocurred. Please try again.');
                console.log(error);
            }
        }

    }

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.messageText}>Loading</Text>
            ) : (
                <View style={styles.message}>
                    <Text style={styles.messageText}>
                        {message}
                    </Text>
                </View>
            )}

            <View style={styles.onRow}>
                {[...Array(pinLength).keys()].map(i => {
                    const isSelected = i < pin.length;
                    return <MotiView
                        key={`pin-${i}`}
                        style={styles.pinArray}
                        transition={{ type: 'timing', duration: 100 }}
                        animate={{ height: isSelected ? pinTextSize : 2, marginBottom: isSelected ? pinTextSize : 0, translateX: matchedPins ? [0, -20, 20, -20, 20, 0] : 0 }} />;
                })}
            </View>
            <PinPad onPress={handlePress} />
            <View style={styles.onRowForgotPin}>
                <Text>Forgot your Pin?</Text>
                <TouchableOpacity>
                    <Text style={styles.forgotPin} onPress={showModalOnScreen}> Reset</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" transparent={true} visible={showModal} onRequestClose={() => setShowModal(false)}>
                <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white" />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Input
                        title="Email"
                        value={email}
                        error={emailError}
                        setValue={setEmail}
                        setError={setEmailError}
                        clear={setRequestError} />
                    <Input
                        title="Password"
                        value={password}
                        error={passwordError}
                        setValue={setPassword}
                        setError={setPasswordError}
                        clear={setRequestError} />
                    {requestError ? (
                        <Text style={styles.errorText}>{requestError}</Text>
                    ) : null}
                    <CustomButton title="Reset PIN" onPress={resetPIN} />
                    <CustomButton title="Close" onPress={closeModal} />
                </View>
            </Modal>

        </View>
    );
}

// Styles for Pin component
const styles = StyleSheet.create({
    // Main container
    container: {
        flex: 1, // Take up all of the space
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Styles for digit circles
    circles: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Styles for text in digit circles
    circleText: {
        fontSize: circleTextSize,
        color: '#000000'
    },
    // Styles for pin array
    pinArray: {
        width: pinTextSize,
        borderRadius: pinTextSize,
        backgroundColor: 'red',
    },
    // Styles for pin entry row
    onRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 40,
        height: pinTextSize * 2,
        alignItems: 'flex-end'
    },
    // Styles for pin setup message
    message: {
        marginBottom: 20,
    },
    // Styles for pin setup message text
    messageText: {
        fontSize: 20,
        color: '#000000'
    },
    // Styles for forgot pin text
    forgotPin: {
        color: '#00008b',
    },
    // Styles for row containing forgot pin text
    onRowForgotPin: {
        flexDirection: 'row',
        marginTop: 20,
    },
    // Styles for error text
    errorText: {
        color: '#ff0000',
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
        marginTop: '3%',
    },
});
