import { Injectable } from '@nestjs/common';
import { IUProduct } from '../../interface';
import { NotFoundException } from '@nestjs/common';

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
      id: 2,
      name: 'limon',
      description: 'fruta citrica',
      price: 1000,
    },
  ];
  findAll(): IUProduct[] {
    return this.products;
  }

  findOne(id: number): IUProduct {
    const prodcuctFind = this.products.find((product) => product.id === id);
    if (!prodcuctFind) throw new NotFoundException('Producto no encontrado');
    return prodcuctFind;
  }

  createProduct(user: Omit<IUProduct, 'id'>): IUProduct {
    const newId =
      this.products.length > 0
        ? this.products[this.products.length - 1].id + 1
        : 1;

    const newProduct: IUProduct = { id: newId, ...user };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: number, newProduct: Omit<IUProduct, 'id'>): IUProduct {
    const product = this.findOne(id);
    Object.assign(product, newProduct);
    return product;
  }

  remove(id: number): { deleted: boolean } {
    const index = this.products.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('Producto no encontrado');
    this.products.splice(index, 1);
    return { deleted: true };
  }
}
