import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindAllInStorageDto {
  @IsNotEmpty()
  @IsString()
  shopId: string;
}
