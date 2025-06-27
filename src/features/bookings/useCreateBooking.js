import { useMutation } from "@tanstack/react-query"
import { createBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";


const useCreateBooking = () => {
    return useMutation({
        mutationFn: (booking) => createBooking(booking),
        onSuccess: () => {
            toast.success("Booking Created Successfully");
        },
        onError: (error) => {
            toast.error(`Error creating booking: ${error.message}`);
        }
    });
}

export default useCreateBooking;