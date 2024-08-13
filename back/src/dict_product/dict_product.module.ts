import { Module } from '@nestjs/common';
import { DictProductService } from './dict_product.service';
import { DictProductController } from './dict_product.controller';
import { providers } from '../constants';
import { databaseProviders } from '../db/database.providers';
import { ShopService } from '../shop/shop.service';
import { DatabaseModule } from '../db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DictProductController],
  providers: [
    DictProductService,
    ...providers,
    ...databaseProviders,
    ShopService,
  ],
  exports: [DictProductService],
})
export class DictProductModule {}
