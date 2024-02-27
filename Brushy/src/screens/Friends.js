// Import all of the necessary libraries, screens and components
import { StyleSheet, Text, View } from 'react-native';

export default function Friends() {
    return (
      <View style={styles.container}>
        <Text>Friends!</Text>
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