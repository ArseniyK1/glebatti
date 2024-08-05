import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Order } from '../../order/entities/order.entity';
import { Manufacture } from '../../manufacture/entities/manufacture.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(() => Manufacture, (manufacture) => manufacture.product)
  @JoinColumn()
  manufacture: Manufacture;

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn()
  category: Category;

  @ManyToMany(() => Shop, (shop) => shop.products)
  shops: Shop[];

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
