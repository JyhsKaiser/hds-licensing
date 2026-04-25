FROM node:20-alpine

# Instalamos openssl y dependencias necesarias para Prisma en Alpine
RUN apk add --no-cache openssl

WORKDIR /app

# Copiamos archivos de configuración del monorepo
COPY package*.json ./
COPY tsconfig.base.json ./

# Copiamos los paquetes locales necesarios
COPY packages/database ./packages/database
COPY packages/shared-schemas ./packages/shared-schemas
COPY app/backend ./app/backend

# Instalamos dependencias
RUN npm install

# Generamos el cliente de Prisma específicamente para el entorno del contenedor
RUN npm run generate --workspace=@hds/database

# Exponemos el puerto de Fastify
EXPOSE 3000

# Comando para desarrollo
CMD ["npm", "run", "dev", "--workspace=@hds/backend"]