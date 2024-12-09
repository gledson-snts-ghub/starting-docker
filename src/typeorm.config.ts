import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

// Carregar variáveis de ambiente do .env
config();

export const AppDataSource = new DataSource({
  type: process.env.POSTGRES_TYPE_NAME as any, // "postgres"
  host: process.env.POSTGRES_HOST || 'localhost', // "postgres-container-dev"
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'database',
  entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});
