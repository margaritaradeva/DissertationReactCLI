// Import all the necessary libraries. screens and components
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import {Calendar} from 'react-native-calendars';
import { ActivityIndicator } from 'react-native-paper';
import { api, useGlobally } from '../core';
import secure from '../core/secure';

import { logo, morningBadge, eveningBadge } from '../assets';
import { ScrollView } from 'moti';

export default function Statistics() {

  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true)
  const [check, setCheck] = useState(false)
  const {userDetails, getDetails} = useGlobally()
  const [calendarDates, setCalendarDates] = useState()
  const [markedDates, setMarkedDates] = useState({});
 

  useEffect(() => {
    const fetchDetails = async () => {
      try{
      await getDetails();
      const credentials = await secure.get('credentials')
      const response = await api({
        method: 'POST',
        url: '/application/activities/',
        data: {
          "email":credentials.email
        }
  
      })
      setCalendarDates(response.data)
      setCheck(true)}
      catch (error) {
        console.log('error getting statistics data', error)
      }
    };
  
    fetchDetails();
    
  }, []);

  useEffect(() => { 
    if (check && userDetails.current_streak){
        setLoading(false)
        const transormedData = transformActivityData(calendarDates)
        setMarkedDates(transormedData)
    }
    
    
  }, [check, userDetails]);

  
  const transformActivityData = (activities) => {
    const marked = {}
    activities.forEach((activity) => {
      const {activity_date, activity_type} = activity
      let badge;

      switch (activity_type) {
        case 'morning':
          badge = morningBadge
          break
        case 'evening':
          badge=eveningBadge
          break
        case 'both':
          badge=logo
          break
        default:
          badge=null
      }

      marked[activity_date] = {
        customStyles: {
          containers: {
            resizeMode: 'contain'
          },
          image: badge
        }
      }
    })
    return marked
  }

    return (
      <View style={styles.container}>
        <ScrollView>
        {loading? (
          <ActivityIndicator animating={true}/>
        ):(
          <Card style={{marginTop:30}}>
            <Card.Content style={styles.card}>
              <Title>Brushing Statistics</Title>
              {userDetails && (
                <>
                <Paragraph>Current Streak: {userDetails.current_streak}</Paragraph>
                <Paragraph>Max Streak: {userDetails.max_streak}</Paragraph>
                <Paragraph>Total Number of Brushes: {userDetails.total_brushes}</Paragraph>
                <Paragraph>Brushes Completed In The Morning: {userDetails.percentage_morning*100} %</Paragraph>
                <Paragraph>Brushes Completed In The Evening: {userDetails.percentage_evening*100} %</Paragraph>
                </>
              )}
            </Card.Content>
          </Card>

        )}

        {!loading && calendarDates && (
          
          <Calendar
            markingType='custom'
            style={{width:300,height:300, marginTop:30, marginLeft: 13}}
            markedDates={markedDates}
            dayComponent={({date,state}) => {
              const dateString = date.dateString
              const dateData = markedDates[dateString]
              return (
                <View style={styles.dayContainer}>
                  <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>
                    {date.day}
                  </Text>
                  {dateData && dateData.customStyles.image && (
                    <Image 
                    source = {dateData.customStyles.image}
                    style={styles.badgeImage}/>
                  )}
                  </View>
              )
            }}
            />
        )}
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightblue'
    },
    card: {
      margin: 10,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowColor: 'black',
      shadowOffset: {
        height: 3,
        width: 3,
      },
      elevation: 6,
    },
    dayContainer: {
      
      alignItems: 'center',
      justifyContent: 'center',
      width: 70,
      height: 50,
      
      
      
    },
    badgeImage: {
      width: 50,
      height: 50,
      backgroundColor: '#E4FFE8',
      borderColor: 'green',
      borderWidth: 1

    },
  });