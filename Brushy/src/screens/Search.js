// Import all the necessary libraries screens and components
import { StyleSheet, Text, View } from 'react-native';

export default function Search() {
    return (
      <View style={styles.container}>
        <Text>Searching!</Text>
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