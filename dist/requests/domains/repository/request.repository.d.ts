import { Requests } from '@absolute/models/request.entity';
import { DriverRequests } from '@absolute/models/request_riders.entity';
import { DriverRequestDto } from '@absolute/requests/dtos/driverRequest.dto';
import { RequestDto } from '@absolute/requests/dtos/request.dto';
import { Repository } from 'typeorm';
import { IRequestRepository } from '../interfaces/request.repository.interface';
export declare class RequestsRepository implements IRequestRepository {
    private readonly requestRepository;
    private readonly driverRequestRepository;
    constructor(requestRepository: Repository<Requests>, driverRequestRepository: Repository<DriverRequests>);
    create(request: RequestDto): Promise<Requests>;
    update(id: number, request: RequestDto): Promise<Requests>;
    findAll(): Promise<Requests[]>;
    findOne(id: number): Promise<Requests>;
    findRequestByUserAndStatus(createdBy: number): Promise<Requests[]>;
    findByStatus(status: string): Promise<Requests[]>;
    takeOnRequest(driverRequestDto: DriverRequestDto): Promise<DriverRequests>;
    updateDriverRequest(driverRequest: DriverRequests, driverRequestId: number): Promise<DriverRequests>;
    findDriverRequestById(requestId: number): Promise<DriverRequests>;
    findActiveDriverRequests(driverId: number): Promise<DriverRequests[]>;
}
