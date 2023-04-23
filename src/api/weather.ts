import axios from 'axios';
import { WeatherResponse } from '../interfaces/weather.interface';
import { AxiosResponse } from 'axios';
import { CurrentWeatherResponse } from '../interfaces/currentWeather.interface';
const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?';
const urlCurrent = 'https://api.openweathermap.org/data/2.5/weather?';
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
      `${urlForecast}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
    );
  },
  getCurrentWeather: async (
    lat: number,
    lon: number,
    unit: Units = Units.Metric
  ): Promise<AxiosResponse<CurrentWeatherResponse>> => {
    return await axios.get(
      `${urlCurrent}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
    );
  },
};
