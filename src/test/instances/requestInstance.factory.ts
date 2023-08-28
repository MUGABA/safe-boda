import { Requests } from '@absolute/models/request.entity';
import { DataSource } from 'typeorm';

export class RequestInstanceFactory {
  private dataSource: DataSource;

  static new(dataSource: DataSource) {
    const factory = new RequestInstanceFactory();
    factory.dataSource = dataSource;
    return factory;
  }

  async create(request: Partial<Requests>) {
    const requestRepository = this.dataSource.getRepository(Requests);

    return requestRepository.save(request);
  }
}
