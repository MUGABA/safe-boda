import { Controller, Get } from '@nestjs/common';
import { IUserService } from './domain/interface/user.service.interface';
import { User } from 'src/models/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: IUserService) {}

  @Get('/')
  async getUser(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
