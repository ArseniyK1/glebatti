import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { Order } from '../../order/entities/order.entity';

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

  @OneToMany(() => Product, (product) => product.shops)
  products: Product[];
}
//
