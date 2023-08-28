import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class AppInstanceFactory {
    private readonly appInstance;
    private readonly dataSource;
    private constructor();
    get instance(): INestApplication<any>;
    get dbSource(): DataSource;
    static new(): Promise<AppInstanceFactory>;
    close(): Promise<void>;
    cleanupDB(): Promise<void>;
}
