import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin, updateCabin } from "../../services/apiCabins";

export const useCabinMutation = (isEdit, id) => {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: async ({ data, existingImageUrl }) => {
      return isEdit
        ? updateCabin(id, data, existingImageUrl)
        : createCabin(data, existingImageUrl);
    },

    onSuccess: () => {
      toast.success(isEdit ? "Cabin updated successfully!" : "Cabin created successfully!");
    },

    onError: (error) => {
      toast.error(`Failed to ${isEdit ? "update" : "create"} cabin: ${error.message}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

  });

}