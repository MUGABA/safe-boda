import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ActiveUserData } from '@absolute/helpers/activeUserData';
import { Requests } from '@absolute/models/request.entity';
import { DriverRequests } from '@absolute/models/request_riders.entity';
import { UsersRepository } from '@absolute/user/domain/repository/user.repository';
import { IRequestService } from './domains/interfaces/request.service.interface';
import { RequestsRepository } from './domains/repository/request.repository';
import { DriverRequestDto } from './dtos/driverRequest.dto';
import { RequestDto } from './dtos/request.dto';

@Injectable()
export class RequestService implements IRequestService {
  constructor(
    private readonly requestRepository: RequestsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async makeRequest(request: RequestDto, userId: number): Promise<Requests> {
    try {
      const checkUserHasActiveRide =
        await this.requestRepository.findRequestByUserAndStatus(userId);
      if (checkUserHasActiveRide.length) {
        throw new BadRequestException({
          status: 400,
          message: 'Sorry you already have an active ride',
        });
      }

      request.customer = await this.usersRepository.findOne(userId);

      const requestedRide = await this.requestRepository.create(request);

      delete requestedRide.customer.password;

      return requestedRide;
    } catch (error) {
      throw error;
    }
  }

  async findByStatus(status: string): Promise<Requests[]> {
    return await this.requestRepository.findByStatus(status);
  }

  async takeOnRequest(
    requestId: number,
    driverId: number,
  ): Promise<DriverRequests> {
    try {
      const activeDriverRequest: DriverRequests[] =
        await this.requestRepository.findActiveDriverRequests(driverId);
      if (activeDriverRequest.length >= 1) {
        throw new BadRequestException({
          status: 400,
          message: 'You already have a running customer',
        });
      }

      const driverRequestDto = new DriverRequestDto();

      const request = await this.requestRepository.findOne(requestId);
      if (request === null) {
        throw new NotFoundException({
          status: 404,
          message: 'Wrong request challenges',
        });
      }

      if (request.status !== 'pending') {
        throw new BadRequestException({
          status: 400,
          message: 'Trip already taken',
        });
      }

      driverRequestDto.driver = await this.usersRepository.findOne(driverId);
      driverRequestDto.request = request;
      driverRequestDto.status = 'accepted';

      request.status = 'accepted';

      await this.requestRepository.update(requestId, request);

      const driverRequest = await this.requestRepository.takeOnRequest(
        driverRequestDto,
      );

      delete driverRequest.driver.password;

      return driverRequest;
    } catch (error) {
      throw error;
    }
  }

  async updateDriverRequest(
    driverRequestId: number,
    status: string,
    currentUser: ActiveUserData,
  ): Promise<DriverRequests> {
    {
      try {
        const driverRequest: DriverRequests =
          await this.requestRepository.findDriverRequestById(driverRequestId);

        const getRequest = await this.requestRepository.findOne(
          driverRequest.request.id,
        );

        if (
          (currentUser.userType === 'Driver' &&
            driverRequest.driver.id !== currentUser.id) ||
          (currentUser.userType === 'Customer' &&
            getRequest.customer.id !== currentUser.id)
        ) {
          throw new BadRequestException({
            status: 400,
            message: 'You can not update a request you are not involved in',
          });
        }

        const request = driverRequest.request;
        request.status = status;

        await this.requestRepository.update(driverRequest.request.id, request);

        driverRequest.status = status;
        return await this.requestRepository.updateDriverRequest(
          driverRequest,
          driverRequest.id,
        );
      } catch (error) {
        throw error;
      }
    }
  }
}
