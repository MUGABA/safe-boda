import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

// import { Public } from 'src/helpers/decorators/PublicRoute.decorator';
import { SignUpDto } from './dtos/sign-up.dto';
import { AuthService } from './services/auth.service';

import { AuthResponse } from '@absolute/helpers/authResponse';
import { Public } from '@absolute/helpers/decorators/PublicRoute.decorator';
import { User } from 'src/models/user.entity';
import { SignInDto } from './dtos/sign-in.dto';
import { DriverGuard } from './guards/driver.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiConflictResponse({
    description: 'User already exists',
  })
  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign up fields',
  })
  @ApiCreatedResponse({
    description: 'User has been successfully signed up',
  })
  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponse> {
    return await this.authService.signUp(signUpDto);
  }

  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign in fields',
  })
  @ApiOkResponse({ description: 'User has been successfully signed in' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn(signInDto);
  }

  @ApiBadRequestResponse({
    description: 'Returns error incase user fails to update availability',
  })
  @ApiOkResponse({
    description: 'Driver successfully updated his/her availability',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(DriverGuard)
  @Patch('toggle-available')
  async toggleDriverIsAvailable(@Request() req): Promise<User> {
    return await this.authService.toggleDriverAvailable(req.user);
  }

  // @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  // @ApiOkResponse({ description: 'User has been successfully signed out' })
  // @ApiBearerAuth()
  // @HttpCode(HttpStatus.OK)
  // @Post('sign-out')
  // signOut(@ActiveUser('id') userId: string): Promise<void> {
  //   return this.authService.signOut(userId);
  // }
}
