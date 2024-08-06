import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { providers } from '../constants';
import { databaseProviders } from '../db/database.providers';

@Module({
  controllers: [ShopController],
  providers: [ShopService, ...providers, ...databaseProviders],
  exports: [ShopService],
})
export class ShopModule {}
