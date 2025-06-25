import { useQuery } from "@tanstack/react-query"
import { getStaysTodayActivity } from "../../services/apiBookings"

getStaysTodayActivity
const useTodayActivity = () => {
    return useQuery({
        queryKey: ["today-Activity"],
        queryFn: getStaysTodayActivity,
        refetchInterval: 1000 * 60 * 5,
    })
}

export default useTodayActivity