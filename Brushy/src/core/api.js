import axios from 'axios'
import { Platform } from 'react-native';


const ADRESS = Platform.OS === 'ios'
    ? 'http://localhost:8000'
    : 'http://10.0.2.2:8000'
// So we dont have to provide them every single time we make a request
const api = axios.create ({
    baseURL:  ADRESS,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;