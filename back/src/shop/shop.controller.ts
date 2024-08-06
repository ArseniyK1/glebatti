import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Role, Roles } from '../roles/decorators/roles.decorator';
import { FindAllInStorageDto } from './dto/find-all-in-storage.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Roles(Role.admin)
  @Post()
  createShop(@Body() createShopDto: CreateShopDto) {
    return this.shopService.createShop(createShopDto);
  }

  @Roles(Role.seller, Role.admin)
  @Get('/findAllProductInShop')
  findAllProductInShop(@Query() query: FindAllInStorageDto) {
    return this.shopService.findAllProductInShop(+query.shopId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(+id);
  }
}
