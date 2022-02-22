import axios from 'axios';

export function useAxios() {
  const PRODUCTION = import.meta.env.PROD;

  const axiosInstance = axios.create({
    baseURL: PRODUCTION ? 'https://api.suiteescolar.com' : 'http://localhost:3030',
    withCredentials: true,
  });

  return axiosInstance;
}
