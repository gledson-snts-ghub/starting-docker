import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1733839975174 implements MigrationInterface {
    name = 'CreateTable1733839975174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "user_code" character varying(255) NOT NULL, CONSTRAINT "UQ_23351656ab098559729ac15f50a" UNIQUE ("user_code"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "times" ("id" SERIAL NOT NULL, "userId" character varying(255) NOT NULL, "date" character varying(255) NOT NULL, "hours_worked" character varying(255) NOT NULL, CONSTRAINT "PK_21a9ce7a877cba720e30089638e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "times"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
