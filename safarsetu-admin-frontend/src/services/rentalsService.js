import axiosInstance from "../api/axios.js";

export const searchRentals = (data) => {
    return axiosInstance.post("/api/admin/vehicle-rentals/search", data)
}

export const returnRentalForUser = (data) => {
    return axiosInstance.post("/api/vehicle-rentals/checkin" , data)
}

export const markDamaged = (data) => {
    return axiosInstance.get("/api/admin/vehicle-rentals/search", data)
}

export const markLost = (data) => {
    return axiosInstance.get("/api/admin/vehicle-rentals/search", data)
}
