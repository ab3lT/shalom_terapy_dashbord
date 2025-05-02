import api from './api';

const giftCardService = {
  createGiftCard: async (giftCardData) => {
    const response = await api.post('/gift_card/create', giftCardData);
    return response.data;
  },

  validateGiftCard: async (secretCode) => {
    const response = await api.get('/gift_card/validate', {
      params: { secret_code: secretCode }
    });
    return response.data;
  },

  viewGiftCard: async (secretCode) => {
    const response = await api.get('/gift_card/view', {
      params: { secret_code: secretCode }
    });
    return response.data;
  },

  updateGiftCard: async (giftCardData) => {
    const response = await api.put('/gift_card/update', giftCardData);
    return response.data;
  },

  useGiftCard: async (giftCardData) => {
    const response = await api.post('/gift_card/use_gift_card', giftCardData);
    return response.data;
  },
};

export default giftCardService; 