import { BaseEntity } from './base.entity';
import { Requests } from './request.entity';
import { User } from './user.entity';
export declare class DriverRequests extends BaseEntity {
    id: number;
    status: string;
    driver: User;
    request: Requests;
}
