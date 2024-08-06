import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phonenumber: string;
}
