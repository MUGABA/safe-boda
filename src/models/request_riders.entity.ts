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
import { Requests } from './request.entity';
import { User } from './user.entity';

@Entity('driver_requests')
export class DriverRequests extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'enum', enum: requestStatus, default: 'accepted' })
  status: string;

  @ManyToOne(() => User, (user) => user.driverRequest)
  @JoinColumn()
  driver: User;

  @OneToOne(() => Requests, (request) => request.driverRequest)
  @JoinColumn()
  request: Requests;
}
