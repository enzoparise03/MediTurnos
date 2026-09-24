import axios from 'axios';

// En desarrollo apunta al backend local; en producción usa /api,
// que Vercel reenvía al backend en Render
const clienteAxios = axios.create({
    baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:3000/api',
    withCredentials: true
});

export default clienteAxios;