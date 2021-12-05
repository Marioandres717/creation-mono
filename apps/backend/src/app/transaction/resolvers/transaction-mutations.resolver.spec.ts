import { Test, TestingModule } from '@nestjs/testing';
import { TransactionMutationsResolver } from './transaction-mutations.resolver';

describe('TransactionMutationsResolver', () => {
  let resolver: TransactionMutationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionMutationsResolver],
    }).compile();

    resolver = module.get<TransactionMutationsResolver>(
      TransactionMutationsResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
