import { StyleSheet, Text, View } from 'react-native';

export default function ParentScreen() {
    return (
      <View style={styles.container}>
        <Text>Parents!</Text>
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