import axiosInstance from "../api/axios.js";

export const getVehicleWithFilters = (data) => {
    return axiosInstance.post('/api/vehicle/search', data)
}