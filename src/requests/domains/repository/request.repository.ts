import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Requests } from '@absolute/models/request.entity';
import { DriverRequests } from '@absolute/models/request_riders.entity';
import { DriverRequestDto } from '@absolute/requests/dtos/driverRequest.dto';
import { RequestDto } from '@absolute/requests/dtos/request.dto';
import { Repository } from 'typeorm';
import { IRequestRepository } from '../interfaces/request.repository.interface';

@Injectable()
export class RequestsRepository implements IRequestRepository {
  constructor(
    @InjectRepository(Requests)
    private readonly requestRepository: Repository<Requests>,

    @InjectRepository(DriverRequests)
    private readonly driverRequestRepository: Repository<DriverRequests>,
  ) {}

  async create(request: RequestDto): Promise<Requests> {
    return await this.requestRepository.save(request);
  }

  async update(id: number, request: RequestDto): Promise<Requests> {
    await this.requestRepository.update(id, request);
    return await this.requestRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Requests[]> {
    return await this.requestRepository.find();
  }

  async findOne(id: number): Promise<Requests> {
    return await this.requestRepository.findOne({
      where: { id },
      relations: { customer: true },
      select: {
        customer: { id: true, name: true },
      },
    });
  }

  async findRequestByUserAndStatus(createdBy: number): Promise<Requests[]> {
    return await this.requestRepository.find({
      where: { customer: { id: createdBy }, status: 'accepted' },
      select: {
        customer: { id: true, name: true, email: true, phoneNumber: true },
      },
    });
  }

  async findByStatus(status: string): Promise<Requests[]> {
    return await this.requestRepository.find({
      where: { status },
      relations: { customer: true },
      select: {
        customer: { id: true, name: true, email: true, phoneNumber: true },
      },
    });
  }

  async takeOnRequest(
    driverRequestDto: DriverRequestDto,
  ): Promise<DriverRequests> {
    return await this.driverRequestRepository.save(driverRequestDto);
  }

  async updateDriverRequest(
    driverRequest: DriverRequests,
    driverRequestId: number,
  ): Promise<DriverRequests> {
    await this.driverRequestRepository.update(driverRequestId, driverRequest);

    return this.findDriverRequestById(driverRequestId);
  }

  async findDriverRequestById(requestId: number): Promise<DriverRequests> {
    return await this.driverRequestRepository.findOne({
      where: { request: { id: requestId } },
      relations: { driver: true, request: true },
    });
  }

  async findActiveDriverRequests(driverId: number): Promise<DriverRequests[]> {
    return await this.driverRequestRepository.find({
      where: { driver: { id: driverId }, status: 'accepted' },
      relations: { driver: true, request: true },
    });
  }
}
