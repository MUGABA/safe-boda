import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { User } from 'src/models/user.entity';
import { IUserRepository } from './domain/interface/user.repository.interface';
import { IUserService } from './domain/interface/user.service.interface';
export declare class UserService implements IUserService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    create(user: SignUpDto): Promise<User>;
    update(id: number, user: SignUpDto): Promise<User>;
    delete(id: number): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
}
