import axios from 'axios';
import config from '../config/config';

// Create a new instance of axios with the API base URL
const api = axios.create({ baseURL: config.API_BASE_URL });

// Request interceptor
api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Define API functions
const createHouse = async (data: any) => {
  try {
    const response = await api.post('/houses', data);
    return response.data;
  } catch (error) {
    throw new Error('Error creating house');
  }
};

const getHouseById = async (id: number) => {
  try {
    const response = await api.get(`/houses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching house details');
  }
};

const updateHouseDetails = async (id: number, data: any) => {
  try {
    const response = await api.put(`/houses/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error updating house details');
  }
};

// Export the API functions
export default {
    createHouse,
    getHouseById,
    updateHouseDetails,
  };