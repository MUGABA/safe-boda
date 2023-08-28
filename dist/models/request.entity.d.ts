import { BaseEntity } from './base.entity';
import { DriverRequests } from './request_riders.entity';
import { User } from './user.entity';
export declare class Requests extends BaseEntity {
    id: number;
    pickUpLocation: string;
    destinationLocation: string;
    status: string;
    customer: User;
    driverRequest: DriverRequests;
}
