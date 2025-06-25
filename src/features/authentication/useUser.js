import { useQuery } from "@tanstack/react-query"
import { getLoggedInUser } from "../../services/apiAuth"


const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getLoggedInUser,
    });
}

export default useUser;