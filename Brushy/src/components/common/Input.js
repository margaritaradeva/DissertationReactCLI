import { View, Text, TextInput, Platform } from "react-native";

export default function Input ({title, value,error, setValue,setError, secureTextEntry=false, margin=0, clear}) {
  let marginn = parseInt(margin, 10);  
  return (
      <View style={{width:'90%',marginLeft:10, marginRight:10, marginTop:marginn}}>
        <Text style={{color: error ? 'red' :'green'}}>
          {error ? error : ''}
          </Text>
        <TextInput
        placeholder={title}
        placeholderTextColor="gray"
        autoCapitalize="none"
        autoComplete="off"
        secureTextEntry={secureTextEntry} 
        style={{backgroundColor:'white',
        height: Platform.OS == 'android' ? 40 : 20,
        paddingVertical: 0,
        borderColor: error ? 'red' : '#acacac',
        borderWidth:1,
        fontSize: 14,
        backgroundColor:'#f2f2f2',
        lineHeight: 14 ,
        color: 'black',
        borderRadius: 16, height:52, width:'100%',
         paddingHorizontal:16,fontSize:16}}
         value={value}
         onChangeText={text =>{setValue(text)
        if (error) {setError('') && clear('')} else {
          clear('')
        }
        
      }}
         />
      

      </View>
    );
  }