import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ShopStorageService } from './shop_storage.service';
import { AddProductStorageDto } from './dto/add-product-storage.dto';
import { Role, Roles } from '../roles/decorators/roles.decorator';

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

  @Roles(Role.seller)
  @Get('productList')
  async productListStorage(@Request() req: any) {
    return await this.shopStorageService.productListStorage(req.user.shopId);
  }
}
