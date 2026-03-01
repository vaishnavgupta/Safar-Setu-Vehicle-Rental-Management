import axiosInstance from "../api/axios.js";

export const searchReservations = (params) => {
    return axiosInstance.get("/api/reservations", {params: params})
}

export const allotReservation = () => {
    return null;
}

export const cancelReservation = () => {
    return null;
}