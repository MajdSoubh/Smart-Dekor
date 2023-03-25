import axios from "axios";

const http = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});
http.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(null, (error) => {
    console.log("error : ", error);
    const { response } = error;

    if (response && response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
    }
    /* toast */
    return Promise.reject(error);
});
export default http;
