import axiosInstance from "../api/axios.js";

export const fetchAllTopCategories = () => {
    return axiosInstance.get("/api/category/top-level")
}

export const addCategory = (data) => {
    return axiosInstance.post("/api/admin/category", data)
}

export const getAllCategory = () => {
    return axiosInstance.get("/api/category")
}

export const updateCategory = (data, id) => {
    return axiosInstance.put("/api/admin/category/"+id, data);
}

export const permanentlyDeleteCategory = (id) => {
    return axiosInstance.delete("/api/admin/category/"+id+"/hard");
}