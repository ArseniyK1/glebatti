import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DictProduct } from '../../dict_product/entities/dict_product.entity';
import { User } from '../../user/entities/user.entity';
import { Order } from '../../order/entities/order.entity';
import { ShopStorage } from '../../shop_storage/entities/shop_storage.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phonenumber: string;

  @OneToMany(() => Order, (order) => order.shop)
  order: Order[];

  @OneToMany(() => User, (user) => user.shop)
  user: User[];

  @OneToMany(() => ShopStorage, (shop_storage) => shop_storage.shop)
  shop_storage: ShopStorage[];
}
//
