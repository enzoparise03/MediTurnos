import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://localhost:3000/api', 
    withCredentials: true 
});

export default clienteAxios;