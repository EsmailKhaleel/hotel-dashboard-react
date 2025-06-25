import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";


const useDeleteCabin = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCabin,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
            toast.success("Cabin deleted successfully");
        },

        onError: (error) => {
            toast.error(`Error deleting cabin: ${error.message}`);
        }

    });
    
}

export default useDeleteCabin;