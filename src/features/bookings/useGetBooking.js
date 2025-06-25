import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";


const useGetBooking = ({ id }) => {
    return useQuery({
        queryKey: ["booking", id],
        queryFn: () => getBooking(id),
    });
}

export default useGetBooking;