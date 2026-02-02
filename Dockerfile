# Root Dockerfile: delega al Dockerfile real del backend
FROM node:20-alpine AS base
WORKDIR /app

# Copiamos SOLO backend
COPY backend/package*.json ./backend/
COPY backend/prisma ./backend/prisma
COPY backend/src ./backend/src
COPY backend/tsconfig*.json ./backend/
COPY backend/nest-cli.json ./backend/
# Si tenés otros archivos usados por build (por ej. .env.example), agregalos acá.

WORKDIR /app/backend
RUN npm ci
RUN npx prisma generate
RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start:prod"]
