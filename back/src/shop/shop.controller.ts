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
import { FindAllInShopDto } from './dto/find-all-in-shop.dto';
import { Public } from '../auth/public.decorator';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Roles(Role.admin)
  @Post('create')
  async createShop(@Body() createShopDto: CreateShopDto) {
    return await this.shopService.createShop(createShopDto);
  }

  @Get('/findAllProductInShop')
  async findAllProductInShop(@Query() query: FindAllInShopDto) {
    return await this.shopService.findAllProductInShop(+query.shopId);
  }

  @Public()
  @Get('/list')
  async getAllShops() {
    return await this.shopService.getAllShops();
  }

  @Roles(Role.seller, Role.admin)
  @Get('/findAllProductInStorage')
  async findAllProductInStorage() {
    return await this.shopService.findAllProductInStorage();
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
