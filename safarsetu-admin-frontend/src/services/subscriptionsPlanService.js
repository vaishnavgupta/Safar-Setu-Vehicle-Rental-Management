import axiosInstance from "../api/axios.js";

export const getAllSubscriptionPlans  = ()     => axiosInstance.get("/api/subscription-plans");
export const createSubscriptionPlan  = (data)  => axiosInstance.post("/api/admin/subscription-plans", data);
export const updateSubscriptionPlan  = (id, data) => axiosInstance.put("/api/admin/subscription-plans/" + id, data);
export const deleteSubscriptionPlan  = (id)     => axiosInstance.delete("/api/admin/subscription-plans/" + id);