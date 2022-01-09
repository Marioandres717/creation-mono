import { UserRole } from '@creation-mono/shared/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { LoggerService } from '@creation-mono/shared/logger';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthorizationFailure } from '../../logger-events/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('RolesGuard');
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }

    const { req } = context.getArgByIndex(2);
    const userRole = req.user && req.user.role;
    if (!requiredRoles.includes(userRole)) {
      this.loggerService.critical(new AuthorizationFailure(req).log());
      return false;
    }
    return true;
  }
}
