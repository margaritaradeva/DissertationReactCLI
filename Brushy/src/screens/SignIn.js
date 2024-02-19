import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import CustomButton from '../components/CustomButton';
import { Input } from '../components';
import { useState } from 'react';




export default function SignIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  function onSignIn() {
    console.log('on sign in',username,password)
    //Check username
    const noUsername = !username
    if (noUsername) {
      setUsernameError('Username not provided')
    }
    //check password
    const noPassword = !password
    if (noPassword) {
      setPasswordError('Password not provided')
    }
    //break out of this function if there were any issues
    if (noUsername ||noPassword) {
      return
    }
    //make sign in request
   };
    return (
      <View style={styles.container}>
        <Text>Sign in!</Text>
        <Input title='Username'
        value={username}
        error={usernameError}
        setValue={setUsername}
        setError={setUsernameError}
        />
        <Input title='Password'
        value={password}
        error={passwordError}
        setValue={setPassword}
        setError={setPasswordError}/>

        <CustomButton title='Log In' onPress={onSignIn}/>
        <Text>Don't have an account?</Text>
        <CustomButton title='Sign Up' onPress={() => navigation.navigate('Sign Up')}/>
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