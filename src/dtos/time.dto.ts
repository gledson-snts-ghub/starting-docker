import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTimeDto {
  @IsNotEmpty()
  @IsNumber()
  userId: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  hours_worked: string;
}
