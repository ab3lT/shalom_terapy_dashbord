import api from './api';

const employeeService = {
  getAllEmployees: async () => {
    const response = await api.get('/employee');
    return response.data;
  },

  addEmployee: async (employeeData) => {
    const response = await api.post('/employee', employeeData);
    return response.data;
  },

  updateEmployee: async (employeeData) => {
    const response = await api.put('/employee', employeeData);
    return response.data;
  },
};

export default employeeService; 