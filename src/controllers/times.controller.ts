import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTimeDto } from '../dtos/times.dto';
import { Time } from '../entities/times.entity';
import { TimeService } from '../services/time.service';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Post()
  async createTime(@Body() createTimeDto: CreateTimeDto): Promise<Time> {
    return this.timeService.createTime(createTimeDto);
  }

  @Get('user/:userId')
  async getAllTimeByUserId(@Param('userId') userId: string): Promise<Time[]> {
    return this.timeService.getAllTimeById(userId);
  }
}
