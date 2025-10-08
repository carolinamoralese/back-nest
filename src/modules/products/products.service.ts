import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { CreateProductDTO } from 'src/dto/create-products.dto';
import { UpdateProductDTO } from 'src/dto/update-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private usersRepo: Repository<Product>,
  ) {}
  findAll() {
    return this.usersRepo.find();
  }

  async findOne(id: number) {
    const prodcuctFind = await this.usersRepo.findOne({ where: { id: id } });
    if (!prodcuctFind) throw new NotFoundException('Producto no encontrado');
    return prodcuctFind;
  }

  createProduct(newProduct: CreateProductDTO) {
    const productCreate = this.usersRepo.create(newProduct);
    return this.usersRepo.save(productCreate);
  }

  async updateProduct(id: number, updateProduct: UpdateProductDTO) {
    await this.usersRepo.update(id, updateProduct);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.usersRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('usuario no encontrado');
    return { deleted: true };
  }
}
