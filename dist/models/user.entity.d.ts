import { BaseEntity } from './base.entity';
import { Requests } from './request.entity';
import { DriverRequests } from './request_riders.entity';
export declare class User extends BaseEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    userType: string;
    isDriverAvailable: boolean;
    requests: Requests[];
    driverRequest: DriverRequests[];
}
