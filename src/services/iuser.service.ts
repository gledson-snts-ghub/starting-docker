import { CreateUserDto } from "src/dtos/users.dto";
import { User } from "src/entities/users.entity";

export interface IUserService {
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
  }
  