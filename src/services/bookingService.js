import api from './api';

const bookingService = {
  bookService: async (bookingData) => {
    const response = await api.post('/book/bookService', bookingData);
    return response.data;
  },

  updateBooking: async (bookingData) => {
    const response = await api.put('/book/update', bookingData);
    return response.data;
  },

  getAllBookings: async () => {
    const response = await api.get('/book/getAll');
    return response.data;
  },

  getTodayBookings: async () => {
    const response = await api.get('/book/getToday');
    return response.data;
  },

  getTodayBookingsByBranch: async (branchId) => {
    const response = await api.get('/book/getTodayBookedServicesByBranch', {
      params: { branch_id: branchId }
    });
    return response.data;
  },

  getBookingsByBranch: async (branchId) => {
    const response = await api.get('/book/getByBranchId', {
      params: { branch_id: branchId }
    });
    return response.data;
  },
};

export default bookingService; 