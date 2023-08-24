import axios from 'axios';
import config from '../src/config/config';

const api = axios.create({ baseURL: config.API_BASE_URL });

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

export default {
    createHouse,
    getHouseById,
    updateHouseDetails,
  };