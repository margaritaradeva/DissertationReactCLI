import { StyleSheet, Text } from "react-native";



export default function Title ({ text, color }) {
    const textStyle = {
        ... styles.text,
        color: color,
    }
    return (
        <Text style={textStyle}>
            {text}
        </Text>


    )
}


const styles= StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 78,
        fontFamily: 'LeckerliOne-Regular'
      },

})