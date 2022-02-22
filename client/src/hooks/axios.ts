import axios from 'axios';

export function useAxios() {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3030',
    withCredentials: true,
  });

  return axiosInstance;
}
