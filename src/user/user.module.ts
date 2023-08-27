import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { IUserRepository } from './domain/interface/user.repository.interface';
import { IUserService } from './domain/interface/user.service.interface';
import { UsersRepository } from './domain/repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: IUserRepository,
      useClass: UsersRepository,
    },
  ],
})
export class UserModule {}
