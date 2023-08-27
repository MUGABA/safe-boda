import { Requests } from '@absolute/models/request.entity';
import { RequestDto } from '@absolute/requests/dtos/request.dto';
import { DataSource } from 'typeorm';
export declare class RequestInstanceFactory {
    private dataSource;
    static new(dataSource: DataSource): RequestInstanceFactory;
    create(request: Requests): Promise<Requests & RequestDto>;
}
