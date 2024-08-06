import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Shop } from './shop.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('shop_product')
export class ShopProduct {
  @PrimaryColumn()
  shopId: number;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Shop, (shop) => shop.id)
  @JoinColumn({ name: 'shopId' })
  shop: Shop;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
