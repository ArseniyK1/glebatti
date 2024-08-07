import { Inject, Injectable } from '@nestjs/common';
import { CreateManufactureDto } from './dto/create-manufacture.dto';
import { UpdateManufactureDto } from './dto/update-manufacture.dto';
import { ManufactureListDto } from './dto/manufacture-list.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ManufactureService {
  constructor(
    @Inject('MANUFACTURE_REPOSITORY')
    private manufactureRepository: Repository<any>,
  ) {}
  async create(dto: CreateManufactureDto) {
    return await this.manufactureRepository.save(dto);
  }

  async findAll(query: ManufactureListDto) {
    if (query?.query) {
      return await this.manufactureRepository.find({
        where: { name: query.query },
      });
    }
    return await this.manufactureRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} manufacture`;
  }

  update(id: number, updateManufactureDto: UpdateManufactureDto) {
    return `This action updates a #${id} manufacture`;
  }

  remove(id: number) {
    return `This action removes a #${id} manufacture`;
  }
}
