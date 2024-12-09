import { Module } from '@nestjs/common';
import { TypeormModule } from './typeorm.module';
import { UsersModule } from './users.module';
import { ProductsModule } from './products.module';

@Module({
  imports: [TypeormModule, UsersModule, ProductsModule],
})
export class AppModule {}
