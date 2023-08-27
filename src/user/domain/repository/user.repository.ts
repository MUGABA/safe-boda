import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
// import { User } from 'src/models/user.entity';
import { User } from '@absolute/models/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: SignUpDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: number, user: SignUpDto): Promise<User> {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async delete(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    await this.userRepository.delete(id);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User[]> {
    return await this.userRepository.find({
      where: { email },
    });
  }
}
