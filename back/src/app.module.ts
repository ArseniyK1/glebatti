import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
// import { RequestModule } from './request/request.module';
import { databaseProviders } from './db/database.providers';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { StatusModule } from './status/status.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { ManufactureModule } from './manufacture/manufacture.module';
import { CategoryModule } from './category/category.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    RolesModule,
    AuthModule,
    StatusModule,
    OrderModule,
    ProductModule,
    ShopModule,
    ManufactureModule,
    CategoryModule,
    MailModule,
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
