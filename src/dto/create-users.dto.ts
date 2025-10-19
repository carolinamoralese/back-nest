import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    example: 'carolina morales',
    description: 'nombre completo de usuario',
  })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'carolina@gamil.com',
    description: 'Email valido del usuario',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'contraseña minima de 6 caracteres y maximo de 10',
  })
  @MinLength(6)
  @MaxLength(10)
  password: string;

  @ApiProperty({ description: 'Edad del usuario' })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'la edad debe ser mayor o igual a 0' })
  age?: number;
}
