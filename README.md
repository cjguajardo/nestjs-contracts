## Descripción

Microservicio en nodejs que crea y obtiene contratos desde una base de datos pgsql.

## Configurar variables de entorno
  
```bash
DATABASE_URL="postgresql://acl_user:123456.acl@database:5432/acl_contracts?schema=public"

POSTGRES_DB="acl_contracts"
POSTGRES_USER="acl_user"
POSTGRES_PASSWORD="123456.acl"
```

## Correr con Docker

```bash
$ docker-compose up -d --build
```
La instalación con docker automatiza los siguientes procesos:
  - instalación de dependencias.
  - Ejecución de migración.
  - Ejecución del proyecto (dev).

## Correr sin Docker

```bash
# Instalar dependencias
$ npm install

# Ejecutar migración
$ npx prisma migrate dev

# development
$ npm run start
```

### Otros modos de ejecución
```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

### Crear contrato
```bash
POST http://localhost:3000/contract
```
```json
{
  "clientname": "John Doe",
  "email": "john@doe.com",
  "initialdate": "2021-09-01T00:00:00.000Z",
  "accountNumber": "01-8456-8567",
  "amount": 1000000,
  "currency": "USD"
}
```

### Obtener contratos
```bash
GET http://localhost:3000/contractList
```
```json
[
  {
    "clientname": "John Doe",
    "email": "john@doe.com",
    "initialdate": "2021-09-01T00:00:00.000Z",
    "accountNumber": "01-8456-8567",
    "amount": 1000000,
    "currency": "USD"
  }
]
```

## Documentación

### Swagger
```bash
http://localhost:3000/api
```