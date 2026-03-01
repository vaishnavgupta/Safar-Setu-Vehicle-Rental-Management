import axiosInstance from "../api/axios.js";

export const signUpUser = (data) => {
    return axiosInstance.post('/auth/register', data);
};

export const loginUser = (data) => {
    return axiosInstance.post('/auth/login', data);
};

export const getProfile = () => {
    return axiosInstance.get('/api/user/profile');
};

export const updateProfile = (data) => {
    return axiosInstance.patch('/api/user/details', data)
}

export const updateUserProfileImage = (data) => {
    return axiosInstance.patch('/api/user/image' , data)
}



