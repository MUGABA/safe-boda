import { Requests } from '@absolute/models/request.entity';
import { User } from '@absolute/models/user.entity';
export declare class DriverRequestDto {
    request: Requests;
    driver: User;
    status: string;
}
