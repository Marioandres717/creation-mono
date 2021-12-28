import {
  BadRequestException,
  Catch,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

const HANDLED_EXCEPTIONS = [UnauthorizedException, BadRequestException];

@Catch()
export class AllExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown) {
    const handledExceptions = HANDLED_EXCEPTIONS.map(
      (excep) => exception instanceof excep
    ).filter((except) => except === true);

    return handledExceptions.length
      ? exception
      : new InternalServerErrorException();
  }
}
