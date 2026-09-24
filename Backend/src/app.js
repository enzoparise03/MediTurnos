// ejecutamos la libreria dotenv para que lea el archivo .env
require('dotenv').config(); 

// importamos la libreria express
const express = require('express');

// importamos la funcion creada en db.js para conectar la bases
const conectarBaseDeDatos = require('./config/db'); 

// importamos el middleware cors
const cors = require('cors');

// Importamos cookie parser
const cookieParser = require('cookie-parser');

// 1. CREACIÓN DE LA INSTANCIA (Nace la variable 'aplicacion')
const aplicacion = express();

// Importa las rutas
const rutaDeTurnos = require('./routes/turnoRoutes');
const rutasDeUsuarios = require('./routes/usuarioRoutes');
const profesionalRoutes = require('./routes/profesionalRoutes');

// 2. MIDDLEWARES GLOBALES (Se ejecutan en orden de arriba hacia abajo)
aplicacion.use(express.json());
aplicacion.use(cookieParser());

// 3. CONFIGURACIÓN DE CORS CORRECTA (Usamos 'aplicacion', no 'app')
aplicacion.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080', // Origen explícito de tu Frontend de Vite
    credentials: true,               // Fundamental: Permite recibir la Cookie HTTP-Only
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ejecutamos la funcion de base de datos
conectarBaseDeDatos();

// ruta base get para verificar que el servidor responda
aplicacion.get('/api', (req, res) => {
    res.send('API de Sistema de Turnos funcionando perfectamente ');
});

// Registramos las rutas de la api
aplicacion.use('/api/turnos', rutaDeTurnos);
aplicacion.use('/api/usuarios', rutasDeUsuarios);
aplicacion.use('/api/professionals', profesionalRoutes);

// exportamos la aplicacion para que supertest pueda importarla
module.exports = aplicacion;

// puerto en el que va a escuchar el servidor
const PUERTO = process.env.PORT || 3000;

// solo le decimos al servidor que se ponga a escuchar si no estamos corriendo tests
if (process.env.NODE_ENV !== 'test') {
    aplicacion.listen(PUERTO, () => {
        console.log(`Servidor corriendo en el puerto ${PUERTO}`);
    });
}