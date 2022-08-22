import api from '../index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const current = async () => {
  return await api
    .get('users/current')
    .then(async response => {
      return response.data;
    })
    .catch(error => {
      console.log(error.response);
    });
};
