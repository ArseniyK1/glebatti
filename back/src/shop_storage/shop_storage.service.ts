import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AddProductStorageDto } from './dto/add-product-storage.dto';
import { UserService } from '../user/user.service';
import { DictProductService } from '../dict_product/dict_product.service';

@Injectable()
export class ShopStorageService {
  constructor(
    @Inject('SHOP_STORAGE_REPOSITORY')
    private shopStorageRepository: Repository<any>,
    private userService: UserService,
    private dictProductService: DictProductService,
  ) {}
  async add_product_storage(userId: number, dto: AddProductStorageDto) {
    const shop = await this.userService.getShopSeller(userId);
    if (!shop?.id) {
      throw new BadRequestException('Этот продавец не привязан к магазину');
    }
    const checkQuantity = await this.dictProductService.checkQuantityForStorage(
      dto.productId,
      dto.quantity,
    );
    if (!checkQuantity) {
      throw new BadRequestException('Недостаточно товара на складе');
    }
    await this.dictProductService.reduceAmountProduct(
      dto.productId,
      dto.quantity,
    );
    return await this.shopStorageRepository.save({
      quantity: dto.quantity,
      cost_product: dto.cost_product,
      product: dto.productId,
      shop: shop.id,
    });
  }

  async findAll() {
    return `This action returns all shopStorage`;
  }

  async checkQuantityOnStorage(
    productId: number,
    quantity: number,
    shopId: number,
  ) {
    const product = await this.shopStorageRepository.findOne({
      where: {
        id: productId,
        shopId,
      },
    });
    if (!product?.id) throw new NotFoundException('Такого продукта нет');
    return !(product.quantity > quantity); //   Если количество товара на складе > чем запрашиваемое количество или товар заказан, то return false
  }

  async update(id: number) {
    return `This action updates a #${id} shopStorage`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopStorage`;
  }
}
