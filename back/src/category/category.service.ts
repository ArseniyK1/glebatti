import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Shop } from '../shop/entities/shop.entity';
import { Category } from './entities/category.entity';
import { FindAllCategoryDto } from './dto/find-all-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private shopRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.shopRepository.save(createCategoryDto);
  }

  async findAll(query: FindAllCategoryDto) {
    if (query.name) {
      return await this.shopRepository.find({
        where: {
          name: query.name,
        },
      });
    } else {
      return await this.shopRepository.find();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
