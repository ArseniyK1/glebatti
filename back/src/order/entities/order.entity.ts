import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt } from '@sequelize/core/types/decorators/legacy';
import { Roles } from '../../roles/entities/roles.entity';
import { Status } from '../../status/entities/status.entity';

export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  order_sum: number;

  @ManyToOne(() => Status, (status) => status.order)
  status: Status;
}
