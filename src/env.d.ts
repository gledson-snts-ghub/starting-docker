import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

declare namespace NodeJS {
  interface ProcessEnv {
    DOCKER_NETWORK: string;
    POSTGRES_TYPE_NAME: PostgresConnectionOptions['type'];
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
  }
}
