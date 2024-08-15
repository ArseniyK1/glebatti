import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CatalogueListDto {
  @IsString()
  @IsOptional()
  shopId?: string;

  @IsString()
  @IsOptional()
  productName?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  manufactureId?: string;
}
