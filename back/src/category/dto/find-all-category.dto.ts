import { IsOptional, IsString } from 'class-validator';

export class FindAllCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;
}
