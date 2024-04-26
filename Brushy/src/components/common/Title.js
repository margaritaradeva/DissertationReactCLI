import { StyleSheet, Text } from "react-native";

// Define the Title functional component
export default function Title ({ text, color }) {
    // Define text style with dynamic color
    const textStyle = {
        ...styles.text,
        color: color,
    };

    // Return the Text component with specified style and text
    return (
        <Text style={textStyle}>
            {text}
        </Text>
    );
}

// Define styles for the component
const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 78,
        fontFamily: 'LeckerliOne-Regular'
    },
});
