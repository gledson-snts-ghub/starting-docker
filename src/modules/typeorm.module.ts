import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { env } from 'node:process';
import { User } from 'src/entities/users.entity';
import { Product } from '../entities/product.entity';

if (!env.POSTGRES_USER || !env.POSTGRES_PASSWORD || !env.POSTGRES_DB) {
  throw new Error(
    'Missing required database configuration in environment variables.',
  );
}

const typeOrmConfig: TypeOrmModuleOptions = {
  type: env.POSTGRES_TYPE_NAME as any, // "postgres"
  host: env.POSTGRES_HOST || 'localhost', // "postgres-container-dev"
  port: parseInt(env.POSTGRES_PORT, 10) || 5432,
  username: env.POSTGRES_USER || 'postgres',
  password: env.POSTGRES_PASSWORD || 'password',
  database: env.POSTGRES_DB || 'database',
  entities: [__dirname + '/../entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Product]),
  ],
})
export class TypeormModule {}
