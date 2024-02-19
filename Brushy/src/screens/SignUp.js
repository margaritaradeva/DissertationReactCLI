import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import CustomButton from '../components/CustomButton';
import { Input } from '../components';




export default function SignUp({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Sign in!</Text>
        <Input title='Username'/>
        <Input title='Password'/>
        <CustomButton title='Sign Up'/>
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