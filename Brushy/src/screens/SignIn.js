import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CustomButton from '../components/CustomButton';
import { Input } from '../components';
import { useState } from 'react';
import { Switch } from 'react-native-paper';




export default function SignIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [seePassword, setSeePassword] = useState(false);

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
      <SafeAreaView style={{flex:1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        setError={setPasswordError}
        secureTextEntry={seePassword}/>
        <View style={styles.toggleContainer}>
          <Text>Show Password</Text>
          <Switch value={seePassword}
          onValueChange={(newValue) => setSeePassword(newValue)}/>
        </View>

        <CustomButton title='Log In' onPress={onSignIn}/>
        <Text>Don't have an account?</Text>
        <CustomButton title='Sign Up' onPress={() => navigation.navigate('Sign Up')}/>
      </View>
      </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
  });