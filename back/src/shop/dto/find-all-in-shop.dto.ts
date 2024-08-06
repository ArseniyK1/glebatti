import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindAllInShopDto {
  @IsNotEmpty()
  @IsString()
  shopId: string;
}
