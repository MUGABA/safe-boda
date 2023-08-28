import { User } from '@absolute/models/user.entity';
export declare class RequestDto {
    readonly pickUpLocation: string;
    destinationLocation: string;
    customer: User;
    readonly status: string;
}
