import axiosInstance from "../api/axios.js";

export const fetchAllUsers = () => {
    return axiosInstance.get("/api/user/list")
}