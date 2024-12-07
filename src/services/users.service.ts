
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  private users = [];

  create(createUserDto: CreateUserDto) {
    const user = { id: this.users.length + 1, ...createUserDto };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }
}
