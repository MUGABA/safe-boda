import { Requests } from '@absolute/models/request.entity';
import { RequestDto } from '@absolute/requests/dtos/request.dto';
import { DataSource } from 'typeorm';

export class RequestInstanceFactory {
  private dataSource: DataSource;

  static new(dataSource: DataSource) {
    const factory = new RequestInstanceFactory();
    factory.dataSource = dataSource;
    return factory;
  }

  async create(request: Requests) {
    const requestRepository = this.dataSource.getRepository(RequestDto);

    return requestRepository.save(request);
  }
}
