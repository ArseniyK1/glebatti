import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import typeorm_1, { Brackets, IsNull, Not, Repository } from 'typeorm';
import { AddProductStorageDto } from './dto/add-product-storage.dto';
import { UserService } from '../user/user.service';
import { DictProductService } from '../dict_product/dict_product.service';
import { CatalogueListDto } from './dto/catalogue-list.dto';

@Injectable()
export class ShopStorageService {
  constructor(
    @Inject('SHOP_STORAGE_REPOSITORY')
    private shopStorageRepository: Repository<any>,
    private userService: UserService,
    private dictProductService: DictProductService,
  ) {}
  async add_product_storage(
    userId: number,
    shopId: number,
    dto: AddProductStorageDto,
  ) {
    if (!shopId) {
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
    const existsProductOnStorage = await this.shopStorageRepository.findOne({
      where: { product: { id: dto.productId }, shop: { id: shopId } },
    });
    if (
      existsProductOnStorage?.id &&
      existsProductOnStorage.cost_product === dto.cost_product
    ) {
      await this.shopStorageRepository.update(existsProductOnStorage, {
        quantity: () => `quantity + ${dto.quantity}`,
      });
      return {
        message:
          'Товар с такой ценой уже есть на складе. Его количество увеличилось',
      };
    }
    return await this.shopStorageRepository.save({
      quantity: dto.quantity,
      cost_product: dto.cost_product,
      product: dto.productId,
      shop: shopId,
    });
  }

  async productListStorage(shopId: number) {
    console.log(shopId);
    return await this.shopStorageRepository.find({
      where: {
        shop: {
          id: shopId,
        },
      },
      relations: { product: { manufacture: true, category: true } },
    });
  }

  async catalogueList(query: CatalogueListDto) {
    const categoryId = !!query?.categoryId ? +query?.categoryId : '';
    const manufactureId = !!query?.manufactureId ? +query?.manufactureId : '';
    const productName = !!query?.productName ? query?.productName : '';
    const shopId = !!query?.shopId ? +query?.shopId : null;
    let whereCondition = {};

    const queryBuilder = this.shopStorageRepository
      .createQueryBuilder('shop_storage')
      .leftJoinAndSelect('shop_storage.product', 'product')
      .leftJoinAndSelect('shop_storage.shop', 'shop')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.manufacture', 'manufacture')
      .where(whereCondition)
      .orderBy('shop_storage.id', 'DESC');

    if (categoryId || manufactureId || productName || shopId) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          if (categoryId) {
            qb.andWhere('product.categoryId = :categoryId', {
              categoryId: categoryId,
            });
          }
          if (manufactureId) {
            qb.andWhere('product.manufactureId = :manufactureId', {
              manufactureId: manufactureId,
            });
          }
          if (productName) {
            qb.andWhere('LOWER(product.name) LIKE LOWER(:productName)', {
              productName: `%${productName}%`,
            });
          }
          if (shopId) {
            qb.andWhere('shop.id = :shopId', {
              shopId: shopId,
            });
          }
        }),
      );
    }
    return await queryBuilder.getMany();
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

  async removeProduct(shopId: number, productId: number) {
    const product = await this.shopStorageRepository.findOne({
      where: {
        id: productId,
        shop: {
          id: shopId,
        },
      },
      relations: { order: true },
    });

    if (!product?.id) throw new NotFoundException('Такого продукта нет');
    if (product.order?.id) throw new BadRequestException('Товар уже заказан');
    return await this.shopStorageRepository.remove(product);
  }
}
