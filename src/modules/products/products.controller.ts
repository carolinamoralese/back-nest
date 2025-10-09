import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateProductDTO } from '../../dto/create-products.dto';
import { UpdateProductDTO } from '../../dto/update-products.dto';
import { ParseUpperPipe } from 'src/common/pipes/parse-upper.pipe';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.productsService.findOne(Number(id));
  }
  @Post()
  createUser(@Body() body: CreateProductDTO) {
    return this.productsService.createProduct(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateProduct(@Param('id', ParseIntPipe) id, @Body() body: UpdateProductDTO) {
    return this.productsService.updateProduct(Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    return this.productsService.remove(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-name/:name')
  findByName(@Param('name', ParseUpperPipe) name: string) {
    return this.productsService.findByName(name);
  }
}
