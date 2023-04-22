import axios from 'axios';
const url = 'https://api.openweathermap.org/geo/1.0/direct?';
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

export const geocoderApi = {
  getCity: async (limit: number) => {
    return await axios.get(`${url}q=Paris&limit=${limit}&appid=${apiKey}`);
  },
};
