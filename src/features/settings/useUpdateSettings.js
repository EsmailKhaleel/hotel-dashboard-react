import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting } from "../../services/apiSettings"
import toast from "react-hot-toast";


const useUpdateSettings = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSetting,

        onSuccess: () => {
            toast.success("Settings updated successfully!");
        },

        onError: (error) => {
            toast.error(`Failed to update settings: ${error.message}`);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },

    });
};

export default useUpdateSettings;