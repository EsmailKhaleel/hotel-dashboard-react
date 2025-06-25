import axiosInstance from "./axiosInstance";


export const getBookings = async ({ filter, sortQuery, page }) => {
    const response = await axiosInstance.get('/bookings', { 
      params: { 
        status: filter.value,
        sortBy: sortQuery.field,
        sortOrder: sortQuery.direction,
        page
       } 
    });
    return response.data;
};

export const getBooking = async (id) => {
    const response = await axiosInstance.get(`/bookings/${id}`);
    return response.data.booking;
};

export const updateBooking = async (id, data) => {
    const response = await axiosInstance.patch(`/bookings/${id}`, data);
    return response.data.booking;
};

export const deleteBooking = async (id) => {
    const response = await axiosInstance.delete(`/bookings/${id}`);
    return response.data;
};

// Get bookings after a specific date
// expects ?date=ISODate

export const getBookingsAfterDate = async (date) => {
    const response = await axiosInstance.get('/bookings/after-date', {
        params: { date }
    });
    return response.data;
}

// Get stays after a specific date
// expects ?date=ISODate

export const getStaysAfterDate = async (date) => {
    const response = await axiosInstance.get('/bookings/stays-after-date', {
        params: { date }
    });
    return response.data;
}

// Get stays that theitr activity is today
export const getStaysTodayActivity = async () => {
    const response = await axiosInstance.get('/bookings/stays-today-activity');
    return response.data;
}