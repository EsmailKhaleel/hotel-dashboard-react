import axiosInstance from "./axiosInstance";


export async function getSettings() {
  const response = await axiosInstance.get("/settings");
  return response.data.settings;
}

export async function updateSetting(newSetting) {
  const response = await axiosInstance.patch("/settings", newSetting);
  return response.data.settings;
}

export async function resetSettings() {
  const response = await axiosInstance.post("/settings/reset");
  return response.data.settings;
}