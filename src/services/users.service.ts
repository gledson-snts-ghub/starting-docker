import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { User as UserDto } from '../dtos/users.dto';

export interface IUserService {
  create(createUserDto: UserDto): Promise<User>;
  findAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
}

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async login(user_code: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_code });
    if (!user) {
      throw new Error(`User with user_code ${user_code} not found`);
    }
    return user;
  }
}
