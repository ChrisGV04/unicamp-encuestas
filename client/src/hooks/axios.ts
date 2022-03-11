import axios from 'axios';

export function useAxios() {
  const PRODUCTION = import.meta.env.PROD;

  const axiosInstance = axios.create({
    baseURL: PRODUCTION ? 'https://api.suiteescolar.com' : 'http://localhost:5000',
    withCredentials: true,
  });

  return axiosInstance;
}
