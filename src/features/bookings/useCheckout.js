import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";


const useCheckout = () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: (bookingId) => updateBooking(bookingId, {
                status: "checked-out"
            }),
            onSuccess: (booking) => {
                toast.success(`Booking #${booking._id.slice(0, 8)} successfully checked out!`);
                queryClient.invalidateQueries({ active: true });
            },
            onError: (error) => {
                toast.error(`Error checking out booking: ${error.message}`);
            }
        });
    }

export default useCheckout
