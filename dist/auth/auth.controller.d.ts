import { SignUpDto } from './dtos/sign-up.dto';
import { AuthService } from './services/auth.service';
import { AuthResponse } from '@absolute/helpers/authResponse';
import { User } from 'src/models/user.entity';
import { SignInDto } from './dtos/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<AuthResponse>;
    signIn(signInDto: SignInDto): Promise<AuthResponse>;
    toggleDriverIsAvailable(req: any): Promise<User>;
}
