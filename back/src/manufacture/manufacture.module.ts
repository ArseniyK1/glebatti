import { Module } from '@nestjs/common';
import { ManufactureService } from './manufacture.service';
import { ManufactureController } from './manufacture.controller';
import { providers } from '../constants';
import { databaseProviders } from '../db/database.providers';

@Module({
  controllers: [ManufactureController],
  providers: [ManufactureService, ...providers, ...databaseProviders],
  exports: [ManufactureService],
})
export class ManufactureModule {}
