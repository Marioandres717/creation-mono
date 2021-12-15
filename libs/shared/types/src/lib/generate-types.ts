import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

export const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['libs/shared/types/src/**/*.graphql'],
  path: join(process.cwd(), 'libs/shared/types/src/graphql-types.ts'),
  outputAs: 'interface',
  watch: false,
  emitTypenameField: false,
  enumsAsTypes: true,
});
