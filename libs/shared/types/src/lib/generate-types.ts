import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

export const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [
    'libs/shared/types/.mesh/*.graphql',
    'libs/shared/types/src/**/*.graphql',
  ],
  path: join(process.cwd(), 'libs/shared/types/src/index.ts'),
  outputAs: 'interface',
  watch: false,
  emitTypenameField: false,
});
