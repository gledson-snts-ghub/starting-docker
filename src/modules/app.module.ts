import { Module } from '@nestjs/common';
import { TimeModule } from './time.module';
import { TypeormModule } from './typeorm.module';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeormModule, UsersModule, TimeModule],
})
export class AppModule {}
