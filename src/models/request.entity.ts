// import { requestStatus } from 'src/helpers/requestStatus';
import { requestStatus } from '@absolute/helpers/requestStatus';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { DriverRequests } from './request_riders.entity';
import { User } from './user.entity';

@Entity('requests')
export class Requests extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  pickUpLocation: string;

  @Column({ type: 'varchar', length: 255 })
  destinationLocation: string;

  @Column({ type: 'enum', enum: requestStatus, default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.requests)
  @JoinColumn()
  customer: User;

  @OneToOne(() => DriverRequests, (driverRequest) => driverRequest.request)
  driverRequest: DriverRequests;
}
