import { Injectable } from '@nestjs/common';
import { IUProduct } from '../../interface';

@Injectable()
export class ProductsService {
  private products: IUProduct[] = [
    {
      id: 1,
      name: 'naranja',
      description: 'fruta citrica',
      price: 2000,
    },
    {
      id: 3,
      name: 'limon',
      description: 'fruta citrica',
      price: 1000,
    },
  ];
  findAll(): IUProduct[] {
    return this.products;
  }
}
