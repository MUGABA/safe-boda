// import { Requests } from 'src/models/request.entity';
import { Requests } from '@absolute/models/request.entity';
import { DriverRequests } from '@absolute/models/request_riders.entity';

export abstract class IRequestService {
  abstract makeRequest(request: Requests, userId: number): Promise<Requests>;
  abstract update(id: string, request: Requests): Promise<Requests>;
  abstract delete(id: string): Promise<Requests>;
  abstract findAll(): Promise<Requests[]>;
  abstract findOne(id: string): Promise<Requests>;
  abstract findByStatus(status: string): Promise<Requests[]>;
  abstract takeOnRequest(
    requestId: number,
    driverId: number,
    status: string,
  ): Promise<DriverRequests>;
}
