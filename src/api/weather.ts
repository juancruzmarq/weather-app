import axios from 'axios';
import { WeatherResponse } from '../interfaces/weather.interface';
import { AxiosResponse } from 'axios';
const url = 'https://api.openweathermap.org/data/2.5/forecast?';
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

enum Units {
  Metric = 'metric',
  Imperial = 'imperial',
  Standard = 'standard',
}

export const weatherApi = {
  getWeather: async (
    lat: number,
    lon: number,
    unit: Units = Units.Metric
  ): Promise<AxiosResponse<WeatherResponse>> => {
    return await axios.get(
      `${url}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
    );
  },
};
