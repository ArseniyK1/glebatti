import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDict_productDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  model: string;
  @IsString()
  @IsNotEmpty()
  price: string;
  @IsString()
  @IsNotEmpty()
  categoryId: string;
  @IsString()
  @IsNotEmpty()
  manufactureId: string;
  @IsString()
  @IsOptional()
  photo?: string;
}
