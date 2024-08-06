import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role, Roles } from '../roles/decorators/roles.decorator';
import { ProductAddStorageDto } from './dto/product-add-storage.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @Roles(Role.admin)
  async create(
    @Request() req: any,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productService.create(req.user, createProductDto);
  }

  @Post('add_storage')
  @Roles(Role.seller)
  async product_add_storage(
    @Request() req: any,
    @Body() dto: ProductAddStorageDto,
  ) {
    return await this.productService.product_add_storage(req.user, dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
