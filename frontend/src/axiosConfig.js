// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3456',
  });
  

export default instance;
