import { Test, TestingModule } from '@nestjs/testing';
import { CategoryQueriesResolver } from './category-queries.resolver';

describe('CategoryQueriesResolver', () => {
  let resolver: CategoryQueriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryQueriesResolver],
    }).compile();

    resolver = module.get<CategoryQueriesResolver>(CategoryQueriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
