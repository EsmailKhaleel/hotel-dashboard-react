import { useQuery } from "@tanstack/react-query"
import { getSettings } from "../../services/apiSettings";


const useSettings = () => {
    return useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });
};

export default useSettings;