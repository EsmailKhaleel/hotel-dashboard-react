import axiosInstance, { handleRequest } from "./axiosInstance";

// Get all settings
export async function getSettings() {
  return handleRequest(() => axiosInstance.get("/settings"), "settings");
}

// Update settings
export async function updateSetting(newSetting) {
  return handleRequest(() => axiosInstance.patch("/settings", newSetting), "settings");
}

// Reset settings to default
export async function resetSettings() {
  return handleRequest(() => axiosInstance.post("/settings/reset"), "settings");
}
