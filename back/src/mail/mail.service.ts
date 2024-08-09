import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { VerifyCodeDto } from './dto/verify-code.dto';

const cnfg = new ConfigService();

@Injectable()
export class MailService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<any>,
  ) {}

  private transporter = nodemailer.createTransport({
    host: cnfg.get<string>('MAIL_HOST'),
    port: 465,
    secure: true,
    auth: {
      user: cnfg.get<string>('MAIL_NAME'),
      pass: cnfg.get<string>('MAIL_PASS'),
    },
  });

  async sendMail(to: string, subject: string, text: string, html: string) {
    const info = await this.transporter.sendMail({
      from: `"МузШоп" <${cnfg.get<string>('MAIL_NAME')}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
  }

  async verificationCode(userId: number, dto: VerifyCodeDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user?.id) throw new NotFoundException('Пользователь не найден');
    if (+user.confirmation_code !== +dto.code) return { verify: false };
    await this.userRepository.update(user, {
      verified: true,
      confirmation_code: null,
    });
    return { verify: +user.confirmation_code === +dto.code };
  }
}
