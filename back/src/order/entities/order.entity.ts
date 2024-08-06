import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatedAt } from '@sequelize/core/types/decorators/legacy';
import { Roles } from '../../roles/entities/roles.entity';
import { Status } from '../../status/entities/status.entity';
import { Product } from '../../product/entities/product.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne(() => Status, (status) => status.order)
  status: Status;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Shop, (shop) => shop.order)
  @JoinColumn()
  shop: Shop;

  @OneToMany(() => Product, (product) => product.orders)
  products: Product[];
}
