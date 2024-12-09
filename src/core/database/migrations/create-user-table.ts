// const { MigrationInterface, QueryRunner } = require('typeorm');

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "age" INT NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user"');
  }
}
