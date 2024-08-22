import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { IsNull, Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_REPOSITORY')
    private shopRepository: Repository<any>,
  ) {}
  async createShop(createShopDto: CreateShopDto) {
    return await this.shopRepository.save(createShopDto);
  }

  async findAllProductInShop(shopId: number) {
    // return await this.shopProductRepository.find({
    //   where: {
    //     shop: {
    //       id: shopId,
    //     },
    //   },
    //   relations: { product: true },
    // });
  }

  async findAllProductInStorage() {
    // return await this.shopProductRepository.find({
    //   where: {
    //     shop: {
    //       id: IsNull(),
    //     },
    //   },
    //   relations: { product: true },
    // });
  }

  async findOne(id: number) {
    return await this.shopRepository.findOne({ where: { id } });
  }

  async getAllShops() {
    return await this.shopRepository.find();
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  async remove(id: number) {
    const shop = await this.shopRepository.findOne({ where: { id } });

    if (!shop?.id) throw new NotFoundException('Такого магазина нет');
    return await this.shopRepository.remove(shop);
  }
}
