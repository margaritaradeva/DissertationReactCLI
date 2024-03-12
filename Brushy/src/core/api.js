import axios from 'axios';
import EncryptedStorage from "react-native-encrypted-storage";

// Your Heroku app's base URL
const HEROKU_BASE_URL = 'https://expo-brushy-56de67f02740.herokuapp.com';

// Initialize axios with the Heroku base URL
const api = axios.create ({
    baseURL: HEROKU_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add authorisation tokens
api.interceptors.request.use(
    response => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // First retry attempt
        
        try {
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            const refreshResponse = await api.post('application/token/refresh/', {refresh:refreshToken})
            
            // store the new tokens
            const {access, refresh} = refreshResponse.data;
            await EncryptedStorage.setItem('accessToken', access)
            if (refresh) {
                await EncryptedStorage.setItem('refreshToken', refresh)
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${access}`
            return api(originalRequest)
        } catch (refreshError) {
            return Promise.reject(refreshError)
        }

   
}
    return Promise.reject(error)
}
)

export default api;