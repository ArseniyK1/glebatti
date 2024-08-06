import { IsOptional, IsString } from 'class-validator';

export class ProductListDto {
  @IsString()
  @IsOptional()
  query?: string;
}
