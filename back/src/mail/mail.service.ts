// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

const cnfg = new ConfigService();

@Injectable()
export class MailService {
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
}
