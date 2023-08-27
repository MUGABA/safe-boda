import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Email of user',
    example: 'atest@email.com',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'Pass#123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}
