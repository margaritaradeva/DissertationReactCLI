import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import CustomButton from '../components/CustomButton';
import { Input } from '../components';




export default function SignUp({navigation}) {
    function onSignUp() {
        console.log('on sign UP')
       };
    return (
      <View style={styles.container}>
        <Text>Sign Up!</Text>
        <Input title='Username'/>
        <Input title='Email'/>
        <Input title='First Name'/>
        <Input title='Last Name'/>
        <Input title='Password'/>
        <Input title='Repeat Password'/>
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