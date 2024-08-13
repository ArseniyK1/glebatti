import { PartialType } from '@nestjs/swagger';
import { CreateDict_productDto } from './create-dict_product.dto';

export class UpdateProductDto extends PartialType(CreateDict_productDto) {}
