import axiosInstance from "../api/axios.js";

export const getVehicleCategory = () => {
    return axiosInstance.get('/api/category/top-level')
}