import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            localStorage.removeItem("token");
            queryClient.removeQueries(); // Remove all queries from the cache
            navigate("/login", { replace: true });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Logout failed. Please try again.");
        },
    });
};

export default useLogout;