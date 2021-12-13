import { TransactionsTags } from '@creation-mono/shared/types';
import { IsUUID } from 'class-validator';

export default class TransactionsTagsValidationPipe
  implements TransactionsTags
{
  @IsUUID()
  id: string;

  @IsUUID()
  transactionId: string;

  @IsUUID()
  tagId: string;
}
