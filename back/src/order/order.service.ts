import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @Inject('SHOP_STORAGE_REPOSITORY')
    private shopStorageRepository: Repository<any>,
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<any>,
  ) {}
  async createOrder(user: any, dto: CreateOrderDto) {
    const existPositionOnStorage = await this.shopStorageRepository.findOne({
      where: {
        shop: { id: dto.shopId },
        product: { id: dto.productId },
      },
      relations: { shop: true, product: true, order: true },
    });
    if (!existPositionOnStorage?.id)
      throw new NotFoundException('Такого товара нет');
    if (dto.quantity > existPositionOnStorage.quantity) {
      throw new BadRequestException('Недостаточно товара на складе');
    } else if (existPositionOnStorage.order?.id) {
      throw new BadRequestException('Товар уже заказан');
    } else {
      const newOrder = await this.orderRepository.save({
        shop: { id: dto.shopId },
        order_sum: existPositionOnStorage.cost_product * dto.quantity,
        buyer: { id: user.userId },
      });
      await this.shopStorageRepository.update(
        { id: existPositionOnStorage.id },
        { quantity: () => `quantity - ${dto.quantity}` },
      );
      return await this.shopStorageRepository.save({
        quantity: dto.quantity,
        cost_product: existPositionOnStorage.cost_product,
        product: existPositionOnStorage.product.id,
        shop: existPositionOnStorage.shop.id,
        order: newOrder.id,
      });
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
