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
- Copiar y pegar los enviroments.
```bash
cp .env.example .env
```
```bash
cp .env.test.example .env.test
```
- Iniciar los contenedores:
```bash
docker-compose up -d
```
- Ejecutar las migraciones para produccion y test:
```bash
docker-compose exec -it serverless-node-culqi npm run sync-db-tables
```
```bash
docker-compose exec -it serverless-node-culqi npm run sync-db-tables-test
```
- Si no se pudo ejecutar las migraciones verificar si postgres esta okey e intentar de nueva ejecutar las migraciones:
```bash
docker-compose exec -it serverless-postgres-culqi postgres --version
```
- Ejecutar los test:
```bash
docker-compose exec serverless-node-culqi npm run test
```
- Antes formulario en vue verificar si el serverless responde ya que su instanciacion demora:
```bash
curl http://localhost:3001
```
- Ingresar a la siguiente direccion para probar la tokenizacion desde formulario:
```bash
http://localhost:8081
```
- Para probar los endpoints usar el archivo de postman.collections adjuntado:
```bash
CulqiChallenge.postman_collection.json
```
- Todos los test ejecutados exitosamente:
![alt text](https://raw.githubusercontent.com/DanteCuevas/aws-lambda-culqi-test/main/screan-test.jpg)