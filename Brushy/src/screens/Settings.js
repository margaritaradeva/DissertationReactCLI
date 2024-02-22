import { StyleSheet, Text, View, Image } from 'react-native';
import { profile } from '../assets';
import { CustomButton } from '../components';
import useGlobally from '../core/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Settings() {
  const logout = useGlobally(state => state.logout)

    return (
      <View style={styles.container}>
        <Image source={profile}
        style={{width:180,height:180,borderRadius:90, backgroundColor:'#e0e0e0'}}/>
        <Text
        style={{
          textAlign:'center',
          color:'#303030',
          fontSize:20,
          fontWeight:'bold',
          marginTop: 6

        }}>
          Margarita Radeva</Text>
        <Text style={{
              textAlign:'center',
              color:'#606060',
              fontSize:14
        }}>
          @maggie</Text>
          <CustomButton 
          style={{
            flexDirection: 'row',
            height: 52,
            borderRadius: 26,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 26,
            backgroundColor: '#202020',
            marginTop: 40
          }}
          
          textStyle={{
            fontWeight: 'bold',
            color: '#d0d0d0'
          }}
          title={"Log Out"}
          onPress={logout}
          IconComponent={MaterialCommunityIcons}
          iconName='logout'
          iconColor={'#d0d0d0'}
          iconSize={20}
          
           />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop:30,
    },
  });