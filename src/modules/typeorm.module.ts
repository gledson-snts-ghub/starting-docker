import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entity/users.entity';  // Importe suas entidades
import {TypeOrmModule} from '@nestjs/typeorm'

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
