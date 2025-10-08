import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateProductDTO } from '../../dto/create-products.dto';
import { UpdateProductDTO } from '../../dto/update-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }
  @Post()
  createUser(@Body() body: CreateProductDTO) {
    return this.productsService.createProduct(body);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    return this.productsService.updateProduct(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}
