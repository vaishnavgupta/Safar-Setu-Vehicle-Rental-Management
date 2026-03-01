import axiosInstance from "../api/axios.js";

export const getCurrentReservations = (
    status = "ACTIVE",
    activeOnly = false,
    page = 0,
    size = 20,
    sortDirection = "DESC",
    sortBy = "reservedAt"
) => {
    return axiosInstance.get("/api/reservations/my")
}
