import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Request } from '../../request/entities/request.entity';
import { Roles } from '../../roles/entities/roles.entity';
// import { Organization } from '../../organization/entities/organization.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column({ nullable: true })
  login: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  // @ManyToOne(() => Organization, (organization) => organization.user)
  // @JoinColumn({ name: 'organizationId' })
  // organization: Organization;
  //
  // @OneToMany(() => Request, (request) => request.user)
  // request: Request[];

  @ManyToOne(() => Roles, (roles) => roles.user)
  @JoinColumn({ name: 'roleId' })
  public roleId: Roles;
}
