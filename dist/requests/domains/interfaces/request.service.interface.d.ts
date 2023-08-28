import { Requests } from '@absolute/models/request.entity';
import { DriverRequests } from '@absolute/models/request_riders.entity';
export declare abstract class IRequestService {
    abstract makeRequest(request: Requests, userId: number): Promise<Requests>;
    abstract findByStatus(status: string): Promise<Requests[]>;
    abstract takeOnRequest(requestId: number, driverId: number, status: string): Promise<DriverRequests>;
}
