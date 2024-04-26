// Import necessary libraries, screens, and components
import { StyleSheet, Text, View } from 'react-native';

// Search screen component
export default function Search() {
  return (
    // View container for the search screen
    <View style={styles.container}>
      {/* Text indicating that the feature is coming soon */}
      <Text>Coming soon!</Text>
    </View>
  );
}

// Styles for the search screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up all available space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
});
