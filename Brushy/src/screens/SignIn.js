import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import CustomButton from '../components/CustomButton';
import { Input } from '../components';




export default function SignIn({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Sign in!</Text>
        <Input title='Username'/>
        <Input title='Password'/>
        <CustomButton title='Log In'/>
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