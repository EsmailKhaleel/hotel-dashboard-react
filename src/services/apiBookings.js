import axiosInstance, { handleRequest } from "./axiosInstance";

export const getBookings = async ({ filter, sortQuery, page }) => {
  return handleRequest(() =>
    axiosInstance.get("/bookings", {
      params: {
        status: filter.value,
        sortBy: sortQuery.field,
        sortOrder: sortQuery.direction,
        page,
      },
    })
  );
};

export const getBooking = async (id) => {
  return handleRequest(() => axiosInstance.get(`/bookings/${id}`), "booking");
};

export const createBooking = async (data) => {
  return handleRequest(() => axiosInstance.post("/bookings", data), "booking");
};

export const updateBooking = async (id, data) => {
  return handleRequest(() => axiosInstance.patch(`/bookings/${id}`, data), "booking");
};

export const deleteBooking = async (id) => {
  return handleRequest(() => axiosInstance.delete(`/bookings/${id}`));
};

export const getBookingsAfterDate = async (date) => {
  return handleRequest(() =>
    axiosInstance.get("/bookings/after-date", {
      params: { date },
    })
  );
};

export const getStaysAfterDate = async (date) => {
  return handleRequest(() =>
    axiosInstance.get("/bookings/stays-after-date", {
      params: { date },
    })
  );
};

export const getStaysTodayActivity = async () => {
  return handleRequest(() => axiosInstance.get("/bookings/stays-today-activity"));
};
