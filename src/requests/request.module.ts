import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Requests } from '@absolute/models/request.entity';
import { DriverRequests } from '@absolute/models/request_riders.entity';
import { User } from '@absolute/models/user.entity';
import { UsersRepository } from '@absolute/user/domain/repository/user.repository';
import { RequestsRepository } from './domains/repository/request.repository';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  imports: [TypeOrmModule.forFeature([Requests, User, DriverRequests])],
  controllers: [RequestController],
  providers: [RequestService, RequestsRepository, UsersRepository],
  exports: [],
})
export class RequestModule {}
