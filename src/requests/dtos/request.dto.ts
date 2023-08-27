import { requestStatus } from '@absolute/helpers/requestStatus';
import { User } from '@absolute/models/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';

export class RequestDto {
  @ApiProperty({
    example: 'Pick up location for the user',
    description: `Customer pick up location`,
  })
  @MaxLength(255)
  @IsNotEmpty()
  readonly pickUpLocation: string;

  @ApiProperty({
    example: 'Destination Location',
    description: 'Customer destination Location',
  })
  @MaxLength(255)
  @IsNotEmpty()
  readonly destinationLocation: string;

  @ApiProperty({
    description: 'Customer requesting for a ride',
    example: '1',
  })
  customer: User;

  @ApiProperty({
    example: 'canceled/pending',
    description: `Request status`,
  })
  @IsEnum(requestStatus)
  readonly status: string = 'pending';
}
