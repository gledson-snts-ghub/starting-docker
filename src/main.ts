import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { config } from 'dotenv';

config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log(process.env.NEST_PORT, "Iniciado.")
  await app.listen(process.env.NEST_PORT ?? 4000);
}
bootstrap();
