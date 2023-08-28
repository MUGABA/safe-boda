import jwtConfig from '@absolute/config/jwt.config';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtConfiguration;
    private readonly jwtService;
    private reflector;
    constructor(jwtConfiguration: ConfigType<typeof jwtConfig>, jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private getToken;
}
