import { Time } from '->entities/times.entity';
import { User } from '->entities/users.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'node:process';

if (!env.POSTGRES_USER || !env.POSTGRES_PASSWORD || !env.POSTGRES_DB) {
  throw new Error(
    'Missing required database configuration in environment variables.',
  );
}

const typeOrmConfig: TypeOrmModuleOptions = {
  type: env.POSTGRES_TYPE_NAME as any,
  host: env.POSTGRES_HOST || 'localhost',
  port: parseInt(env.POSTGRES_PORT, 10) || 5432,
  username: env.POSTGRES_USER || 'postgres',
  password: env.POSTGRES_PASSWORD || 'password',
  database: env.POSTGRES_DB || 'database',
  entities: [__dirname + '/../entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Time]),
  ],
})
export class TypeormModule {}
