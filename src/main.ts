import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
config();

import { AppModule } from '->modules/app.module';


export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.NEST_PORT ?? 4000, '0.0.0.0');
}
bootstrap();
