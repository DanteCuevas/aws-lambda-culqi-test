## Project Specifications

**Tecnologías usadas**
- DOCKER
- DOCKER COMPOSE 3
- Node v16.19.1
- Postgres 15
- Redis 7.2.1
- Vue 2.6.11
- Serverless

**Requisito**

- Instalar Docker en tu máquina(https://docs.docker.com/engine/install/)

**Instalacion**
- Clonar el proyecto. 
- Ingresar a la carpeta del proyecto.
- Copiar y pegar el archivo .env.example a .env
```bash
cp .env.example .env
```
- Iniciar los contenedores: 
```bash
docker-compose up -d
```
- Entrar al contenedor: 
```bash
docker-compose exec -it serverless-node-culqi bash
```
- Ejecutar los test: 
```bash
npm run test
```
- Ejecutar los test sin entrar al contenedor: 
```bash
docker-compose exec serverless-node-culqi npm run test
```
- Para probar los endpoints usar el archivo de postman.collections adjuntado: 
```bash
CulqiChallenge.postman_collection.json
```
- Todos los test ejecutados exitosamente: 
![alt text](https://raw.githubusercontent.com/DanteCuevas/aws-lambda-culqi-test/main/screan-test.jpg)