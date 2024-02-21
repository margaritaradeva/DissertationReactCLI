import { StyleSheet, Text, View } from 'react-native';
import useGlobally from '../core/global';


export default function Home() {
  const logout = useGlobally(state => state.login);
    return (
      <View style={styles.container}>
        <Text>Home!</Text>
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