import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Manufacture } from '../../manufacture/entities/manufacture.entity';
import { Category } from '../../category/entities/category.entity';
import { ShopStorage } from '../../shop_storage/entities/shop_storage.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'dict_product' })
export class DictProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  quantity: number;

  @ManyToOne(() => Manufacture, (manufacture) => manufacture.product)
  @JoinColumn()
  manufacture: Manufacture;

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => User, (user) => user.dict_product)
  admin: User;

  @OneToMany(() => ShopStorage, (shop) => shop.product)
  shopStorage: ShopStorage[];
}
