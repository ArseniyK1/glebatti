import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddProductStorageDto {
  @IsNotEmpty()
  @IsNumber()
  cost_product: number;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  @IsNotEmpty()
  @IsNumber()
  productId: number;
  @IsOptional()
  @IsNumber()
  orderId?: number;
}
