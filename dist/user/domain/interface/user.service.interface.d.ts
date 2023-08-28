import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { User } from 'src/models/user.entity';
export declare abstract class IUserService {
    abstract create(user: SignUpDto): Promise<User>;
    abstract update(id: number, user: SignUpDto): Promise<User>;
    abstract delete(id: number): Promise<User>;
    abstract findAll(): Promise<User[]>;
    abstract findOne(id: number): Promise<User>;
}
