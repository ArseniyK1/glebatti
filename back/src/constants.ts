import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Roles } from './roles/entities/roles.entity';
import { Shop } from './shop/entities/shop.entity';
import { Category } from './category/entities/category.entity';
import { Manufacture } from './manufacture/entities/manufacture.entity';
import { DictProduct } from './dict_product/entities/dict_product.entity';
import { ShopStorage } from './shop_storage/entities/shop_storage.entity';
// import { Request } from './request/entities/request.entity';
// import { Organization } from './organization/entities/organization.entity';

export const providers = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ROLES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Roles),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DictProduct),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SHOP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Shop),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MANUFACTURE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Manufacture),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SHOP_STORAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ShopStorage),
    inject: ['DATA_SOURCE'],
  },
  // {
  //   provide: 'REQUEST_REPOSITORY',
  //   useFactory: (dataSource: DataSource) => dataSource.getRepository(Request),
  //   inject: ['DATA_SOURCE'],
  // },
  //
  // {
  //   provide: 'ORGANIZATION_REPOSITORY',
  //   useFactory: (dataSource: DataSource) =>
  //     dataSource.getRepository(Organization),
  //   inject: ['DATA_SOURCE'],
  // },
];

export enum roleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
}

export enum requestStatusEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DONE = 'done',
  CANCELED = 'canceled',
} // pending - ожидает привязки юриста (самим юристом или оператором), accepted - принята юристом, done - в процессе, canceled - отменен
