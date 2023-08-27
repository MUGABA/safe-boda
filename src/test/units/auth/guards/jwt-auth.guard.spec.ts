import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtAuthGuard } from '@absolute/auth/guards/jwt_auth.guard';
import jwtConfig from '@absolute/config/jwt.config';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;
  let mockExecutionContext: ExecutionContext;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [jwtConfig],
        }),
      ],
      providers: [
        JwtAuthGuard,
        {
          provide: JwtService,
          useValue: createMock<JwtService>(),
        },
        {
          provide: Reflector,
          useValue: createMock<Reflector>(),
        },
      ],
    }).compile();

    guard = moduleRef.get<JwtAuthGuard>(JwtAuthGuard);
    jwtService = moduleRef.get<JwtService>(JwtService);
    reflector = moduleRef.get<Reflector>(Reflector);
    mockExecutionContext = createMock<ExecutionContext>();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access to public routes', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(true);
  });

  it('should not allow access without a token', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    jest.spyOn(guard as any, 'getToken').mockReturnValue(undefined);

    await expect(guard.canActivate(mockExecutionContext)).rejects.toThrowError(
      new UnauthorizedException('Authorization token is required'),
    );
  });

  it('should allow access with a valid token', async () => {
    const validToken = 'valid-token';
    jest.spyOn(guard as any, 'getToken').mockReturnValue(validToken);

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(true);
  });
});
