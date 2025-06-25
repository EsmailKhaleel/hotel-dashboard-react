import { useMutation } from "@tanstack/react-query"
import { login } from "../../services/apiAuth"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (credentials) => {
            return await login(credentials);
        },
        onError: (error) => {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials and try again.");
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            toast.success("Login successful!");
            navigate("/dashboard");
        },
    }
    );
}

export default useLogin