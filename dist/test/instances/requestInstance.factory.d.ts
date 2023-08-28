import { Requests } from '@absolute/models/request.entity';
import { DataSource } from 'typeorm';
export declare class RequestInstanceFactory {
    private dataSource;
    static new(dataSource: DataSource): RequestInstanceFactory;
    create(request: Partial<Requests>): Promise<Partial<Requests> & Requests>;
}
