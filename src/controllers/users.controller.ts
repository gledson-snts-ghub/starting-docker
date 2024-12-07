import { Controller, Get, Post, Body } from '@nestjs/common';
import { IUserService } from '../services/iuser.service';
import { CreateUserDto } from '../dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: IUserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return {
      users: this.userService.findAll()
    }
  }
}
