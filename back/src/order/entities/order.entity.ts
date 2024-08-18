import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Shop } from '../../shop/entities/shop.entity';
import { User } from '../../user/entities/user.entity';
import { DictProduct } from '../../dict_product/entities/dict_product.entity';
import { ShopStorage } from '../../shop_storage/entities/shop_storage.entity';

export enum StatusEnum {
  CREATED = 'CREATED',
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  order_sum: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Column({ nullable: true })
  amount: number;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.CREATED })
  status: StatusEnum;

  @ManyToOne(() => User, (user) => user.buyer_order)
  buyer: User;

  @ManyToOne(() => User, (user) => user.seller_order)
  seller: User;

  @ManyToOne(() => Shop, (shop) => shop.order)
  @JoinColumn()
  shop: Shop;

  @OneToMany(() => ShopStorage, (shopstorage) => shopstorage.order)
  shop_storage: ShopStorage[];
}
