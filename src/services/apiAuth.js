import axiosInstance from "./axiosInstance";

const handleRequest = async (request) => {
    try {
        const response = await request();
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
};

export const login = async (credentials) =>
    handleRequest(() => axiosInstance.post("/auth/login", credentials));

export const getLoggedInUser = async () =>
    handleRequest(() => axiosInstance.get("/auth/me"));

export const logout = async () =>
    handleRequest(() => axiosInstance.post("/auth/logout"));

export const register = async (userData) =>
    handleRequest(() => axiosInstance.post("/auth/register", userData));

export const updateUserData = async (userData) =>
    handleRequest(() => axiosInstance.put("/auth/update", userData));

export const updateUserPassword = async (passwordData) =>
    handleRequest(() => axiosInstance.put("/auth/updatepassword", passwordData));

export const uploadAvatar = async (formData) =>
    handleRequest(() =>
        axiosInstance.post("/auth/uploadimage", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    );
