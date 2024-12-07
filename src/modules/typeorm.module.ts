import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from 'src/entities/users.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT) ?? 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User],
};

TypeOrmModule.forRoot(typeOrmConfig)

export {TypeOrmModule}
