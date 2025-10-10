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
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findOne(@Param('id', ParseIntPipe) id) {
    return this.productsService.findOne(Number(id));
  }
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  createUser(@Body() body: CreateProductDTO) {
    return this.productsService.createProduct(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  updateProduct(@Param('id', ParseIntPipe) id, @Body() body: UpdateProductDTO) {
    return this.productsService.updateProduct(Number(id), body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  remove(@Param('id', ParseIntPipe) id) {
    return this.productsService.remove(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-name/:name')
  findByName(@Param('name', ParseUpperPipe) name: string) {
    return this.productsService.findByName(name);
  }
}
