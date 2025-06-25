import axios from "axios";

const BASE_URL = "http://localhost:3000/api/settings";

export async function getSettings() {
  const response = await axios.get(BASE_URL);
  return response.data.settings;
}

export async function updateSetting(newSetting) {
  const response = await axios.patch(BASE_URL, newSetting);
  return response.data.settings;
}

export async function resetSettings() {
  const response = await axios.post(BASE_URL + "/reset");
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay
  return response.data.settings;
}