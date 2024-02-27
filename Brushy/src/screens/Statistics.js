// Import all the necessary libraries. screens and components
import { StyleSheet, Text, View } from 'react-native';

export default function Statistics() {
    return (
      <View style={styles.container}>
        <Text>Statistics!</Text>
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