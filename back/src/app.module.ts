import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { databaseProviders } from './db/database.providers';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';
import { DictProductModule } from './dict_product/dict_product.module';
import { ShopModule } from './shop/shop.module';
import { ManufactureModule } from './manufacture/manufacture.module';
import { CategoryModule } from './category/category.module';
import { MailModule } from './mail/mail.module';
import { ShopStorageModule } from './shop_storage/shop_storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV === 'prod' ? 'env' : 'dev.'}env`,
    }),
    UserModule,
    RolesModule,
    AuthModule,
    OrderModule,
    DictProductModule,
    ShopModule,
    ManufactureModule,
    CategoryModule,
    MailModule,
    ShopStorageModule,
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
  controllers: [AppController],
})
export class AppModule {}
// export class AppModule implements OnApplicationBootstrap {
//   constructor(private readonly seedingService: SeedingService) {}
//
//   async onApplicationBootstrap(): Promise<void> {
//     await this.seedingService.seed();
//   }
// }
