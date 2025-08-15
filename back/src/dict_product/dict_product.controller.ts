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
import { DictProductService } from './dict_product.service';
import { CreateDict_productDto } from './dto/create-dict_product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role, Roles } from '../roles/decorators/roles.decorator';
import { ProductListDto } from './dto/product-list.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { extname } from 'path';
import { memoryStorage } from 'multer';

@Controller('dict_product')
export class DictProductController {
  constructor(private readonly dictProductService: DictProductService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: memoryStorage(),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @Roles(Role.admin)
  async create(
    @Request() req: any,
    @Body() createProductDto: CreateDict_productDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return await this.dictProductService.create(createProductDto, photo);
  }

  // @Post('add_storage')
  // @Roles(Role.seller)
  // async product_add_storage(
  //   @Request() req: any,
  //   @Body() dto: ProductAddStorageDto,
  // ) {
  //   return await this.productService.product_add_storage(req.user, dto);
  // }

  @Get('list')
  findAll(@Query() query: ProductListDto) {
    return this.dictProductService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictProductService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictProductService.remove(+id);
  }
}
