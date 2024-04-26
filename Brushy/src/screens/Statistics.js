// Import necessary libraries and components
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { api, useGlobally } from '../core';
import secure from '../core/secure';

import { logo, morningBadge, eveningBadge } from '../assets/common';

// Statistics screen component
export default function Statistics() {
  // State variables
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(false);
  const { userDetails, getDetails } = useGlobally();
  const [calendarDates, setCalendarDates] = useState();
  const [markedDates, setMarkedDates] = useState({});

  // Fetch user details and activities
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await getDetails();
        const credentials = await secure.get('credentials');
        const response = await api({
          method: 'POST',
          url: '/application/activities/',
          data: {
            "email": credentials.email
          }
        });
        setCalendarDates(response.data);
        setCheck(true);
      } catch (error) {
        console.log('error getting statistics data', error);
      }
    };

    fetchDetails();

  }, []);

  // Update state when data is fetched
  useEffect(() => {
    if (check) {
      setLoading(false);
      const transformedData = transformActivityData(calendarDates);
      setMarkedDates(transformedData);
    }
  }, [check, userDetails]);

  // Transform activity data for calendar markings
  const transformActivityData = (activities) => {
    const marked = {};
    activities.forEach((activity) => {
      const { activity_date, activity_type } = activity;
      let badge;

      // Assign badge based on activity type
      switch (activity_type) {
        case 'morning':
          badge = morningBadge;
          break;
        case 'evening':
          badge = eveningBadge;
          break;
        case 'both':
          badge = logo;
          break;
        default:
          badge = null;
      }

      // Set marking for the date
      marked[activity_date] = {
        customStyles: {
          containers: {
            resizeMode: 'contain'
          },
          image: badge
        }
      };
    });
    return marked;
  };

  // JSX
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Brushing Statistics</Title>
              {userDetails && (
                <>
                  <Paragraph style={styles.cardText}>Current Streak: {userDetails.current_streak}</Paragraph>
                  {/* Display other statistics */}
                </>
              )}
            </Card.Content>
          </Card>
        )}

        {!loading && calendarDates && (
          <Calendar
            markingType='custom'
            style={styles.calendar}
            markedDates={markedDates}
            dayComponent={({ date, state }) => {
              const dateString = date.dateString;
              const dateData = markedDates[dateString];
              return (
                <View style={styles.dayContainer}>
                  <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>
                    {date.day}
                  </Text>
                  {dateData && dateData.customStyles.image && (
                    <Image
                      source={dateData.customStyles.image}
                      style={styles.badgeImage}
                    />
                  )}
                </View>
              );
            }}
          />
        )}
      </ScrollView>
    </View>
  );
}

// Styles for the Statistics screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'lightblue'
  },
  scrollViewContent: {
    paddingBottom: 30
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
    resizeMode: 'contain',
  },
  cardText: {
    color: '#000000'
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    height: 350,
  }
});
