import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attaching JWT Token Automatically
axiosInstance.interceptors.request.use((config) => {
    const jwtToken = localStorage.getItem("token");

    if( jwtToken ) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    return config;
})

// Removing JWT From Local Storage if expired
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;