import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    updateUserData,
    updateUserPassword,
    uploadAvatar,
} from "../../services/apiAuth";

export const useUpdateUserData = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userData) => updateUserData(userData),
        onSuccess: (data) => {
            toast.success(`User data updated successfully: ${data.user.name} (${data.user.email})`);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            toast.error(`Error updating user data: ${error.message}`);
        },
    });
};

export const useUpdateUserPassword = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (passwordData) => updateUserPassword(passwordData),
        onSuccess: (data) => {
            toast.success(data.message || "Password updated successfully");
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            toast.error(`Error updating password: ${error.message}`);
        },
    });
};

export const useUploadAvatar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData) => uploadAvatar(formData),
        onSuccess: (data) => {
            toast.success(data.message || "Avatar uploaded successfully");
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            toast.error(`Error uploading avatar: ${error.message}`);
        },
    });
};
