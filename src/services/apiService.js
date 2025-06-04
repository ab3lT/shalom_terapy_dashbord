import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_BASE_URL = 'http://localhost:8080/api/v1/shalom';
const AUTH_BASE_URL = 'http://localhost:8003/api/v1/shalom';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Add token to axios headers
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: (credentials) => axios.post(`${AUTH_BASE_URL}/auth/login`, credentials),
  changePassword: (data) => axios.post(`${AUTH_BASE_URL}/auth/changePassword`, data),
};

// Branch API
export const branchApi = {
  getAllBranches: () => axios.get(`${API_BASE_URL}/branch`),
  addBranch: (branchData) => axios.post(`${API_BASE_URL}/branch`, branchData),
  updateBranch: (branchId, branchData) => axios.put(`${API_BASE_URL}/branch/${branchId}`, branchData),
  deleteBranch: (branchId) => axios.delete(`${API_BASE_URL}/branch/${branchId}`),
};

// Customer API
export const customerApi = {
  addCustomer: (customerData) => axios.post(`${API_BASE_URL}/customer`, customerData),
  updateCustomer: (customerId, customerData) => axios.put(`${API_BASE_URL}/customer/${customerId}`, customerData),
  deleteCustomer: (customerId) => axios.delete(`${API_BASE_URL}/customer/${customerId}`),
  getAllCustomers: () => axios.get(`${API_BASE_URL}/customer`),
  searchByFirstName: (firstName) => axios.get(`${API_BASE_URL}/customer/searchByFirstName`, { params: { first_name: firstName } }),
  searchByPhoneNumber: (phoneNumber) => axios.get(`${API_BASE_URL}/customer/searchByPhoneNumber`, { params: { phone_number: phoneNumber } }),
};

// Service API
export const serviceApi = {
  addService: (serviceData) => axios.post(`${API_BASE_URL}/service`, serviceData),
  getAllServices: () => axios.get(`${API_BASE_URL}/service`),
  updateService: (serviceId, serviceData) => axios.put(`${API_BASE_URL}/service/${serviceId}`, serviceData),
  deleteService: (serviceId) => axios.delete(`${API_BASE_URL}/service/${serviceId}`),
};

// Employee API
export const employeeApi = {
  addEmployee: (employeeData) => axios.post(`${API_BASE_URL}/employee`, employeeData),
  getAllEmployees: () => axios.get(`${API_BASE_URL}/employee`),
  updateEmployee: (employeeData) => axios.put(`${API_BASE_URL}/employee`, employeeData),
};

// GiftCard API
export const giftCardApi = {
  createGiftCard: (giftCardData) => axios.post(`${API_BASE_URL}/gift_card/create`, giftCardData),
  validateGiftCard: (secretCode) => axios.get(`${API_BASE_URL}/gift_card/validate`, { params: { secret_code: secretCode } }),
  viewGiftCard: (secretCode) => axios.get(`${API_BASE_URL}/gift_card/view`, { params: { secret_code: secretCode } }),
  updateGiftCard: (giftCardData) => axios.put(`${API_BASE_URL}/gift_card/update`, giftCardData),
  useGiftCard: (giftCardData) => axios.post(`${API_BASE_URL}/gift_card/use_gift_card`, giftCardData),
};

// Booking API
export const bookingApi = {
  bookService: (bookingData) => axios.post(`${API_BASE_URL}/book/bookService`, bookingData),
  updateBooking: (bookingData) => axios.put(`${API_BASE_URL}/book/update`, bookingData),
  getAllBookings: () => axios.get(`${API_BASE_URL}/book/getAll`),
  getTodayBookings: () => axios.get(`${API_BASE_URL}/book/getToday`),
  getTodayBookedServicesByBranch: (branchId) => axios.get(`${API_BASE_URL}/book/getTodayBookedServicesByBranch`, { params: { branch_id: branchId } }),
  getBookingsByBranch: (branchId) => axios.get(`${API_BASE_URL}/book/getByBranchId`, { params: { branch_id: branchId } }),
};

// Award API
export const awardApi = {
  addAward: (awardData) => axios.post(`${API_BASE_URL}/award`, awardData),
  getAllAwards: () => axios.get(`${API_BASE_URL}/award`),
  updateAward: (awardId, awardData) => axios.put(`${API_BASE_URL}/award/${awardId}`, awardData),
  deleteAward: (awardId) => axios.delete(`${API_BASE_URL}/award/${awardId}`),
  generateGiftCard: (customerId) => axios.post(`${API_BASE_URL}/award/generateGiftCard`, { customer_id: customerId }),
};
