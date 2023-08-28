import { ActiveUserData } from '@absolute/helpers/activeUserData';
import { Requests } from '@absolute/models/request.entity';
import { DriverRequests } from '@absolute/models/request_riders.entity';
import { UsersRepository } from '@absolute/user/domain/repository/user.repository';
import { IRequestService } from './domains/interfaces/request.service.interface';
import { RequestsRepository } from './domains/repository/request.repository';
import { RequestDto } from './dtos/request.dto';
export declare class RequestService implements IRequestService {
    private readonly requestRepository;
    private readonly usersRepository;
    constructor(requestRepository: RequestsRepository, usersRepository: UsersRepository);
    makeRequest(request: RequestDto, userId: number): Promise<Requests>;
    findByStatus(status: string): Promise<Requests[]>;
    takeOnRequest(requestId: number, driverId: number): Promise<DriverRequests>;
    updateDriverRequest(driverRequestId: number, status: string, currentUser: ActiveUserData): Promise<DriverRequests>;
}
