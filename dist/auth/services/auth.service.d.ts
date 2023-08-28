import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from 'src/helpers/activeUserData';
import { SignUpDto } from '../dtos/sign-up.dto';
import { PasswordService } from './password.service';
import jwtConfig from '@absolute/config/jwt.config';
import { AuthResponse } from '@absolute/helpers/authResponse';
import { UsersRepository } from '@absolute/user/domain/repository/user.repository';
import { User } from 'src/models/user.entity';
import { SignInDto } from '../dtos/sign-in.dto';
export declare class AuthService {
    private readonly jwtConfiguration;
    private readonly passwordService;
    private readonly jwtService;
    private readonly userRepository;
    constructor(jwtConfiguration: ConfigType<typeof jwtConfig>, passwordService: PasswordService, jwtService: JwtService, userRepository: UsersRepository);
    signUp(signUpDto: SignUpDto): Promise<AuthResponse>;
    signIn(signInDto: SignInDto): Promise<AuthResponse>;
    toggleDriverAvailable(currentUser: ActiveUserData): Promise<User>;
    generateAccessToken(user: Partial<User>): Promise<{
        accessToken: string;
    }>;
}
