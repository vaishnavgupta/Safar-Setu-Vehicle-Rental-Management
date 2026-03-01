import axiosInstance from "../api/axios.js";

export const loginUser = (data) => {
    return axiosInstance.post('/auth/login', data);
};

export const getProfile = () => {
    return axiosInstance.get('/api/user/profile');
};