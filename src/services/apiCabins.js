import axiosInstance from "./axiosInstance";


export const getCabins = async () => {
    const response = await axiosInstance.get('/cabins');
    return response.data.cabins;
};

export const deleteCabin = async (cabinId) => {
    const response = await axiosInstance.delete(`/cabins/${cabinId}`);
    return response.data;
};

export const createCabin = async (data, existingImageUrl) => {

    const formData = prepareFormData(data, existingImageUrl);

    const response = await axiosInstance.post('/cabins', formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.cabin;
};

export const updateCabin = async (id, data, existingImageUrl) => {

    const formData = prepareFormData(data, existingImageUrl);

    const response = await axiosInstance.patch(`/cabins/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.cabin;
};


export const prepareFormData = (data, existingImageUrl) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (key === "image") {

            if (value instanceof FileList && value.length > 0 && value[0] instanceof File && value[0].type.startsWith("image/")) {
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