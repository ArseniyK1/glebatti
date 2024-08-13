import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DictProduct } from '../../dict_product/entities/dict_product.entity';

@Entity()
export class Manufacture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => DictProduct, (product) => product.manufacture)
  product: DictProduct[];
}
