import { Keyboard, SafeAreaView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View, KeyboardAvoidingView, ScrollView} from 'react-native';
import CustomButton from '../components/CustomButton';
import { Input } from '../components';
import { useEffect, useState } from 'react';
import { Switch } from 'react-native-paper';



export default function SignUp({navigation}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    //error handling
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [repeatedPasswordError, setRepeatedPasswordError] = useState('');

    const [passwordFeedback, setPasswordFeedback] = useState([]);
    const [passwordStrength, setPasswordStrength] = useState('Very weak');

    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const [validationIssues, setValidationIssues] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    useEffect (() => {
        updatePasswordFeedback(password);
    }, [password]);

    function updatePasswordFeedback(password) {
        let feedback = [];
        let strength = 0;

        if (password.length >=8) {
            strength++;
        }else {
            feedback.push('Password must be at least 8 characters long');

        }
        if (hasNumber) {
            strength++;
        }else {
            feedback.push('Include at least one number');
        }
        if (hasSpecial) {
            strength++;
        }else {
            feedback.push('Use at least one special character');
        }
        if (hasUpper){
            strength++;
        }else {
            feedback.push('Add at least one uppercase letter');
        }

        setPasswordFeedback(feedback);

        switch (strength) {
            case 1:
                setPasswordStrength('Weak');
                break;
            case 2:
                setPasswordStrength('Moderate');
                break;
            case 3:
                setPasswordStrength('Strong');
                break;
            case 4:
                setPasswordStrength('Very Strong');
                break;
            default:
                setPasswordStrength('Very weak');
                break;
        }

    };

    function onSignUp() {
        console.log('on sign upppppp',username,password)
    //Check username
    const noUsername = !username
    const usernameHasSpecial = /[^A-Za-z0-9_.]/.test(username);
    if (noUsername || username.length<6) {
      setUsernameError('Username must be longer than 5 characters');
      setValidationIssues(true);
    } else if (usernameHasSpecial) {
        setUsernameError('Username must not contain any special characters');
        setValidationIssues(true);
    } 
    //check email
    
    const noEmail = !email 
    if (noEmail) {
        setEmailError('Email not provided');
        setValidationIssues(true);
 
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            setValidationIssues(true);
        } else {
            setEmailError(''); // clear any previous errors if the email is now valid
           
        }
    }
    //check First Name
    const noFirstName = !firstName
    if (noFirstName) {
        setFirstNameError('Please enter your first name');
        setValidationIssues(true);

    }
    //check Last name
    const noLastName = !lastName
    if (noLastName) {
        setLastNameError('Please enter your last name');
        setValidationIssues(true);
    }
    //check password-len 8, uppercase, special char and num
    const noPassword = !password
    if (noPassword || password.length <8 ) {
      setPasswordError('Password must be at least 8 characters long');
      setValidationIssues(true);
    } else {
        

        if (!hasUpper){
            setPasswordError('Password must contain at least one uppercase letter');
            setValidationIssues(true);

        } else if (!hasNumber) {
            setPasswordError('Password must contain at least one number');
            setValidationIssues(true);
        } else if (!hasSpecial){
            setPasswordError('Password must contain at least one special character');
            setValidationIssues(true);
        } else if (password.length>30) {
            setPasswordError('Password must be no longer than 35 characters');
            setValidationIssues(true);
        }else {
            setPasswordError(''); // clear any previous error
        }

    

    }




    const noRepeatedPassword = !repeatedPassword
    if (noRepeatedPassword) {
        setRepeatedPasswordError('Please  confirm your password');
        setValidationIssues(true);
    }
    if (password !== repeatedPassword){
        setRepeatedPasswordError('Passwords do not match');
        setValidationIssues(true);
    }
    //break out of this function if there were any issues
    if (validationIssues) {return}
    //make sign in request
   };
       
    return (
        <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}>
      <View style={styles.container}>
        <Text>Sign Up!</Text>
        <Input title='Username'
        value={username}
        error={usernameError}
        setValue={setUsername}
        setError={setUsernameError}
        />
        <Input title='Email'
        value={email}
        error={emailError}
        setValue={setEmail}
        setError={setEmailError}/>
        <Input title='First Name'
        value={firstName}
        error={firstNameError}
        setValue={setFirstName}
        setError={setFirstNameError}/>
        <Input title='Last Name'
        value={lastName}
        error={lastNameError}
        setValue={setLastName}
        setError={setLastNameError}/>
        <Input title='Password'
        value={password}
        error={passwordError}
        setValue={setPassword}
        setError={setPasswordError}
        secureTextEntry={seePassword}/>
        

        {passwordFeedback.map((item,index) => (
            <Text key={index}>{item}</Text>
            
        
        ))}
        <Text>Password strength: {passwordStrength}</Text>
        <Input title='Repeat Password'
        value={repeatedPassword}
        error={repeatedPasswordError}
        setValue={setRepeatedPassword}
        setError={setRepeatedPasswordError}
        secureTextEntry={seePassword}/>
        <View style={styles.toggleContainer}>
          <Text>Show Password</Text>
          <Switch value={seePassword}
          onValueChange={(newValue) => setSeePassword(newValue)}/>
        </View>
        <CustomButton title='Sign Up' onPress={onSignUp}/>
        <Text>Already have an account?</Text>
        <CustomButton title='Sign In' onPress={()=>navigation.navigate('Sign In')}/>
      </View>
      </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop:'20%',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
  });