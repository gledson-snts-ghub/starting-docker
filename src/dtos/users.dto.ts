import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    user_code: string;
}
