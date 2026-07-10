# 🐾 Red Huellas Seguras

SPA para la gestión de adopciones de mascotas: registro e inicio de sesión de usuarios, catálogo de animales disponibles, solicitudes de adopción (usuarios), y administración de mascotas, usuarios y solicitudes (administradores).

> **Nota:** Este repositorio es la versión **TypeScript** del proyecto. La versión original en JavaScript se encuentra en [este repositorio](https://github.com/fressiarf/reactQuiz).

**Stack:** React 19 · Vite · TypeScript · React Router · React Bootstrap · SweetAlert2 · JSON Server.

---

## Estructura

```
src/
├── components/     Componentes reutilizables (Navbar, Sidebar, formularios, tarjetas, etc.)
├── pages/          Páginas de la aplicación (Home, Login, Registro, Admin, Adopción, etc.)
├── routes/         Configuración de rutas públicas y privadas
├── services/       Servicios para consumo de la API REST (fetch)
├── style/          Hojas de estilo CSS por componente/página
├── img/            Recursos de imagen (logos, fondos)
└── assets/         Otros recursos estáticos
db.json             Base de datos simulada (JSON Server)
```

---

## Requisitos

- **Node.js** 18+
- **npm** 9+

---

## Puesta en marcha

### 1. Instalar dependencias

```bash
npm install
```

### 2. Levantar el servidor de datos (JSON Server)

```bash
npx json-server db.json --port 3001
```

Esto expone la API REST simulada en `http://localhost:3001` con los endpoints:

| Recurso        | Endpoint                          |
| -------------- | --------------------------------- |
| Usuarios       | `http://localhost:3001/usuarios`   |
| Adopciones     | `http://localhost:3001/adopciones` |
| Solicitudes    | `http://localhost:3001/solicitudes`|
| Casos de éxito | `http://localhost:3001/casosExito` |

### 3. Levantar la aplicación

En otra terminal:

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

---

## Scripts

| Script            | Acción                                             |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Arranca el servidor de desarrollo (Vite + HMR)     |
| `npm run build`   | Genera el bundle de producción                     |
| `npm run preview` | Previsualiza el build de producción                |
| `npm run lint`    | Ejecuta ESLint sobre el proyecto                   |

---

## Cuenta de demostración

| Rol   | Correo                    | Contraseña  |
| ----- | ------------------------- | ----------- |
| Admin | `friveraffwd@gmail.com`   | `2020`      |

Los usuarios regulares se crean desde el formulario de **Registro** de la aplicación.

---

## Funcionalidades

### Públicas (sin autenticación)
- Página de inicio con hero, sección "¿Quiénes somos?" y casos de éxito.
- Catálogo de mascotas disponibles para adopción.
- Registro de nuevos usuarios.
- Inicio de sesión.

### Usuario autenticado
- Editar perfil (nombre, correo, teléfono, foto).
- Solicitar la adopción de una mascota (formulario con datos de contacto y mensaje).
- Ver el estado de sus solicitudes (Pendiente / Aprobada / Rechazada).

### Administrador
- **Gestionar usuarios:** ver, editar y eliminar usuarios registrados.
- **Gestionar adopciones:** crear, editar y eliminar mascotas del catálogo.
- **Gestionar solicitudes:** ver solicitudes de adopción, aprobar o rechazar.
- Panel de administración con sidebar de navegación.

---

## Rutas

| Ruta                     | Acceso    | Descripción                     |
| ------------------------ | --------- | ------------------------------- |
| `/` · `/home`            | Pública   | Página de inicio                |
| `/login`                 | Pública   | Inicio de sesión                |
| `/registro`              | Pública   | Registro de usuario             |
| `/adopcion`              | Pública   | Catálogo de mascotas            |
| `/perfil`                | Privada   | Perfil del usuario              |
| `/formulario-adopcion`   | Privada   | Formulario de solicitud         |
| `/mis-solicitudes`       | Privada   | Solicitudes del usuario         |
| `/admin`                 | Privada   | Admin — gestión de usuarios     |
| `/admin-adopcion`        | Privada   | Admin — gestión de adopciones   |
| `/admin-solicitudes`     | Privada   | Admin — gestión de solicitudes  |

Las rutas privadas redirigen a `/login` si no hay un token almacenado en `localStorage`.

---

## Tecnologías

| Tecnología         | Uso                                          |
| ------------------ | -------------------------------------------- |
| React 19           | Librería de UI                               |
| TypeScript         | Tipado estático                              |
| Vite               | Bundler y servidor de desarrollo             |
| React Router v7    | Enrutamiento SPA                             |
| React Bootstrap    | Componentes de interfaz                      |
| Bootstrap 5        | Framework CSS base                           |
| SweetAlert2        | Alertas y diálogos interactivos              |
| React Icons        | Iconos (FontAwesome, etc.)                   |
| JSON Server        | API REST simulada sobre `db.json`            |

---

## Descripción para GitHub

> **Red Huellas Seguras** — Plataforma de adopción de mascotas construida con React + TypeScript + Vite. Permite a los usuarios explorar mascotas disponibles, enviar solicitudes de adopción y gestionar su perfil; los administradores pueden administrar el catálogo de animales, usuarios y solicitudes. Utiliza JSON Server como API REST simulada. *Versión TypeScript del [proyecto original en JavaScript](https://github.com/fressiarf/gestion-adopciones).*
