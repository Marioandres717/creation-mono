import { TransactionsTagsWhereInput } from '@creation-mono/shared/types';
import { IsUUID } from 'class-validator';

export default class TransactionsTagsValidationPipe
  implements TransactionsTagsWhereInput
{
  @IsUUID()
  id: string;

  @IsUUID()
  transactionId: string;

  @IsUUID()
  tagId: string;
}
