# MediTurnos — API (Backend)

API REST para la gestión de turnos de un centro médico. Permite registrar usuarios, iniciar sesión con JWT, administrar profesionales y reservar turnos evitando que un profesional tenga dos turnos en el mismo horario.

Forma parte del proyecto **MediTurnos**. El cliente web está en [`../frontendTurnos`](../frontendTurnos).

## Tecnologías

- **Node.js** + **Express 5**
- **MongoDB** con **Mongoose**
- **JSON Web Token (JWT)** guardado en una cookie `httpOnly`
- **express-validator** para validar los datos de entrada
- **Jest** + **Supertest** para tests unitarios y de integración
- dotenv, cors, cookie-parser, nodemon

## Estructura

```
Backend/
├── src/
│   ├── app.js                    # Punto de entrada: middlewares, CORS y rutas
│   ├── config/
│   │   └── db.js                 # Conexión a MongoDB
│   ├── controllers/              # Lógica de cada recurso
│   │   ├── usuarioController.js
│   │   ├── profesionalController.js
│   │   ├── turnoController.js
│   │   └── validaciones.js       # Regla de negocio: horario ocupado
│   ├── middlewares/
│   │   ├── authMiddleware.js     # verificarToken y verificarAdmin
│   │   └── validarTurno.js       # Validaciones con express-validator
│   ├── models/                   # Esquemas de Mongoose
│   │   ├── Usuario.js
│   │   ├── Profesional.js
│   │   └── Turno.js
│   ├── routes/                   # Definición de endpoints
│   └── tests/
│       ├── unitario.test.js
│       └── api.test.js
├── .env.example
└── package.json
```

## Requisitos

- Node.js 20 o superior
- MongoDB corriendo en local (o una URI de MongoDB Atlas)

## Instalación y ejecución

```bash
cd Backend
npm install
```

Crear el archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env            # Git Bash / Linux / macOS
Copy-Item .env.example .env     # PowerShell
```

Levantar el servidor:

```bash
npm run dev     # desarrollo (se reinicia solo con nodemon)
npm start       # ejecución normal
```

La API queda disponible en `http://localhost:3000/api`.

### Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `PORT` | Puerto del servidor | `3000` |
| `MONGODB_URI` | Cadena de conexión a MongoDB | `mongodb://127.0.0.1:27017/SistemaTurnoss` |
| `JWT_SECRET` | Clave con la que se firman los tokens | una cadena larga y aleatoria |
| `FRONTEND_URL` | Origen permitido por CORS (la URL del frontend) | `http://localhost:8080` |

## Tests

```bash
npm test
```

- **Unitarios** (`unitario.test.js`): prueban la regla que detecta si un profesional ya tiene ocupado un horario.
- **Integración** (`api.test.js`): prueban el registro de usuarios, el rechazo de emails duplicados y el bloqueo de rutas protegidas sin credenciales.

> ⚠️ Los tests de integración usan la base configurada en `MONGODB_URI` y **borran la colección de usuarios** antes de cada test. Antes de correrlos, apuntá `MONGODB_URI` a una base de prueba (por ejemplo `.../SistemaTurnos_test`).

## Autenticación y roles

- Al iniciar sesión, la API genera un JWT válido por **1 hora** que contiene el `id` y el `rol` del usuario, y lo guarda en una cookie `httpOnly` llamada `token`.
- Las rutas protegidas leen el token desde esa cookie:
  - sin token → `403`
  - token inválido o vencido → `401`
- Hay dos roles: `cliente` (por defecto) y `admin`. Las rutas marcadas como **Admin** responden `403` a usuarios sin ese rol.
- Las contraseñas se guardan hasheadas (HMAC‑SHA256) con un salt aleatorio distinto para cada usuario.

Si probás la API con Postman o Thunder Client, la cookie se guarda sola después del login y se envía en las siguientes peticiones a `localhost`.

## Endpoints

Base: `http://localhost:3000/api`

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/` | Público | Verifica que la API esté funcionando |

### Usuarios — `/api/usuarios`

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/registro` | Público | Registra un usuario |
| POST | `/login` | Público | Inicia sesión y guarda la cookie con el token |
| POST | `/logout` | Logueado | Cierra la sesión y borra la cookie |

### Profesionales — `/api/professionals`

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/` | Logueado | Lista profesionales. Filtro opcional: `?specialty=cardio` (no distingue mayúsculas) |
| GET | `/:id` | Logueado | Obtiene un profesional |
| POST | `/` | Admin | Crea un profesional |
| PUT | `/:id` | Admin | Actualiza un profesional |
| DELETE | `/:id` | Admin | Elimina un profesional |

### Turnos — `/api/turnos`

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/` | Logueado | Crea un turno para el usuario autenticado |
| GET | `/` | Logueado | Lista los turnos del usuario autenticado |
| PUT | `/:id` | Admin | Modifica un turno |
| PATCH | `/:id/estado` | Admin | Cambia solo el estado del turno |
| DELETE | `/:id` | Admin | Elimina un turno |

### Ejemplos de body

**Registro** — `POST /api/usuarios/registro`

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@correo.com",
  "contrasena": "clave123"
}
```

**Login** — `POST /api/usuarios/login`

```json
{
  "email": "juan@correo.com",
  "contrasena": "clave123"
}
```

**Crear profesional** — `POST /api/professionals` (Admin)

```json
{
  "nombre": "Laura",
  "apellido": "Gómez",
  "especialidad": "Cardiología",
  "email": "laura.gomez@mediturnos.com",
  "telefono": "11-5555-5555"
}
```

**Crear turno** — `POST /api/turnos`

```json
{
  "paciente": "<id del usuario>",
  "profesional": "<id del profesional>",
  "especialidad": "Cardiología",
  "fecha": "2026-10-15",
  "hora": "10:30"
}
```

El `usuarioId` del turno se toma del token, no del body. Si el profesional ya tiene un turno en esa fecha y hora, la API responde `400`.

**Cambiar estado** — `PATCH /api/turnos/:id/estado` (Admin)

```json
{
  "estado": "realizado"
}
```

Estados posibles: `pendiente` (por defecto), `cancelado`, `realizado`.

## Modelos

| Modelo | Campos |
|---|---|
| **Usuario** | `nombre`, `email` (único), `contrasena` (hash), `salt`, `rol` (`cliente` \| `admin`) |
| **Profesional** | `nombre`, `apellido`, `especialidad`, `email` (único), `telefono` |
| **Turno** | `paciente`, `profesional` (ref. a Profesional), `especialidad`, `fecha`, `hora`, `usuarioId`, `estado` |

## Carga inicial de datos

No hay un script de carga inicial, y los profesionales solo los puede crear un administrador. Para probar el sistema completo:

1. Registrá un usuario administrador enviando también `"rol": "admin"` en el body de `/api/usuarios/registro`.
2. Iniciá sesión con ese usuario.
3. Creá profesionales con `POST /api/professionals`.

Después, desde el frontend, cualquier usuario registrado puede verlos y reservar turnos.

## Mejoras pendientes

- Impedir que el rol se pueda elegir en el registro (hoy se acepta `rol` en el body) y crear los administradores por otra vía.
- Usar un algoritmo de hash de contraseñas pensado para eso (bcrypt o `crypto.scrypt`).
- Permitir que el paciente cancele su propio turno (hoy cancelar o eliminar requiere rol admin).
- Evitar reservas duplicadas simultáneas con un índice único `{ profesional, fecha, hora }`, y que los turnos cancelados liberen el horario.
- Usar una base de datos separada para los tests.
- Agregar un endpoint que devuelva el usuario autenticado, para que el frontend pueda mantener la sesión al recargar.

## Autor

**Enzo Nicolás Parise** — [@enzoparise03](https://github.com/enzoparise03)

Proyecto final de la carrera Desarrollador de páginas web y aplicaciones, Instituto Superior Santo Domingo.