import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll(query: FindAllCategoryDto) {
    if (query.name) {
      return await this.categoryRepository.find({
        where: {
          name: query.name,
        },
      });
    } else {
      return await this.categoryRepository.find();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category?.id) throw new NotFoundException('Такой категории нет');
    return await this.categoryRepository.remove(category);
  }
}
