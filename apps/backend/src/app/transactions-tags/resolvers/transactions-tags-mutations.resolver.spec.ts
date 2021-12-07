import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsTagsMutationsResolver } from './transactions-tags-mutations.resolver';

describe('TransactionsTagsMutationsResolver', () => {
  let resolver: TransactionsTagsMutationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsTagsMutationsResolver],
    }).compile();

    resolver = module.get<TransactionsTagsMutationsResolver>(
      TransactionsTagsMutationsResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
