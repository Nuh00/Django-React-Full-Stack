import axios from 'axios';
import { ACCESS_TOKEN } from './constants';




const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});




// This is the interceptor that will be called before each request
// It checks if the user is logged in and if so, it adds the token to the request
api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export default api;