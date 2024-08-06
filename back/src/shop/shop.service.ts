import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { ShopProduct } from './entities/shop_product.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_REPOSITORY')
    private shopRepository: Repository<Shop>,
    @Inject('SHOP_PRODUCT_REPOSITORY')
    private shopProductRepository: Repository<any>,
  ) {}
  async createShop(createShopDto: CreateShopDto) {
    return await this.shopRepository.save(createShopDto);
  }

  async findAllProductInShop(shopId: number) {
    return await this.shopProductRepository.find({
      where: {
        shop: {
          id: shopId,
        },
      },
      relations: { product: true },
    });
  }

  async findOne(id: number) {
    return await this.shopRepository.findOne({ where: { id } });
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
