import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import jwtConfig from '@absolute/config/jwt.config';
import { User } from '@absolute/models/user.entity';
import { UsersRepository } from '@absolute/user/domain/repository/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, UsersRepository],
  exports: [JwtModule],
})
export class AuthModule {}
