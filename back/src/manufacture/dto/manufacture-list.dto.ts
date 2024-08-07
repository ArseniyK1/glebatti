import { IsOptional, IsString } from 'class-validator';

export class ManufactureListDto {
  @IsString()
  @IsOptional()
  query?: string;
}
