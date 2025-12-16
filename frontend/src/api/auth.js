import axios from "axios";

const authApi = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
});

authApi.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default authApi;