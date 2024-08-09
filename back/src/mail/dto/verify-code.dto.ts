import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyCodeDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
