import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ForbiddenException,
  InternalServerErrorException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { LoggerService } from '@creation-mono/shared/logger';
import {
  AuthenticationLoginFailure,
  AuthorizationFailure,
  InputValidationFailure,
} from '../logger-events/types';

const HANDLED_EXCEPTIONS = [
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  NotImplementedException,
];

@Catch()
export class AllExceptionFilter implements GqlExceptionFilter {
  constructor(private loggerService: LoggerService) {
    this.loggerService.setContext('AllExceptionFilter');
  }
  instanceOfException(exception) {
    const [handledException] = HANDLED_EXCEPTIONS.map((excep) =>
      exception instanceof excep ? excep : undefined
    ).filter((except) => except);
    return handledException ? handledException : InternalServerErrorException;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const { req } = host.getArgByIndex(2);
    const excep = this.instanceOfException(exception);
    switch (excep) {
      case UnauthorizedException: {
        this.loggerService.warn(new AuthenticationLoginFailure(req, {}).log());
        break;
      }
      case ForbiddenException: {
        this.loggerService.critical(new AuthorizationFailure(req).log());
        break;
      }
      case BadRequestException: {
        this.loggerService.warn(new InputValidationFailure(req).log());
        break;
      }
      case NotImplementedException:
      case InternalServerErrorException:
      default: {
        break;
      }
    }
    return new excep();
  }
}
