import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.230:3333',
});

export { api };
