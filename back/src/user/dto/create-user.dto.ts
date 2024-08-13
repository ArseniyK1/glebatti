import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Арсений', description: 'Имя пользователя' })
  first_name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Киселев', description: 'Фамилия пользователя' })
  last_name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Александрович',
    description: 'Отчество пользователя',
  })
  middle_name?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'login123', description: 'Логин пользователя' })
  login?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
  password?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'mail@mail.ru', description: 'Почта пользователя' })
  email?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'Хочет ли пользователь зарегистрироваться как юрист',
  })
  isSeller?: boolean;
}
