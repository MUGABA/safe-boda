import { User } from '@absolute/models/user.entity';
import { ActiveUserData } from './activeUserData';
export interface AuthResponse {
    message: string;
    accessToken: string;
    user: User | ActiveUserData;
}
