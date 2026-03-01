import axiosInstance from "../api/axios.js";

export const getVehicleWithFilters = (data) => {
    return axiosInstance.post('/api/vehicle/search', data)
}

export const createVehicle = (data) => axiosInstance.post("/api/admin/vehicle", data);
export const updateVehicle = (id, data) => axiosInstance.put("/api/vehicle/" + id, data);
export const hardDeleteVehicle = (id) => axiosInstance.delete("/api/admin/vehicle/" + id + "/hard");