import { useMutation, useQueryClient } from "@tanstack/react-query"
import { resetSettings } from "../../services/apiSettings"
import toast from "react-hot-toast";


const useResetSettings = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: resetSettings,

        onSuccess: () => {
            toast.success("Settings reset to default values!");
        },

        onError: (error) => {
            toast.error(`Failed to reset settings: ${error.message}`);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },

    });
};

export default useResetSettings;