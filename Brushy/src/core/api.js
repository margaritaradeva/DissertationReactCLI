import axios from 'axios'

// So we dont have to provide them every single time we make a request
const api = axios.create ({
    baseURL:  'http://10.0.2.2:8000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;