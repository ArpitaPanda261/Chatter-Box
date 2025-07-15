import axios from "axios";
import { useAuthStore } from "../store/authStore";


const instance = axios.create({
    baseURL: "http://localhost:3000/api", // This is the Express server
    withCredentials: false,
});

instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;