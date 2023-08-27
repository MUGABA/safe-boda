import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { User } from 'src/models/user.entity';
import { IUserRepository } from './domain/interface/user.repository.interface';
import { IUserService } from './domain/interface/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  create(user: SignUpDto): Promise<User> {
    return this.userRepository.create(user);
  }
  update(id: number, user: SignUpDto): Promise<User> {
    return this.userRepository.update(id, user);
  }
  delete(id: number): Promise<User> {
    return this.userRepository.delete(id);
  }
  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
