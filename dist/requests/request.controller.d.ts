import { Requests } from '@absolute/models/request.entity';
import { DriverRequests } from '@absolute/models/request_riders.entity';
import { RequestDto } from './dtos/request.dto';
import { RequestService } from './request.service';
export declare class RequestController {
    private readonly requestService;
    constructor(requestService: RequestService);
    makeRideRequest(requestDto: RequestDto, req: any): Promise<Requests>;
    getAllRidesThatNeedARider(): Promise<Requests[]>;
    takeOverRequest(req: any, params: any): Promise<DriverRequests>;
    updateDriverRequest(req: any, params: any): Promise<DriverRequests>;
}
