import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ActiveUserData } from 'src/helpers/activeUserData';

import { CustomerGuard } from '@absolute/auth/guards/customer.gaurd';
import { Requests } from '@absolute/models/request.entity';
import { DriverRequests } from '@absolute/models/request_riders.entity';
import { RequestDto } from './dtos/request.dto';
import { RequestService } from './request.service';

@ApiTags('requests')
@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    description: 'Return errors for invalid fields',
  })
  @ApiCreatedResponse({
    description: 'Request has been successfully created',
  })
  @ApiBearerAuth()
  @UseGuards(CustomerGuard)
  @Post('request-ride')
  async makeRideRequest(
    @Body() requestDto: RequestDto,
    @Request() req,
  ): Promise<Requests> {
    const currentUser: ActiveUserData = req.user;

    return await this.requestService.makeRequest(requestDto, currentUser.id);
  }
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCreatedResponse({
    description: 'Returns all pending requests from customers',
  })
  @ApiBearerAuth()
  @Get('customer-requests')
  async getAllRidesThatNeedARider(): Promise<Requests[]> {
    return await this.requestService.findByStatus('pending');
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post('take-request/:requestId/')
  async takeOverRequest(
    @Request() req,
    @Param() params,
  ): Promise<DriverRequests> {
    const currentUser: ActiveUserData = req.user;
    const { requestId } = params;

    return await this.requestService.takeOnRequest(requestId, currentUser.id);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Put('update-request/:requestId/:status')
  async updateDriverRequest(
    @Request() req,
    @Param() params,
  ): Promise<DriverRequests> {
    const currentUser: ActiveUserData = req.user;
    const { requestId, status } = params;

    return await this.requestService.updateDriverRequest(
      requestId,
      status,
      currentUser.id,
    );
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
