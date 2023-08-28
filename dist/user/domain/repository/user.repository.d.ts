import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { DriverRequests } from '@absolute/models/request_riders.entity';
import { User } from '@absolute/models/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from '../interface/user.repository.interface';
export declare class UsersRepository implements IUserRepository {
    private readonly userRepository;
    private readonly driverRequestRepository;
    constructor(userRepository: Repository<User>, driverRequestRepository: Repository<DriverRequests>);
    create(user: SignUpDto): Promise<User>;
    update(id: number, user: SignUpDto): Promise<User>;
    delete(id: number): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User[]>;
    userCustomerDetails(userId: number): Promise<User>;
    userDriverDetails(userId: number): Promise<DriverRequests[]>;
}
