import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:3000/api",
    baseURL: "https://hotel-dashboard-server.vercel.app/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// 1️ Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        if (
            config.url &&
            config.url.startsWith("/auth") &&
            !["/auth/login", "/auth/register", "/auth/refresh-token", "/auth/logout"].some((route) =>
                config.url.includes(route)
            )
        ) {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2 Refresh Token Logic
let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, token = null) => {
    failedRequestsQueue.forEach((promise) => {
        error ? promise.reject(error) : promise.resolve(token);
    });
    failedRequestsQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if 401, not retried, and not in ignored paths
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/login") &&
            !originalRequest.url.includes("/auth/register") &&
            !originalRequest.url.includes("/auth/refresh-token") &&
            !originalRequest.url.includes("/auth/logout")
        ) {
            originalRequest._retry = true;

            // Already refreshing -> queue requests
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                });
            }

            // Not refreshing -> refresh now
            isRefreshing = true;

            try {
                if (!localStorage.getItem("token")) {
                    window.location.href = "/login";
                    return Promise.reject(error);
                }

                const refreshRes = await axiosInstance.post("/auth/refresh-token", {}, { withCredentials: true });
                const { token } = refreshRes.data;

                if (token) {
                    localStorage.setItem("token", token);
                    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
                    processQueue(null, token);
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem("token");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

