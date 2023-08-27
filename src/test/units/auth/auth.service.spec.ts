import { createMock } from '@golevelup/ts-jest';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from '@absolute/auth/services/auth.service';
import { PasswordService } from '@absolute/auth/services/password.service';

import { SignUpDto } from '@absolute/auth/dtos/sign-up.dto';
import jwtConfig from '@absolute/config/jwt.config';
import { ActiveUserData } from '@absolute/helpers/activeUserData';
import { AuthResponse } from '@absolute/helpers/authResponse';
import { User } from '@absolute/models/user.entity';
import { UsersRepository } from '@absolute/user/domain/repository/user.repository';

describe('AuthService', () => {
  let authService: AuthService;
  let passwordService: PasswordService;
  let jwtService: JwtService;
  let userRepository: UsersRepository;
  let jwtConfiguration: ConfigType<typeof jwtConfig>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PasswordService, useValue: createMock<PasswordService>() },
        { provide: JwtService, useValue: createMock<JwtService>() },
        { provide: UsersRepository, useValue: createMock<UsersRepository>() },

        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: jwtConfig.KEY,
          useValue: jwtConfig.asProvider(),
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    passwordService = moduleRef.get<PasswordService>(PasswordService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    userRepository = moduleRef.get<UsersRepository>(UsersRepository);
    jwtConfiguration = moduleRef.get<ConfigType<typeof jwtConfig>>(
      jwtConfig.KEY,
    );
  });

  describe('signUp', () => {
    const signUpDto: SignUpDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'Backend Engineer',
      phoneNumber: '256705938222',
      isDriverAvailable: false,
      userType: 'Driver',
    };
    let user: User;

    beforeEach(() => {
      user = new User();
      user.id = 1;
      user.email = signUpDto.email;
      user.isDriverAvailable = signUpDto.isDriverAvailable;
      user.name = signUpDto.name;
      user.phoneNumber = signUpDto.phoneNumber;
      user.password = 'hashed_password';
    });

    it('should create a new user', async () => {
      user.email = 'first@safeboda.com';
      const saveSpy = jest
        .spyOn(userRepository, 'create')
        .mockResolvedValueOnce(user);

      const result: AuthResponse = await authService.signUp(signUpDto);

      expect(saveSpy).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('signIn', () => {
    const signUpDto: SignUpDto = {
      email: 'test@safeboda.com',
      password: 'password',
      name: 'Backend Engineer',
      phoneNumber: '256705938222',
      isDriverAvailable: false,
      userType: 'Driver',
    };

    let user: User;

    beforeEach(() => {
      user = new User();
      user.id = 1;
      user.email = signUpDto.email;
      user.isDriverAvailable = signUpDto.isDriverAvailable;
      user.name = signUpDto.name;
      user.phoneNumber = signUpDto.phoneNumber;
      user.password = 'hashed_password';
    });

    it('should sign in a user and return an access token', async () => {
      const signInDto = {
        email: 'test@safeboda.com',
        password: 'password',
      };

      const comparedPassword = true;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest
        .spyOn(passwordService, 'compare')
        .mockResolvedValue(comparedPassword);
      jest
        .spyOn(authService, 'generateAccessToken')
        .mockResolvedValue({ accessToken: 'accessToken' });

      const result = await authService.signIn(signInDto);

      expect(result.message).toBe('Logged In Successfully');
    });
  });

  describe('generateAccessToken', () => {
    const signUpDto: SignUpDto = {
      email: 'test@safeboda.com',
      password: 'password',
      name: 'Backend Engineer',
      phoneNumber: '256705938222',
      isDriverAvailable: false,
      userType: 'Driver',
    };

    let user: User;

    beforeEach(() => {
      user = new User();
      user.id = 1;
      user.email = signUpDto.email;
      user.isDriverAvailable = signUpDto.isDriverAvailable;
      user.name = signUpDto.name;
      user.phoneNumber = signUpDto.phoneNumber;
      user.password = 'hashed_password';
      user.userType = signUpDto.userType;
    });
    it('should insert a token into Redis and return an access token', async () => {
      const tokenId = expect.any(String);
      const accessToken = 'test-access-token';

      (jwtService.signAsync as any).mockResolvedValueOnce(accessToken);

      const result = await authService.generateAccessToken(user);

      expect(jwtService.signAsync).toHaveBeenCalledWith(
        {
          id: user.id,
          email: user.email,
          userType: user.userType,
          isDriverAvailable: user.isDriverAvailable,
          tokenId,
        } as ActiveUserData,
        {
          secret: jwtConfiguration.secret,
          expiresIn: jwtConfiguration.accessTokenTtl,
        },
      );
      expect(result).toEqual({ accessToken });
    });
  });
});
