import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDict_productDto } from './dto/create-dict_product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Like, Repository } from 'typeorm';
// import { ProductAddStorageDto } from './dto/product-add-storage.dto';
import { ShopService } from '../shop/shop.service';
import { ProductListDto } from './dto/product-list.dto';
import { DictProduct } from './entities/dict_product.entity';

@Injectable()
export class DictProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private dictProductRepository: Repository<any>,
    private shopService: ShopService,
  ) {}
  async create(dto: CreateDict_productDto, photo?: Express.Multer.File) {
    if (photo) {
      dto.photo = photo.filename; // сохраняем имя файла в БД
    }

    return await this.dictProductRepository.save({
      price: +dto.price,
      category: +dto.categoryId,
      manufacture: +dto.manufactureId,
      ...dto,
    });
  }

  async findAll(query: ProductListDto) {
    return await this.dictProductRepository.find({
      where: [
        query.categoryId ? { category: { id: +query.categoryId } } : {},
        query.manufactureId
          ? { manufacture: { id: +query.manufactureId } }
          : {},
        query.name ? { name: Like(`%${query.name}%`) } : {},
      ],
      relations: { category: true, manufacture: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    return await this.dictProductRepository.findOneBy({ id });
  }

  async checkQuantityForStorage(productId: number, quantity: number) {
    const product = await this.dictProductRepository.findOne({
      where: {
        id: productId,
      },
    });
    if (!product?.id) throw new NotFoundException('Такого продукта нет');
    return !(quantity > product.quantity); //   Если количество товара на складе > чем запрашиваемое количество, то return false
  }

  async reduceAmountProduct(id: number, _quantity: number) {
    const product = await this.dictProductRepository.findOne({
      where: {
        id,
      },
    });
    if (_quantity === product.quantity) {
      return await this.dictProductRepository.update(product, { quantity: 0 });
    }
    return await this.dictProductRepository.update(
      { id },
      {
        quantity: () => `quantity - ${_quantity}`,
      },
    );
  }
  async remove(id: number) {
    return `This action removes a #${id} dictProduct`;
  }
}
