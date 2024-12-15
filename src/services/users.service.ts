import { CreateUserDto } from '->dtos/users.dto';
import { User } from '->entities/users.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  login(user_code: string): Promise<User>;
}

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.user_code || createUserDto.user_code.length === 0)
      throw new BadRequestException('User code not found');

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async login(user_code: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_code });
    if (!user) {
      throw new NotFoundException(`User with user_code ${user_code} not found`);
    }
    return user;
  }
}
