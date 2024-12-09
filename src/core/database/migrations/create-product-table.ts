import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "price" NUMERIC NOT NULL,
        "coinType" VARCHAR(2) CHECK ("coinType" IN ('$','R$')) NOT NULL,
        "stockAmount" INT NOT NULL,
        "userId" INT,
        CONSTRAINT "FK_user_product" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "products"');
  }
}
