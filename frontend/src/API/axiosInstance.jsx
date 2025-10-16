import axios from "axios";
import { REFRESH_TOKEN } from "../externalApi/ExternalUrls.js";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
});

// Automatically add token
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("bearerToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

// Handle expired tokens
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const { data } = await axios.post(REFRESH_TOKEN, {
                    refreshToken,
                });

                const newAccessToken = data.accessToken;
                localStorage.setItem("bearerToken", newAccessToken);

                // Update headers and retry
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Refresh token invalid or expired — logging out");
                localStorage.removeItem("bearerToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/sign-in";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
