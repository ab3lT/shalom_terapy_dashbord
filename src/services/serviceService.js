import api from './api';

const serviceService = {
  getAllServices: async () => {
    const response = await api.get('/service');
    return response.data;
  },

  addService: async (serviceData) => {
    const response = await api.post('/service', serviceData);
    return response.data;
  },

  updateService: async (serviceId, serviceData) => {
    const response = await api.put(`/service/${serviceId}`, serviceData);
    return response.data;
  },

  deleteService: async (serviceId) => {
    const response = await api.delete(`/service/${serviceId}`);
    return response.data;
  },
};

export default serviceService; 