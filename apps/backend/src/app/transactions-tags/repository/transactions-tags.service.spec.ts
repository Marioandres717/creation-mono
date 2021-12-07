import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsTagsService } from './transactions-tags.service';

describe('TransactionsTagsService', () => {
  let service: TransactionsTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsTagsService],
    }).compile();

    service = module.get<TransactionsTagsService>(TransactionsTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
