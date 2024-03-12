// Import all necessary libraries, screens and components
import { StyleSheet, Text, View } from 'react-native';
import { CountdownTimer, CustomButton } from '../components';
import LottieView from 'lottie-react-native';
import { progressBar, reward } from '../assets/animations';

export default function Home() {
    return (
      <View style={styles.container}>
        <CountdownTimer seconds={120}/>
        {/* <LottieView source={reward} autoPlay style={{ width: 200, height: 200 }} loop={false}  
    speed={0.5} /> */}
    <LottieView source={progressBar} autoPlay style={{width:150, height:150, marginTop:'90%', marginRight:'70%'}} />
       </View>
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });