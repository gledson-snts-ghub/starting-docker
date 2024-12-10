import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('times')
export class Time {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Number })
  userId: number;

  @Column({ type: 'varchar', length: 255 })
  date: string;

  @Column({ type: 'varchar', length: 255 })
  hours_worked: string;
}
