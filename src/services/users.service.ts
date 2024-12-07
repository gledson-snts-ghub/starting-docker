import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../dtos/users.dto';
import { IUserService } from './iuser.service';
import { User } from 'src/entities/users.entity';


@Injectable()
export class UsersService implements IUserService {
  private users: User[] = [];  

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = { id: Date.now(), ...createUserDto }; 
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
