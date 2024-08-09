import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const transporter = nodemailer.createTransport({
  host: configService.get('MAIL_HOST'),
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: configService.get('MAIL_NAME'),
    pass: configService.get('MAIL_PASS'),
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <muz-shop-bot@mail.ru>', // sender address
    to: 'kiselev-ars02@yandex.ru', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
