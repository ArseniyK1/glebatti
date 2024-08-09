import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { CodeCacheService } from '../cashe/cashe.service';
import { Repository } from 'typeorm';
import { VerifyCodeDto } from './dto/verify-code.dto';

const cnfg = new ConfigService();

@Injectable()
export class MailService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<any>,
    private codeCacheService: CodeCacheService,
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
    // console.log(
    //   dto.email,
    //   this.codeCacheService.getAll(),
    //   this.codeCacheService.get(dto.email),
    // );
    // const emailCode = this.codeCacheService.get(dto.email);
    // // console.log(emailCode, dto.code, userId);
    // if (+emailCode !== +dto.code) return { verify: false };
    // await this.userRepository.update(
    //   {
    //     id: userId,
    //   },
    //   {
    //     verified: true,
    //   },
    // );
    // return { verify: +emailCode === dto.code };
    const txt = new ActiveXObject('Scripting.FileSystemObject');
    const s = txt.CreateTextFile(`${dto.email}.txt`, true);
    s.WriteLine(`${dto.code}`);
    s.Close();
  }
}
