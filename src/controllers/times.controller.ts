import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTimeDto } from '../dtos/times.dto';
import { Time } from '../entities/times.entity';
import { TimeService } from '../services/time.service';

@Controller('times')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Get()
  async getAllTimes(): Promise<Time[]> {
    return this.timeService.getAllTimes();
  }

  @Post()
  async createTime(@Body() createTimeDto: CreateTimeDto): Promise<Time> {
    return this.timeService.createTime(createTimeDto);
  }

  @Get('user/:userId')
  async getAllTimeByUserId(@Param('userId') userId: number): Promise<Time[]> {
    return this.timeService.getAllTimeById(userId);
  }
}
