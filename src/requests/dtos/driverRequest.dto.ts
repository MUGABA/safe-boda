import { requestStatus } from '@absolute/helpers/requestStatus';
import { Requests } from '@absolute/models/request.entity';
import { User } from '@absolute/models/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class DriverRequestDto {
  @ApiProperty({
    description: 'Request Driver is working with',
    example: '1',
  })
  request: Requests;

  @ApiProperty({
    description: 'Driver engaging on the customer Request',
    example: '1',
  })
  driver: User;

  @ApiProperty({
    example: 'canceled/pending',
    description: `Request status`,
  })
  @IsEnum(requestStatus)
  status: string = 'accepted';
}
