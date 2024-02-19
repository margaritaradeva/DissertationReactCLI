import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { List } from 'react-native-paper';



export default function ParentScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <List.Section>
          <List.Item
            title = "Add Friends"
            left={()=> <List.Icon icon="account-plus"/>}
            onPress={() => navigation.navigate('Add Friends')}
        />
        <List.Item
            title = "Friends"
            left={()=> <List.Icon icon="account-group"/>}
            onPress={() => navigation.navigate('Friends')}
        />
        <List.Item
            title = "Statistics"
            left={()=> <List.Icon icon="chart-bar"/>}
            onPress={() => navigation.navigate('Statistics')}
        />
        <List.Item
            title = "Settings"
            left={()=> <List.Icon icon="cog"/>}
            onPress={() => navigation.navigate('Settings')}
        />
        </List.Section>
      </View>
    );
  }



const styles = StyleSheet.create({
    cotainer: {
      flex: 1,
    },

});