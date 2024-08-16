import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

enum Status {
  CREATED = 'CREATED',
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED',
}

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  shopId: number;
  @IsEnum({ enum: ['CREATED', 'SUCCESS', 'CANCELED'] })
  @IsOptional()
  status?: Status;
  @IsNumber()
  @IsNotEmpty()
  productId: number;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
