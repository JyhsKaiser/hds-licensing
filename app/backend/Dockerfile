FROM node:20-alpine

WORKDIR /app

# Copiamos archivos de configuración del monorepo
COPY package*.json ./
COPY tsconfig.base.json ./

# Copiamos los paquetes locales necesarios
COPY packages/database ./packages/database
COPY packages/shared-schemas ./packages/shared-schemas
COPY apps/backend ./apps/backend

# Instalamos dependencias
RUN npm install

# Generamos el cliente de Prisma
RUN npm run db:generate

# Exponemos el puerto de Fastify
EXPOSE 3000

# Comando para desarrollo (puedes cambiarlo a start en prod)
CMD ["npm", "run", "dev", "--workspace=apps/backend"]