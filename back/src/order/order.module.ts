import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from '../db/database.module';
import { providers } from '../constants';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, ...providers],
  exports: [OrderService],
})
export class OrderModule {}
