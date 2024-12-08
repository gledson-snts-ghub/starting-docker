import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.module';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
