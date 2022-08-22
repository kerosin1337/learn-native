import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.31.151:3000',
  withCredentials: true,
});

api.interceptors.request.use(async config => {
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      (await AsyncStorage.getItem('accessToken')) || ''
    }`,
  };
  return config;
});

export default api;
