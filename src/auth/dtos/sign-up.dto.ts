import { userTypes } from '@absolute/helpers/authTypes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'Muhamad Rashid Mugaba',
    description: `User's name`,
  })
  @MaxLength(255)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'test@safeboda.com',
    description: 'User Email',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'Pass#123',
  })
  @MinLength(6, {
    message: 'password too short',
  })
  @MaxLength(20, {
    message: 'password too long',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '256799067989',
    description: `User's Contact number`,
  })
  @MaxLength(255)
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({
    example: 'true',
    description: `Checks where user is available of not.`,
  })
  @IsNotEmpty()
  isDriverAvailable: boolean = false;

  @ApiProperty({
    example: 'Either Customer, Admin or Driver',
    description: `User's name`,
  })
  @IsEnum(userTypes)
  @IsNotEmpty()
  readonly userType: string;
}
