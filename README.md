# MediTurnos

Sistema web de turnos médicos: los pacientes se registran, consultan los profesionales disponibles y reservan sus turnos online. Está compuesto por una API REST con autenticación por JWT y roles de usuario, y un frontend en React.

## Funcionalidades

- Registro e inicio de sesión con JWT guardado en cookie `httpOnly`
- Roles de usuario: paciente y administrador
- Alta, edición y baja de profesionales (administrador)
- Reserva de turnos con control de horarios ya ocupados
- Agenda personal con los turnos del paciente
- Tests unitarios y de integración

## Tecnologías

| Parte | Stack |
|---|---|
| **Backend** | Node.js, Express 5, MongoDB + Mongoose, JWT, express-validator, Jest + Supertest |
| **Frontend** | React 19, Vite, React Router, React-Bootstrap, Zustand, Axios |

## Estructura

```
MediTurnos/
├── Backend/          → API REST
└── frontendTurnos/   → Aplicación web
```

## Cómo levantarlo

**Requisitos:** Node.js 20 o superior y MongoDB (local o Atlas).

**1. Backend**

```bash
cd Backend
npm install
cp .env.example .env    # completar las variables
npm run dev             # http://localhost:3000/api
```

**2. Frontend** (en otra terminal)

```bash
cd frontendTurnos
npm install
npm run dev             # http://localhost:8080
```

Para que aparezcan profesionales en el frontend, primero hay que cargarlos con un usuario administrador. Los pasos están en [Carga inicial de datos](Backend/README.md#carga-inicial-de-datos).

## Documentación

- [README del Backend](Backend/README.md): instalación, variables de entorno, endpoints, autenticación y tests.
- [README del Frontend](frontendTurnos/README.md): instalación, rutas, estructura y manejo de la sesión.

## Autor

**Enzo Nicolás Parise** — [@enzoparise03](https://github.com/enzoparise03)

Proyecto final de la carrera Desarrollador de páginas web y aplicaciones, Instituto Superior Santo Domingo.