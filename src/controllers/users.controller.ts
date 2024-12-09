import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Get()
  async findAll() {
    return {
      users: await this.userService.findAll(),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.getById(Number(id));
    return user;
  }
}
