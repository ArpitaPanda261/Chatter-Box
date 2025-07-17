import axios from "axios";
import { useAuthStore } from "../store/authStore";


const instance = axios.create({
    baseURL: "https://chatter-box-server-8iqs.onrender.com/api", // This is the Express server
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;