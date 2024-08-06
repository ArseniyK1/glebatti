import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductAddStorageDto } from './dto/product-add-storage.dto';
import { ShopService } from '../shop/shop.service';
import { ProductListDto } from './dto/product-list.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<any>,
    private shopService: ShopService,
  ) {}
  async create(user: any, dto: CreateProductDto) {
    const existsProduct = await this.productRepository.exists({
      where: { model: dto.model },
    });
    if (existsProduct) {
      throw new BadRequestException('Такой продукт уже существует');
    }

    return await this.productRepository.save({
      ...dto,
      category: dto.categoryId,
      manufacture: dto.manufactureId,
    });
  }
  async product_add_storage(user: any, dto: ProductAddStorageDto) {
    const newProduct = await this.productRepository.findOne({
      where: { id: dto.productId },
    });
    if (!!!newProduct?.id) {
      throw new BadRequestException('Такого продукта не существует');
    }
    const shop = await this.shopService.findOne(dto.shopId);
    if (!!!shop?.id) {
      throw new BadRequestException('Такого магазина не существует');
    }
    // return await this.shopProductRepository.save({
    //   productId: newProduct.id,
    //   shopId: shop.id,
    // });
  }

  async findAll(query: ProductListDto) {
    if (query.query?.length) {
      return await this.productRepository.find({
        where: [{ name: query.query }, { model: query.query }],
        relations: { category: true, manufacture: true },
      });
    }
    return await this.productRepository.find({
      relations: { category: true, manufacture: true },
    });
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
