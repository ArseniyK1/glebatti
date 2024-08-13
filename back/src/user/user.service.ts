import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { genSalt, hash } from 'bcrypt';
import { ByLoginDto } from './dto/by-login.dto';
import { InfoAboutLawyerDto } from './dto/InfoAboutLawyer.dto';
import { Brackets, Repository } from 'typeorm';
import { roleEnum } from '../constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryLawyerDto } from './dto/QueryLawyer.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<any>,
    private roleService: RolesService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}
  private generateVerificationCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  private async sendRegistrationEmail(
    email: string,
    login: string,
    verificationCode: string,
  ) {
    const subject = 'Подтверждение почты  ';
    const text = `Добрый день, ${login}!\n\nСпасибо за регистрацию на нашем сервисе. Чтобы подтвердить почту, пожалуйста, введите код ${verificationCode}!\n\nСпасибо,\nКоманда разработчиков`;
    const html = `<p>Добрый день, ${login}!</p><p>Спасибо за регистрацию на нашем сервисе. Чтобы подтвердить почту, пожалуйста, введите следующий код: <h2><strong>${verificationCode}</strong></h2></p><p>С уважением, команда разработчиков.</p>`;

    await this.mailService.sendMail(email, subject, text, html);
  }
  async create(createUserDto: CreateUserDto) {
    const existsUser = await this.userRepository.exists({
      where: [{ login: createUserDto.login }, { email: createUserDto.email }],
    });
    if (!!existsUser)
      throw new ConflictException(
        'Пользователь с таким логином или почтой уже существует',
      );

    const salt = await genSalt(10); // С помощью библиотеки bycrypt создаём соль
    const hashPassword = await hash(createUserDto.password, salt); // bycrypt создаёт хеш пароля
    const verificationCode = this.generateVerificationCode();
    if (!!createUserDto.isSeller) {
      const role = await this.roleService.getRoleByValue(roleEnum.SELLER);
      const seller = await this.userRepository.save({
        ...createUserDto,
        roleId: role.id,
        password: hashPassword,
        confirmation_code: verificationCode,
      });
      await this.sendRegistrationEmail(
        seller.email,
        seller.login,
        verificationCode,
      );
      return seller;
    } else {
      const role = await this.roleService.getRoleByValue(roleEnum.USER);
      const user = await this.userRepository.save({
        ...createUserDto,
        roleId: role.id,
        password: hashPassword,
        confirmation_code: verificationCode,
      });

      await this.sendRegistrationEmail(
        user.email,
        user.login,
        verificationCode,
      );
      // const payload = {
      //   userId: user.id,
      //   username: user.login,
      //   role: role.value,
      // };
      // return {
      //   access_token: await this.jwtService.signAsync(payload),
      //   user: user,
      // };
      return user;
    }
  }

  async updateUserContent(userId: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { organization: true },
    });

    const newUser = await this.userRepository.update(
      {
        id: userId,
      },
      {
        ...user,
        ...dto,
      },
    );
    return newUser;
  }

  async findAll(roleId: number = 1) {
    // если нужны юристы, то
    if (roleId !== 1) {
      const users = await this.userRepository.find({
        where: { roleId: { id: roleId } },
        relations: { roleId: true },
      });
      return users;
    } else {
      return await this.userRepository.find();
    }
  }

  async getAllLawyer(query: QueryLawyerDto) {
    console.log(query);
    const typeLaw = !!query?.type_law ? query?.type_law : '';
    const userName = !!query?.lawyerName ? query?.lawyerName : '';
    const organization = !!query?.organization ? query?.organization : '';
    console.log('ASDADASD', organization);
    let whereCondition = {};

    if (typeLaw) {
      whereCondition = `EXISTS (SELECT 1 FROM jsonb_array_elements_text(type_law) AS j WHERE j ILIKE '%${typeLaw}%')`;
    }

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roleId', 'role')
      .leftJoinAndSelect('user.organization', 'organization')
      .where('user.roleId = :roleId', { roleId: 3 })
      .andWhere(whereCondition)
      .orderBy('user.id', 'DESC');
    if (userName || organization) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          if (userName) {
            qb.where('LOWER(user.last_name) LIKE LOWER(:name)', {
              name: `%${userName}%`,
            })
              .orWhere('LOWER(user.first_name) LIKE LOWER(:name)', {
                name: `%${userName}%`,
              })
              .orWhere('LOWER(user.middle_name) LIKE LOWER(:name)', {
                name: `%${userName}%`,
              });
          }

          if (organization) {
            qb.orWhere('user.organizationId = :organization', {
              organization: organization,
            });
          }
        }),
      );
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { roleId: true },
    });
    if (!!user) {
      return user;
    } else {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  async getInfoAboutLawyer(query: InfoAboutLawyerDto) {
    if (!!query?.lawyerId) {
      // const user = await this.findOne(+query.lawyerId);
      // if (user.roleId.id === 3) {
      //   const {
      //     first_name,
      //     last_name,
      //     middle_name,
      //     phonenumber,
      //     date_of_birth,
      //     contact_email,
      //   } = user;
      //   const portfolio = await this.portfolioService.findPortfolioByUserId({
      //     lawyerId: user.id,
      //   });
      //   return {
      //     first_name,
      //     last_name: last_name,
      //     middle_name,
      //     phonenumber,
      //     date_of_birth,
      //     contact_email,
      //     portfolio,
      //   };
      // } else {
      //   throw new HttpException(
      //     'Этот пользователь не является юристом!',
      //     HttpStatus.CONFLICT,
      //   );
      // }
    } else {
      throw new HttpException('Укажите id юриста', HttpStatus.BAD_REQUEST);
    }
  }

  async findByLogin(query: ByLoginDto) {
    const user = await this.userRepository.findOne({
      where: { login: query.login },
      relations: { roleId: true },
    });
    if (!user.id) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(_id: number) {
    const existsUser = await this.userRepository.exists({ where: { id: _id } });
    if (existsUser) {
      const userToRemove = await this.userRepository.findOneBy({
        id: _id,
      });
      await this.userRepository.remove(userToRemove);
      return `Пользователь с id ${_id} успешно удален`;
    } else {
      throw new NotFoundException('Такого пользователя не существует');
    }
  }

  async getShopSeller(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { shop: true },
    });
    const { shop } = user;
    return shop;
  }
}
