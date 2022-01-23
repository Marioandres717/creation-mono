import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode, Kind } from 'graphql';
import { Decimal } from 'decimal.js-light';

@Scalar('Decimal')
export class DecimalScalar implements CustomScalar<string, string> {
  description?: 'An arbitrary-precision Decimal type for JavaScript.';
  parseValue(value: string): string {
    return new Decimal(value).toJSON();
  }

  serialize(value: Decimal): string {
    return value.toJSON();
  }

  parseLiteral(ast: ValueNode): string {
    switch (ast.kind) {
      case Kind.INT:
      case Kind.STRING:
      case Kind.FLOAT:
        return new Decimal(ast.value).toJSON();
      default:
        return null;
    }
  }
}
