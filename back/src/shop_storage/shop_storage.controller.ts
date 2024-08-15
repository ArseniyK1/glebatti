import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ShopStorageService } from './shop_storage.service';
import { AddProductStorageDto } from './dto/add-product-storage.dto';
import { Role, Roles } from '../roles/decorators/roles.decorator';
import { CatalogueListDto } from './dto/catalogue-list.dto';

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
      req.user.shopId,
      dto,
    );
  }

  @Roles(Role.seller)
  @Get('productList')
  async productListStorage(@Request() req: any) {
    return await this.shopStorageService.productListStorage(req.user.shopId);
  }

  @Roles(Role.seller, Role.admin)
  @Delete('remove')
  async productListStorageByOrder(
    @Request() req: any,
    @Query() query: { productId: string },
  ) {
    return await this.shopStorageService.removeProduct(
      req.user.shopId,
      +query.productId,
    );
  }

  @Get('catalogueList')
  async catalogueList(@Query() query: CatalogueListDto) {
    return await this.shopStorageService.catalogueList(query);
  }
}
