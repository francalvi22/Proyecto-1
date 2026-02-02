import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

function parseOrigins(value?: string): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Si detrás de proxy (Render/Fly/NGINX), ayuda a que Nest detecte IP real
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  // Seguridad básica de headers
  app.use(helmet());

  // CORS: cerrado y configurable por ENV
  // ENV recomendado: FRONTEND_ORIGINS="http://localhost:3000,https://TUAPP.vercel.app"
  const allowedOrigins = parseOrigins(process.env.FRONTEND_ORIGINS);

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (Postman, curl, health checks)
      if (!origin) return callback(null, true);

      // Si no seteaste FRONTEND_ORIGINS, por defecto solo localhost (dev)
      if (allowedOrigins.length === 0) {
        return callback(null, origin === 'http://localhost:3000');
      }

      return callback(null, allowedOrigins.includes(origin));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validación global con DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);

  console.log(`✅ Backend corriendo en http://localhost:${port}`);
}
bootstrap();
