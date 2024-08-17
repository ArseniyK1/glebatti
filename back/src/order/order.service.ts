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
    let totalOrderSum = 0;

    // Перебираем все позиции из массива и проверяем их наличие на складе
    const positions = await Promise.all(
      dto.positions.map(async (position) => {
        const existPositionOnStorage = await this.shopStorageRepository.findOne(
          {
            where: {
              shop: { id: position.shopId },
              product: { id: position.productId },
            },
            relations: { shop: true, product: true, order: true },
          },
        );

        if (!existPositionOnStorage?.id) {
          throw new NotFoundException(
            `Товар с ID ${position.productId} не найден на складе магазина с ID ${position.shopId}`,
          );
        }

        if (position.quantity > existPositionOnStorage.quantity) {
          throw new BadRequestException(
            `Недостаточно товара на складе для продукта с ID ${position.productId} (доступно: ${existPositionOnStorage.quantity}, запрошено: ${position.quantity})`,
          );
        }

        if (existPositionOnStorage.order?.id) {
          throw new BadRequestException(
            `Товар с ID ${position.productId} уже заказан`,
          );
        }

        // Увеличиваем общую сумму заказа
        totalOrderSum +=
          existPositionOnStorage.cost_product * position.quantity;

        // Возвращаем позицию, чтобы позже обновить её в `shop_storage`
        return {
          ...existPositionOnStorage,
          quantity: position.quantity,
        };
      }),
    );

    // Создание нового заказа с общей суммой
    const newOrder = await this.orderRepository.save({
      shop: { id: dto.positions[0].shopId }, // Предполагаем, что все позиции из одного магазина
      order_sum: totalOrderSum,
      buyer: { id: user.userId },
    });

    // Обновляем количество товара на складе и связываем позиции с новым заказом
    const updatedPositions = await Promise.all(
      positions.map(async (position) => {
        await this.shopStorageRepository.update(
          { id: position.id },
          { quantity: () => `quantity - ${position.quantity}` },
        );

        // Связываем позицию с новым заказом и обновляем её в базе данных
        return this.shopStorageRepository.save({
          id: position.id,
          quantity: position.quantity,
          cost_product: position.cost_product,
          product: position.product.id,
          shop: position.shop.id,
          order: newOrder.id,
        });
      }),
    );

    return {
      order: newOrder,
      positions: updatedPositions,
    };
  }

  async myOrder(userId: number) {
    // Получаем все заказы пользователя
    const orders = await this.orderRepository.find({
      where: {
        buyer: { id: userId },
      },
    });
    return await Promise.all(
      orders.map(async (item) => {
        const products = await this.shopStorageRepository.find({
          where: {
            order: { id: item.id },
          },
          relations: ['product', 'shop'],
        });
        console.log(products); // Здесь products будет содержать результаты поиска
        return { order: item, products };
      }),
    );
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
