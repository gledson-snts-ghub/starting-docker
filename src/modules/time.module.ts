import { TimeController } from '->controllers/times.controller';
import { Time } from '->entities/times.entity';
import { User } from '->entities/users.entity';
import { TimeService } from '->services/times.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Time, User])],
  providers: [TimeService],
  controllers: [TimeController],
})
export class TimeModule {}
