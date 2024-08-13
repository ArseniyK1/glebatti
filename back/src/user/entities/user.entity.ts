import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity';
import { Order } from '../../order/entities/order.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { DictProduct } from '../../dict_product/entities/dict_product.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column({ nullable: true })
  login: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  confirmation_code: number;

  @OneToMany(() => Order, (order) => order.buyer)
  buyer_order: Order[];

  @OneToMany(() => Order, (order) => order.seller)
  seller_order: Order[];

  @ManyToOne(() => Shop, (shop) => shop.user)
  @JoinColumn()
  shop: Shop;

  @OneToMany(() => DictProduct, (dict_product) => dict_product.admin)
  dict_product: DictProduct[];

  @ManyToOne(() => Roles, (roles) => roles.user)
  @JoinColumn({ name: 'roleId' })
  public roleId: Roles;
}
