import axiosInstance from "../api/axios.js";

export const fetchAllSubscriptions = () => {
    return axiosInstance.get("/api/subscription-plans");
}

export const fetchActiveSubscriptions = () => {
    return axiosInstance.get("/api/subscriptions/active");
}

export const subscribeToSubscription = (data) => {
    return axiosInstance.post("/api/subscriptions/subscribe", data);
}

export const verifyPayment = (data) => {
    return axiosInstance.post("/api/payments/verify", data);
}