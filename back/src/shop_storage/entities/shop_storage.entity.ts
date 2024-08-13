import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DictProduct } from '../../dict_product/entities/dict_product.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { Order } from '../../order/entities/order.entity';

@Entity('shop_storage')
export class ShopStorage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  cost_product: number;

  @ManyToOne(() => DictProduct, (product) => product.shopStorage)
  product: DictProduct;

  @ManyToOne(() => Shop, (shop) => shop.shop_storage)
  shop: Shop;

  @ManyToOne(() => Order, (order) => order.shop_storage)
  order: Order;
}
