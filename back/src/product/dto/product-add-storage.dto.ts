import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductAddStorageDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  shopId: number;
}
