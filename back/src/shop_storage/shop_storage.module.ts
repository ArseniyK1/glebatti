import { Module } from '@nestjs/common';
import { ShopStorageService } from './shop_storage.service';
import { ShopStorageController } from './shop_storage.controller';
import { providers } from '../constants';
import { DatabaseModule } from '../db/database.module';
import { UserService } from '../user/user.service';
import { RolesModule } from '../roles/roles.module';
import { MailService } from '../mail/mail.service';
import { UserModule } from '../user/user.module';
import { DictProductService } from '../dict_product/dict_product.service';
import { ShopService } from '../shop/shop.service';
import { MinioService } from 'src/minio/minio.service';

@Module({
  imports: [DatabaseModule, UserModule, RolesModule],
  controllers: [ShopStorageController],
  providers: [
    ShopStorageService,
    ...providers,
    UserService,
    MailService,
    DictProductService,
    ShopService,
    MinioService,
  ],
  exports: [ShopStorageService],
})
export class ShopStorageModule {}
