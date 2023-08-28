import { Requests } from '@absolute/models/request.entity';
import { DriverRequests } from '@absolute/models/request_riders.entity';
import { DriverRequestDto } from '@absolute/requests/dtos/driverRequest.dto';
import { RequestDto } from '@absolute/requests/dtos/request.dto';
export declare abstract class IRequestRepository {
    abstract create(request: RequestDto): Promise<Requests>;
    abstract update(id: number, request: RequestDto): Promise<Requests>;
    abstract findAll(): Promise<Requests[]>;
    abstract findOne(id: number): Promise<Requests>;
    abstract takeOnRequest(driverRequestDto: DriverRequestDto): Promise<DriverRequests>;
}
