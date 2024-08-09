import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Request } from '../../request/entities/request.entity';
import { Roles } from '../../roles/entities/roles.entity';
import { Order } from '../../order/entities/order.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { Manufacture } from '../../manufacture/entities/manufacture.entity';
// import { Organization } from '../../organization/entities/organization.entity';

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

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @ManyToOne(() => Shop, (shop) => shop.user)
  @JoinColumn()
  shop: Shop;

  @ManyToOne(() => Roles, (roles) => roles.user)
  @JoinColumn({ name: 'roleId' })
  public roleId: Roles;
}
