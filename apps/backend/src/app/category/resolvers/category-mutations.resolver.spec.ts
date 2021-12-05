import { Test, TestingModule } from '@nestjs/testing';
import { CategoryMutationsResolver } from './category-mutations.resolver';

describe('CategoryMutationsResolver', () => {
  let resolver: CategoryMutationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryMutationsResolver],
    }).compile();

    resolver = module.get<CategoryMutationsResolver>(CategoryMutationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
