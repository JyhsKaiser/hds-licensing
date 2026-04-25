FROM node:20-alpine

WORKDIR /app

# 1. Copiamos los archivos de configuración raíz para que NPM reconozca los workspaces
COPY package*.json ./
COPY tsconfig.base.json ./

# 2. Copiamos el paquete de esquemas compartidos (necesario para validación)
COPY packages/shared-schemas ./packages/shared-schemas

# 3. Copiamos la aplicación del frontend
COPY app/frontend ./app/frontend

# 4. Instalamos las dependencias de todo el proyecto
RUN npm install

# 5. Exponemos el puerto por defecto de Vite
EXPOSE 5173

# 6. Arrancamos en modo desarrollo permitiendo conexiones externas (host)
CMD ["npm", "run", "dev", "--workspace=@hds/frontend", "--", "--host"]