import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsTagsQueriesResolver } from './transactions-tags-queries.resolver';

describe('TransactionsTagsQueriesResolver', () => {
  let resolver: TransactionsTagsQueriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsTagsQueriesResolver],
    }).compile();

    resolver = module.get<TransactionsTagsQueriesResolver>(
      TransactionsTagsQueriesResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
