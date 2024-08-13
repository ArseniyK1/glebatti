import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopStorageService } from './shop_storage.service';
import { AddProductStorageDto } from './dto/add-product-storage.dto';

@Controller('shop-storage')
export class ShopStorageController {
  constructor(private readonly shopStorageService: ShopStorageService) {}

  @Post('add_product')
  async add_product_storage(
    @Request() req: any,
    @Body() dto: AddProductStorageDto,
  ) {
    return await this.shopStorageService.add_product_storage(
      req.user.userId,
      dto,
    );
  }
}
