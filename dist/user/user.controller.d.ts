import { IUserService } from './domain/interface/user.service.interface';
import { User } from 'src/models/user.entity';
export declare class UserController {
    private userService;
    constructor(userService: IUserService);
    getUser(): Promise<User[]>;
}
