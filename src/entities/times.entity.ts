import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('time')
export class Time {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  date: string;

  @Column({ type: 'varchar', length: 255 })
  hours_worked: string;
}
