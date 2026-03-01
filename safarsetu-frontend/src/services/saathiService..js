import axiosInstance from "../api/axios.js";

export const getAISuggestion = (data) => {
    return axiosInstance.post("/ai", data);
}