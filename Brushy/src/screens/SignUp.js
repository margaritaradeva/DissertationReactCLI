import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import CustomButton from '../components/CustomButton';
import { Input } from '../components';
import { useState } from 'react';





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

    function onSignUp() {
        console.log('on sign upppppp',username,password)
    //Check username
    const noUsername = !username
    if (noUsername) {
      setUsernameError('Username not provided')
    }
    //check email
    const noEmail = !email 
    if (noEmail) {
        setEmailError('Email not provided')

    }
    //check First Name
    const noFirstName = !firstName
    if (noFirstName) {
        setFirstNameError('No First Name provided')

    }
    //check Last name
    const noLastName = !lastName
    if (noLastName) {
        setLastNameError('No Last Name Provided')
    }
    //check password
    const noPassword = !password
    if (noPassword) {
      setPasswordError('Password not provided')
    }
    const noRepeatedPassword = !repeatedPassword
    if (noRepeatedPassword) {
        setRepeatedPasswordError('Password not provided')
    }
    if (password != repeatedPassword){
        setRepeatedPasswordError('Passwords do not match')
    }
    //break out of this function if there were any issues
    if (noUsername || noEmail || noFirstName || noLastName || noPassword || noRepeatedPassword ) {
      return
    }
    //make sign in request
   };
       
    return (
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
        setError={setPasswordError}/>
        <Input title='Repeat Password'
        value={repeatedPassword}
        error={repeatedPasswordError}
        setValue={setRepeatedPassword}
        setError={setRepeatedPasswordError}/>
        <CustomButton title='Sign Up' onPress={onSignUp}/>
        <Text>Already have an account?</Text>
        <CustomButton title='Sign In' onPress={()=>navigation.navigate('Sign In')}/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });