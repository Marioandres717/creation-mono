import { Test, TestingModule } from '@nestjs/testing';
import { TransactionQueriesResolver } from './transaction-queries.resolver';

describe('TransactionQueriesResolver', () => {
  let resolver: TransactionQueriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionQueriesResolver],
    }).compile();

    resolver = module.get<TransactionQueriesResolver>(
      TransactionQueriesResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
