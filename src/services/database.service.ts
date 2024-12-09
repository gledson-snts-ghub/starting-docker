import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      await this.generateMigration();
      await this.dataSource.runMigrations();
      const migrations = this.dataSource.migrations;
      console.log('Loaded migrations:', migrations);

      console.log('Migrations completed successfully');
    } catch (error) {
      console.error('Error while running migrations:', error);
    }
  }

  private async generateMigration() {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();
      await queryRunner.query(
        'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR, age INT)',
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error generating migration:', error);
    } finally {
      await queryRunner.release();
    }
  }
}
