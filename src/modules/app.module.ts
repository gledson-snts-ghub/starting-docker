import { Module } from '@nestjs/common';
import { TypeOrmModule } from './typeorm.module';
import { UsersModule } from './users.module';
import { UsersController } from 'src/controllers/users.controller';
import { UsersService } from 'src/services/users.service';


@Module({
  imports: [
    UsersModule,
    TypeOrmModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
