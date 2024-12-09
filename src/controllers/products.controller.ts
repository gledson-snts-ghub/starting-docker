import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/product.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.productsService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.productsService.delete(id);
    return { message: 'Product deleted successfully' };
  }

  @Patch(':id/decrease-stock')
  async decreaseStock(@Param('id') id: number, @Body('amount') amount: number) {
    return await this.productsService.decreaseStock(id, amount);
  }
}
