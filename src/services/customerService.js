import api from './api';

const customerService = {
  getAllCustomers: async () => {
    const response = await api.get('/customer');
    return response.data;
  },

  addCustomer: async (customerData) => {
    const response = await api.post('/customer', customerData);
    return response.data;
  },

  updateCustomer: async (customerId, customerData) => {
    const response = await api.put(`/customer/${customerId}`, customerData);
    return response.data;
  },

  deleteCustomer: async (customerId) => {
    const response = await api.delete(`/customer/${customerId}`);
    return response.data;
  },

  searchByFirstName: async (firstName) => {
    const response = await api.get('/customer/searchByFirstName', {
      params: { first_name: firstName }
    });
    return response.data;
  },

  searchByPhoneNumber: async (phoneNumber) => {
    const response = await api.get('/customer/searchByPhoneNumber', {
      params: { phone_number: phoneNumber }
    });
    return response.data;
  },
};

export default customerService; 