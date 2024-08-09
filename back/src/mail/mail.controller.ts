import { Controller, Post, Body, Request } from '@nestjs/common';
import { MailService } from './mail.service';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { Public } from '../auth/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @Body('html') html: string,
  ) {
    await this.mailService.sendMail(to, subject, text, html);
    return { message: 'Email sent successfully' };
  }

  @Post('verificationCode')
  verificationCode(@Request() req: any, @Body() dto: VerifyCodeDto) {
    return this.mailService.verificationCode(req.user.userId, dto);
  }
}
