import { TouchableOpacity, Text, View, StyleSheet} from "react-native";

export default function CustomButton ({style, textStyle, title, onPress, iconName, IconComponent, iconColor, iconSize,error, setError}) {
    return(
      <TouchableOpacity style={[styles.button,style]} onPress={onPress}>
        <View style={styles.buttonText}>
          {IconComponent && iconName ? (
            <IconComponent name={iconName} color={iconColor || '#000'} size={iconSize || 24} />
          ) : null}
        <Text style={[styles.text,textStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#2E95CA',
      
      borderRadius: 1,
      padding:5,
      marginVertical: 10,
      width:'90%',
      borderRadius: 16, 
    },
    buttonText: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
      alignItems: 'center',
      fontSize: 26,
    }
  });