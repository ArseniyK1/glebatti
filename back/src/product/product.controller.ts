import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role, Roles } from '../roles/decorators/roles.decorator';
import { ProductAddStorageDto } from './dto/product-add-storage.dto';
import { ProductListDto } from './dto/product-list.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @Roles(Role.admin)
  async create(
    @Request() req: any,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return await this.productService.create(createProductDto, photo);
  }

  @Post('add_storage')
  @Roles(Role.seller)
  async product_add_storage(
    @Request() req: any,
    @Body() dto: ProductAddStorageDto,
  ) {
    return await this.productService.product_add_storage(req.user, dto);
  }

  @Get('list')
  findAll(@Query() query: ProductListDto) {
    return this.productService.findAll(query);
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
