import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Roles } from './roles/entities/roles.entity';
import { Product } from './product/entities/product.entity';
import { Shop } from './shop/entities/shop.entity';
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
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SHOP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Shop),
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
