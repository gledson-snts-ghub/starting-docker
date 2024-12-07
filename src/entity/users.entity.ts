// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()  // ID único
  id: number;

  @Column()  // Define uma coluna 'name'
  name: string;

  @Column()  // Define uma coluna 'age'
  age: number;
}
