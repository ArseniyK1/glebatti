import { IsOptional, IsString } from 'class-validator';

export class ProductListDto {
  @IsString()
  @IsOptional()
  manufactureId?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  shopId?: string;
}
