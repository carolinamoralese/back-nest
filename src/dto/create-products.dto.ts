import { IsNotEmpty, Min } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price: number;
}
