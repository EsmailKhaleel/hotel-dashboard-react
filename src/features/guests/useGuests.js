import { useQuery } from "@tanstack/react-query"
import { getGuests } from "../../services/apiGuests";

const useGuests = () => {
    return useQuery({
        queryKey: ["guests"],
        queryFn: getGuests
    });
}

export default useGuests