import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User as CreateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    const user = await this.userService.create(CreateUserDto);
    return user;
  }

  @Get()
  async findAll() {
    return {
      users: await this.userService.findAll(),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const user = await this.userService.getById(id);
    return user;
  }

  @Post('login')
  async login(@Body() user_code: string) {
    const user = await this.userService.login(user_code);
    return user;
  }
}
