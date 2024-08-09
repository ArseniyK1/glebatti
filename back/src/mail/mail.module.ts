import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { providers } from '../constants';
import { DatabaseModule } from '../db/database.module';
import { databaseProviders } from '../db/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MailController],
  providers: [MailService, ...providers, ...databaseProviders],
  exports: [MailService],
})
export class MailModule {}
