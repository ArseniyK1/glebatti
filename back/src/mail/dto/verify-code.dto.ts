import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyCodeDto {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
