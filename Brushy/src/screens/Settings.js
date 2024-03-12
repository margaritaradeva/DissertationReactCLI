// Import all the necessary libraries, screeens and components
import { StyleSheet, Text, View, Image } from 'react-native';
import { profile } from '../assets'; // Profile picture
import { CustomButton } from '../components'; // Custom made button
import useGlobally from '../core/global'; // Global state manager from zustand
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Icons
import secure from '../core/secure';
import { api } from '../core';
import { useEffect, useState } from 'react';

export default function Settings() {
 
  
  const [credentials, setCredentials] = useState(null);
  const logout = useGlobally(state => state.logout) // Log out function from core/global
  async function getDetails() {
    const getUserDetails = await secure.get('credentials')
    setCredentials(getUserDetails)
  }

  useEffect (() => {
    getDetails()
  },[])
  
console.log(credentials)
  async function deleteUser() {
    const credentials = await secure.get('credentials')
    try {
      console.log('here',credentials)
      const response = await api({
        method: 'POST',
        url: '/application/delete/',
        data: {
          email: credentials.email, 
        }
      });
  
      // Simplified handling for demonstration
      if (response.status === 204) { // Check for successful deletion
        logout();  
      } else {
        console.log('errr')
        // Handle unsuccessful deletion - display error message to user
      }
  
    } catch (error) {
      console.error("Error deleting user:", error); 
      // Display an error message to the user about the failed deletion
    }
  }
  
    return (
      <View style={styles.container}>
        <Image source={profile}
        style={styles.image}/>
        {credentials? (
          <Text style={styles.name}>{credentials.first_name} {credentials.last_name}</Text>
        ):(
          <Text style={styles.name}>Loading</Text>
        )}
      
          { credentials? (
        <Text style={styles.username}>{credentials.email}</Text>
          ) : (
            <Text style={styles.username}>Loading</Text>
          )} 
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
          <CustomButton title="Delete user" onPress={deleteUser}/>
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

