import { Test, TestingModule } from '@nestjs/testing';
import { TagQueriesResolver } from './tag-queries.resolver';

describe('TagQueriesResolver', () => {
  let resolver: TagQueriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagQueriesResolver],
    }).compile();

    resolver = module.get<TagQueriesResolver>(TagQueriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
