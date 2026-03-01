import axiosInstance from "../api/axios.js";

export const getUserRentals = (status, page=0, size=20) => {
    const params = {page, size};

    if(status) {
        params.status = status;
    }

    return axiosInstance.get("/api/vehicle-rentals/my", {params})
}
