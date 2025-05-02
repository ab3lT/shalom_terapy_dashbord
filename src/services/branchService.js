import api from './api';

const branchService = {
  getAllBranches: async () => {
    const response = await api.get('/branch');
    return response.data;
  },

  addBranch: async (branchData) => {
    const response = await api.post('/branch', branchData);
    return response.data;
  },

  updateBranch: async (branchData) => {
    const response = await api.put('/branch', branchData);
    return response.data;
  },

  deleteBranch: async (branchId) => {
    const response = await api.delete(`/branch/${branchId}`);
    return response.data;
  },
};

export default branchService; 