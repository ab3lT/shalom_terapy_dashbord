import api from './api';

const awardService = {
  getAllAwards: async () => {
    const response = await api.get('/award');
    return response.data;
  },

  addAward: async (awardData) => {
    const response = await api.post('/award', awardData);
    return response.data;
  },

  updateAward: async (awardId, awardData) => {
    const response = await api.put(`/award/${awardId}`, awardData);
    return response.data;
  },

  deleteAward: async (awardId) => {
    const response = await api.delete(`/award/${awardId}`);
    return response.data;
  },

  generateGiftCard: async (customerId) => {
    const response = await api.post('/award/generateGiftCard', { customer_id: customerId });
    return response.data;
  },
};

export default awardService; 