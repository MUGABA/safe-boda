import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

import { ActiveUserData } from 'src/helpers/activeUserData';
import { SignUpDto } from '../dtos/sign-up.dto';
import { PasswordService } from './password.service';

import jwtConfig from '@absolute/config/jwt.config';
import { AuthResponse } from '@absolute/helpers/authResponse';
import { DriverRequests } from '@absolute/models/request_riders.entity';
import { UsersRepository } from '@absolute/user/domain/repository/user.repository';
import { User } from 'src/models/user.entity';
import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UsersRepository,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const { email, password, userType } = signUpDto;

    try {
      signUpDto.password = await this.passwordService.hash(password);

      if (userType === 'Driver') signUpDto.isDriverAvailable = true;
      else signUpDto.isDriverAvailable = false;

      const userExists = await this.userRepository.findByEmail(email);
      if (userExists.length >= 1) {
        throw new BadRequestException({
          status: 400,
          message: 'User with this email already exist. Try sign in',
        });
      }

      const savedUSer = await this.userRepository.create(signUpDto);

      const { accessToken } = await this.generateAccessToken(savedUSer);

      delete savedUSer.password;

      const returnObject: AuthResponse = {
        message: 'Registration completed successfully',
        accessToken,
        user: savedUSer,
      };

      return returnObject;
    } catch (error) {
      throw error;
    }
  }

  async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    try {
      const { email, password } = signInDto;

      const checkUserExists = await this.userRepository.findByEmail(email);
      if (!checkUserExists.length) {
        throw new BadRequestException('Wrong Email or password');
      }

      const user = checkUserExists[0];

      const isPasswordMatch = await this.passwordService.compare(
        password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new BadRequestException('Wrong Email or Password');
      }

      const { accessToken } = await this.generateAccessToken(user);

      delete user.password;

      const returnObject: AuthResponse = {
        message: 'Logged In Successfully',
        accessToken,
        user: user,
      };

      return returnObject;
    } catch (error) {
      throw error;
    }
  }

  async toggleDriverAvailable(currentUser: ActiveUserData): Promise<User> {
    try {
      const currentUserData: User = await this.userRepository.findOne(
        currentUser.id,
      );

      currentUserData.isDriverAvailable = !currentUserData.isDriverAvailable;

      return await this.userRepository.update(currentUser.id, currentUserData);
    } catch (error) {
      throw error;
    }
  }

  async generateAccessToken(
    user: Partial<User>,
  ): Promise<{ accessToken: string }> {
    const tokenId = randomUUID();

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        userType: user.userType,
        isDriverAvailable: user.isDriverAvailable,
        tokenId,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return { accessToken };
  }

  async getMyProfile(
    currentUser: ActiveUserData,
  ): Promise<User | DriverRequests[]> {
    try {
      if (currentUser.userType === 'Customer')
        return this.userRepository.userCustomerDetails(currentUser.id);
      else if (currentUser.userType === 'Driver')
        return this.userRepository.userDriverDetails(currentUser.id);
      else return this.userRepository.findOne(currentUser.id);
    } catch (error) {
      throw error;
    }
  }
}
