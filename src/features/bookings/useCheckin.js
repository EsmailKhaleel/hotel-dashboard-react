import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";


const useCheckin = () => {
const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true,
            ...breakfast
        }),
        onSuccess: (booking) => {
            toast.success(`Booking #${booking._id.slice(0, 8)} successfully checked in!`);
            queryClient.invalidateQueries({ active: true });
        },
        onError: (error) => {
            toast.error(`Error checking in booking: ${error.message}`);
        }
    });
}

export default useCheckin