import { Module } from '@nestjs/common';
import { ManufactureService } from './manufacture.service';
import { ManufactureController } from './manufacture.controller';

@Module({
  controllers: [ManufactureController],
  providers: [ManufactureService],
})
export class ManufactureModule {}
