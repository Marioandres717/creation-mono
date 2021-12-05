import { Test, TestingModule } from '@nestjs/testing';
import { TagMutationsResolver } from './tag-mutations.resolver';

describe('TagMutationsResolver', () => {
  let resolver: TagMutationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagMutationsResolver],
    }).compile();

    resolver = module.get<TagMutationsResolver>(TagMutationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
