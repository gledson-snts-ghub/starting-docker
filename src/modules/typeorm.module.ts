import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'node:process';
import { User } from 'src/entities/users.entity';

console.log(env.POSTGRES_USER);

if (!env.POSTGRES_USER || !env.POSTGRES_PASSWORD || !env.POSTGRES_DB) {
  throw new Error(
    'Missing required database configuration in environment variables.',
  );
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: env.POSTGRES_TYPE_NAME,
  host: env.POSTGRES_NAME_DEV,
  port: parseInt(env.POSTGRES_PORT, 10) || 5432,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [User],
};
