import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ManufactureService } from './manufacture.service';
import { CreateManufactureDto } from './dto/create-manufacture.dto';
import { UpdateManufactureDto } from './dto/update-manufacture.dto';
import { ProductListDto } from '../dict_product/dto/product-list.dto';
import { ManufactureListDto } from './dto/manufacture-list.dto';

@Controller('manufacture')
export class ManufactureController {
  constructor(private readonly manufactureService: ManufactureService) {}

  @Post('create')
  create(@Body() createManufactureDto: CreateManufactureDto) {
    return this.manufactureService.create(createManufactureDto);
  }

  @Get('list')
  findAll(@Query() query: ManufactureListDto) {
    return this.manufactureService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufactureService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManufactureDto: UpdateManufactureDto,
  ) {
    return this.manufactureService.update(+id, updateManufactureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufactureService.remove(+id);
  }
}
