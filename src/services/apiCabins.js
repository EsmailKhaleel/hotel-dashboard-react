import axiosInstance, { handleRequest } from "./axiosInstance";

// Fetch all cabins
export const getCabins = async () => {
  return handleRequest(() => axiosInstance.get("/cabins"), "cabins");
};

// Delete a cabin by ID
export const deleteCabin = async (cabinId) => {
  return handleRequest(() => axiosInstance.delete(`/cabins/${cabinId}`));
};

// Create a new cabin with optional image
export const createCabin = async (data, existingImageUrl) => {
  const formData = prepareFormData(data, existingImageUrl);
  return handleRequest(
    () =>
      axiosInstance.post("/cabins", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    "cabin"
  );
};

// Update an existing cabin by ID
export const updateCabin = async (id, data, existingImageUrl) => {
  const formData = prepareFormData(data, existingImageUrl);
  return handleRequest(
    () =>
      axiosInstance.patch(`/cabins/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    "cabin"
  );
};

// Helper: Convert data + image to FormData
export const prepareFormData = (data, existingImageUrl) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "image") {
      if (
        value instanceof FileList &&
        value.length > 0 &&
        value[0] instanceof File &&
        value[0].type.startsWith("image/")
      ) {
        console.log("Appending new image file:", value[0]);
        formData.append("image", value[0]);
      } else if (existingImageUrl) {
        console.log("Appending existing image URL:", existingImageUrl);
        formData.append("image", existingImageUrl);
      }
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};
