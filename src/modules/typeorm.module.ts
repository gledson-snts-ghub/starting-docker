import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { env } from 'node:process';
import { User } from 'src/entities/users.entity';
import { Product } from '../entities/product.entity';
import { DatabaseService } from '../services/database.service';

if (!env.POSTGRES_USER || !env.POSTGRES_PASSWORD || !env.POSTGRES_DB) {
  throw new Error(
    'Missing required database configuration in environment variables.',
  );
}

const typeOrmConfig: TypeOrmModuleOptions = {
  type: env.POSTGRES_TYPE_NAME,
  host: env.POSTGRES_NAME_DEV,
  port: parseInt(env.POSTGRES_PORT, 10) || 5432,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [User, Product],
  synchronize: false,
  migrations: [],
  migrationsRun: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Product]),
  ],
  providers: [DatabaseService],
})
export class TypeormModule {}
