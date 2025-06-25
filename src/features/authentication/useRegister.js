import { useMutation } from "@tanstack/react-query"
import { register } from "../../services/apiAuth"
import toast from "react-hot-toast";


const useRegister = () => {
    return useMutation({
        mutationFn: (userData) => register(userData),
        onSuccess: (data) => {
            toast.success(`Registration successful! Welcome, ${data.fullName || data.email}!`);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
        }
    });
}

export default useRegister;