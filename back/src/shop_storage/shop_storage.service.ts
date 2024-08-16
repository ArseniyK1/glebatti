import {
  BadRequestException,
  ConflictException,
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
    console.log(existsProductOnStorage);
    // if (
    //   existsProductOnStorage?.id &&
    //   existsProductOnStorage.cost_product === dto.cost_product
    // ) {
    //   await this.shopStorageRepository.update(existsProductOnStorage, {
    //     quantity: () => `quantity + ${dto.quantity}`,
    //   });
    //   return {
    //     message:
    //       'Товар с такой ценой уже есть на складе. Его количество увеличилось',
    //   };
    // }
    if (
      existsProductOnStorage?.id &&
      existsProductOnStorage.cost_product !== dto.cost_product
    ) {
      throw new ConflictException(
        'Этот товар с другой ценой уже есть на складе вашего магазина. Вы можете изменить его цену',
      );
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

    const queryBuilder = this.shopStorageRepository
      .createQueryBuilder('shop_storage')
      .select([
        'product.id AS id',
        'product.name AS product_name',
        'product.photo AS product_photo',
        'category.name AS category_name',
        'manufacture.name AS manufacture_name',
        "json_agg(json_build_object('shopId', shop.id, 'shop_name', shop.name, 'cost_product', shop_storage.cost_product, 'quantity', shop_storage.quantity)) AS shops",
      ])
      .leftJoin('shop_storage.product', 'product')
      .leftJoin('product.category', 'category')
      .leftJoin('product.manufacture', 'manufacture')
      .leftJoin('shop_storage.shop', 'shop')
      .groupBy('product.id')
      .addGroupBy('product.name')
      .addGroupBy('category.name')
      .addGroupBy('manufacture.name')
      .orderBy('product.id', 'DESC');

    if (shopId) {
      queryBuilder.andWhere('shop.id = :shopId', { shopId: shopId });
    }

    if (categoryId || manufactureId || productName) {
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
        }),
      );
    }

    return await queryBuilder.getRawMany();
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
