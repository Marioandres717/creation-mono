import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Context = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return GqlExecutionContext.create(context);
  },
);
