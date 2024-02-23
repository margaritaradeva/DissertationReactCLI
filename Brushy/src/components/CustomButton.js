import { TouchableOpacity, Text, View } from "react-native";

export default function CustomButton ({style, textStyle, title, onPress, iconName, IconComponent, iconColor, iconSize}) {
    return(
      <TouchableOpacity style={style} onPress={onPress}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          {IconComponent && iconName ? (
            <IconComponent name={iconName} color={iconColor || '#000'} size={iconSize || 24} />
          ) : null}
        <Text style={textStyle}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }