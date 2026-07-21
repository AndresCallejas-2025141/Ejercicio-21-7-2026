# ServidorCRUD

## Objetivo

Desarrollar un servidor HTTP utilizando únicamente el módulo nativo http de Node.js para implementar un CRUD de productos y clientes, respondiendo en formato JSON y siguiendo la arquitectura REST.

## Tecnologías utilizadas

- Node.js
- TypeScript
- TSX
- PNPM

---

## Instalación

1. Clonar el proyecto.
2. Instalar las dependencias.

```bash
pnpm install
```

---

## Ejecución

Modo desarrollo

```bash
pnpm run dev
```

Compilar

```bash
pnpm run build
```

Ejecutar versión compilada

```bash
pnpm run start
```

## Rutas disponibles

### Productos

GET /productos

GET /productos/:id

POST /productos

PUT /productos/:id

DELETE /productos/:id

### Clientes

GET /clientes

GET /clientes/:id

POST /clientes

PUT /clientes/:id

DELETE /clientes/:id