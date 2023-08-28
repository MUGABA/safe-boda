import { User } from '@absolute/models/user.entity';
import { DataSource } from 'typeorm';
export declare class AuthInstanceFactory {
    private dataSource;
    static new(dataSource: DataSource): AuthInstanceFactory;
    create(user?: Partial<User>): Promise<{
        password: any;
        id?: number;
        name?: string;
        email?: string;
        phoneNumber?: string;
        userType?: string;
        isDriverAvailable?: boolean;
        requests?: import("../../models/request.entity").Requests[];
        driverRequest?: import("../../models/request_riders.entity").DriverRequests[];
        created_at?: Date;
        updated_at?: Date;
    } & User>;
    private hashPassword;
}
