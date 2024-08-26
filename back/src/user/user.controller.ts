import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/public.decorator';
import { Role, Roles } from '../roles/decorators/roles.decorator';
import { ByLoginDto } from './dto/by-login.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InfoAboutLawyerDto } from './dto/InfoAboutLawyer.dto';
import { GetInfoAboutLawyerDto } from './dto/getInfoAboutLawyer.dto';
import { QueryLawyerDto } from './dto/QueryLawyer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('signup-seller')
  @Roles(Role.admin, Role.seller)
  @ApiOperation({ summary: 'Регистрация продавца' })
  async createSeller(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createSeller(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Показать всех пользователей (для админа)' })
  @ApiResponse({ type: [CreateUserDto] })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('allLawyer')
  @ApiOperation({ summary: 'Показать всех юристов' })
  @Public()
  @ApiResponse({ type: [CreateUserDto] })
  getAllLawyer(@Query() query: QueryLawyerDto) {
    return this.userService.getAllLawyer(query);
  }

  @Get('byLogin')
  @ApiOperation({ summary: 'Получение пользователя по логину' })
  @ApiResponse({ type: CreateUserDto })
  findByLogin(@Query() query: ByLoginDto) {
    return this.userService.findByLogin(query);
  }

  @Public()
  @ApiOperation({ summary: 'Получение данных о юристе' })
  @ApiResponse({ type: GetInfoAboutLawyerDto })
  @Get('getInfoAboutLawyer')
  getInfoAboutLawyer(@Query() query: InfoAboutLawyerDto) {
    return this.userService.getInfoAboutLawyer(query);
  }

  @Patch()
  @ApiOperation({ summary: 'Изменение данных о конкретном пользователе' })
  @ApiBody({
    description: 'Форма обновления пользователя',
    type: UpdateUserDto,
  })
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserContent(+req.user.userId, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление конкретного пользователя' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
