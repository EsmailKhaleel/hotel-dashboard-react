import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useDelete = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (bookingId) => deleteBooking(bookingId),
        onSuccess: () => {
            toast.success("Booking deleted successfully!");
        },
        onError: (error) => {
            toast.error(`Error deleting booking: ${error.message}`);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ active: true });
        },
    });
}

export default useDelete