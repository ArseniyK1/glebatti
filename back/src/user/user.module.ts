import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesModule } from '../roles/roles.module';
import { providers } from '../constants';
import { databaseProviders } from '../db/database.providers';
import { MulterModule } from '@nestjs/platform-express';
import { MailService } from '../mail/mail.service';
import { CodeCacheService } from '../cashe/cashe.service';

@Module({
  imports: [
    RolesModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ...providers,
    ...databaseProviders,
    MailService,
    CodeCacheService,
  ],
  exports: [UserService],
})
export class UserModule {}
