import { View, Text, TextInput } from "react-native";

export default function Input ({title}) {
    return (
      <View style={{width:'85%',marginLeft:10, marginRight:10}}>
        <Text>{title}</Text>
        <TextInput style={{backgroundColor:'grey',borderRadius: 26, height:52, width:'100%', paddingHorizontal:16,fontSize:16}}/>
      </View>
    );
  }