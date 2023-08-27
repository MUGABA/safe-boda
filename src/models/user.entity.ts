// import { userTypes } from 'src/helpers/authTypes';
import { userTypes } from '@absolute/helpers/authTypes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Requests } from './request.entity';
import { DriverRequests } from './request_riders.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  phoneNumber: string;

  @Column({ type: 'enum', enum: userTypes })
  userType: string;

  @Column({ type: 'bool', default: false })
  isDriverAvailable: boolean;

  @OneToMany(() => Requests, (request) => request.customer)
  requests: Requests[];

  @OneToMany(() => DriverRequests, (request) => request.driver)
  driverRequest: DriverRequests[];
}
