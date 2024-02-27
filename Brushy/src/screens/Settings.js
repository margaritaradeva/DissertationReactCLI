// Import all the necessary libraries, screeens and components
import { StyleSheet, Text, View, Image } from 'react-native';
import { profile } from '../assets'; // Profile picture
import { CustomButton } from '../components'; // Custom made button
import useGlobally from '../core/global'; // Global state manager from zustand
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Icons

export default function Settings() {
  const logout = useGlobally(state => state.logout) // Log out function from core/global

    return (
      <View style={styles.container}>
        <Image source={profile}
        style={styles.image}/>
        <Text
        style={styles.name}>
          Margarita Radeva</Text>
        <Text style={styles.username}>@maggie</Text>
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
    image: {
      width:180,
      height:180,
      borderRadius:90,
      backgroundColor:'#e0e0e0',
    },
    name: {
      textAlign:'center',
      color:'#303030',
      fontSize:20,
      fontWeight:'bold',
      marginTop: 6,
    },
    username: {
      textAlign:'center',
      color:'#606060',
      fontSize:14
    },
  });

