import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class AddProductStorageDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
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
