import api from './api';

const branchServiceService = {
  addBranchService: async (branchServiceData) => {
    const response = await api.post('/branchService', branchServiceData);
    return response.data;
  },

  getBranchServiceById: async (branchServiceId) => {
    const response = await api.get(`/branchService/${branchServiceId}`);
    return response.data;
  },

  getAllBranchServices: async () => {
    const response = await api.get('/branchService');
    return response.data;
  },

  deleteBranchService: async (branchServiceId) => {
    const response = await api.delete(`/branchService/${branchServiceId}`);
    return response.data;
  },
};

export default branchServiceService; 