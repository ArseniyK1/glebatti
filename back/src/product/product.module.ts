import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { providers } from '../constants';
import { databaseProviders } from '../db/database.providers';
import { ShopService } from '../shop/shop.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, ...providers, ...databaseProviders, ShopService],
  exports: [ProductService],
})
export class ProductModule {}
