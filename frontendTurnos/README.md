# MediTurnos — Frontend

Aplicación web para que los pacientes de un centro médico se registren, inicien sesión, consulten los profesionales disponibles y reserven sus turnos online.

Forma parte del proyecto **MediTurnos** y consume la API que está en [`../Backend`](../Backend).

## Tecnologías

- **React 19** + **Vite**
- **React Router 7** para la navegación
- **React-Bootstrap** / **Bootstrap 5** para la interfaz
- **Zustand** para el estado de la sesión
- **Axios** para las peticiones a la API
- ESLint

## Requisitos

- Node.js 20 o superior
- El backend corriendo en `http://localhost:3000` (ver [README del backend](../Backend/README.md))

## Instalación y ejecución

```bash
cd frontendTurnos
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:8080`.

### Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con ESLint |

## Configuración

- **Puerto del frontend**: se define en `vite.config.js` (`8080`, con `strictPort` para que Vite no cambie de puerto solo). Tiene que coincidir con la variable `FRONTEND_URL` del `.env` del backend; si no, CORS bloquea las peticiones.
- **URL de la API**: se define en `src/config/axios.js` (`http://localhost:3000/api`). El cliente usa `withCredentials: true` para enviar la cookie de sesión en cada petición.

## Estructura

```
frontendTurnos/
├── public/
├── src/
│   ├── assets/                 # Logo
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── Footer.jsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── ProtectedRoute.jsx  # Redirige al login si no hay sesión
│   ├── config/
│   │   └── axios.js            # Cliente HTTP apuntando a la API
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── TurnosPage.jsx      # Profesionales + reserva de turno
│   │   ├── MisTurnosPage.jsx   # Agenda del paciente
│   │   ├── EspecialidadesPage.jsx
│   │   └── EstudiosPage.jsx
│   ├── stores/
│   │   └── useAuthStore.js     # Estado de sesión (Zustand)
│   ├── App.jsx                 # Definición de rutas
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Rutas

| Ruta | Acceso | Contenido |
|---|---|---|
| `/` | Público | Página de inicio |
| `/login` | Público | Inicio de sesión |
| `/registro` | Público | Registro de usuario |
| `/especialidades` | Público | Especialidades del centro (informativo) |
| `/estudios` | Público | Estudios médicos y su preparación (informativo) |
| `/turnos` | Requiere sesión | Listado de profesionales y reserva de turnos |
| `/mis-turnos` | Requiere sesión | Turnos reservados por el usuario |

Cualquier otra ruta redirige al inicio.

## Cómo se usa

1. Crear una cuenta en **Registrarse**.
2. Iniciar sesión: la app redirige a la sección de profesionales.
3. Elegir un profesional y tocar **Solicitar turno**.
4. Seleccionar la fecha (desde hoy en adelante) y el horario (de 09:00 a 19:30, cada 30 minutos) y confirmar.
5. Ver los turnos reservados en **Mis turnos**.

Para que aparezcan profesionales, primero hay que cargarlos en la base con un usuario administrador (ver la sección *Carga inicial de datos* del README del backend).

## Manejo de la sesión

- El token lo guarda el backend en una cookie `httpOnly`, así que el navegador lo envía automáticamente y JavaScript no puede leerlo desde la cookie.
- El frontend guarda en Zustand los datos básicos del usuario (email e id) para mostrar la navbar y proteger rutas con `ProtectedRoute`.
- Ese estado vive en memoria: al recargar la página hay que volver a iniciar sesión.

## Mejoras pendientes

- Mantener la sesión al recargar, consultando al backend si la cookie sigue siendo válida.
- Mostrar el estado real de cada turno (hoy la tabla muestra siempre "Confirmado").
- Permitir que el paciente cancele sus turnos (requiere un cambio en el backend, que hoy solo permite eliminar turnos a administradores).
- Configurar la URL de la API con una variable de entorno (`VITE_API_URL`).
- Ajustar el título y el idioma de `index.html`.

## Autor

**Enzo Nicolás Parise** — [@enzoparise03](https://github.com/enzoparise03)

Proyecto final de la carrera Desarrollador de páginas web y aplicaciones, Instituto Superior Santo Domingo.