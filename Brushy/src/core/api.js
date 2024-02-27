import axios from 'axios';

// Your Heroku app's base URL
const HEROKU_BASE_URL = 'https://expo-brushy-56de67f02740.herokuapp.com';

// Initialize axios with the Heroku base URL
const api = axios.create ({
    baseURL: HEROKU_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;