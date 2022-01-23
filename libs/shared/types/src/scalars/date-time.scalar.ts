import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateTime')
export class DateTimeScalar implements CustomScalar<string, Date> {
  description =
    'A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.';

  parseValue(value: string): Date {
    return new Date(value);
  }

  serialize(value: string): string {
    return new Date(value).toJSON();
  }

  parseLiteral(ast: ValueNode): Date {
    switch (ast.kind) {
      case Kind.INT:
      case Kind.STRING:
        return new Date(ast.value);
      default:
        return null;
    }
  }
}
