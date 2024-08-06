import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { providers } from '../constants';
import { databaseProviders } from '../db/database.providers';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, ...providers, ...databaseProviders],
})
export class CategoryModule {}
