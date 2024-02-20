import { View, Text, TextInput } from "react-native";

export default function Input ({title, value,error, setValue,setError, secureTextEntry=false}) {
    return (
      <View style={{width:'85%',marginLeft:10, marginRight:10}}>
        <Text style={{color: error ? 'red' :'green'}}>
          {error ? error : title}
          </Text>
        <TextInput 
        autoCapitalize="none"
        autoComplete="off"
        secureTextEntry={secureTextEntry} 
        style={{backgroundColor:'white',
        borderColor: error ? 'red' : 'green',
        borderWidth:3,
        borderRadius: 26, height:52, width:'100%',
         paddingHorizontal:16,fontSize:16}}
         value={value}
         onChangeText={text =>{setValue(text)
        if (error) {setError('')}}}
         />
      

      </View>
    );
  }