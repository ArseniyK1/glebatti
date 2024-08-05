import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phonenumber: string;

  @OneToMany(() => Order, (order) => order.shop)
  order: Order[];

  @OneToMany(() => User, (user) => user.shop)
  user: User[];

  @ManyToMany(() => Product, (product) => product.shops)
  @JoinTable({ name: 'shop_product' })
  products: Product[];
}
//
