import axiosInstance, { handleRequest } from "./axiosInstance";

export const getGuests = async () => {
  return handleRequest(() => axiosInstance.get("/guests"), "guests");
};
