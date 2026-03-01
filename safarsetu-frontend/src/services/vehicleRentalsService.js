import axiosInstance from "../api/axios.js";

export const checkoutVehicleRequest = (data) => {
    return axiosInstance.post("/api/vehicle-rentals/checkout", data)
}

export const returnRentalForUser = (data) => {
    return axiosInstance.get("/api/vehicle-rentals/checkin" , data)
}