import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:000/api', // must match backend port
});
