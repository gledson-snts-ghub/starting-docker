import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsIn(['$', 'R$'], { message: 'coinType must be either "$" or "R$"' })
  coinType: '$' | 'R$';

  @IsNumber()
  @Min(0)
  stockAmount: number;

  @IsOptional()
  @ValidateIf((o) => o.userId !== undefined) // Apenas valida se `userId` for enviado
  @IsNumber()
  userId?: number;
}
