import { DateTime, TransactionWhereInput } from '@creation-mono/shared/types';
import { IsCurrency, IsDate, IsIn, IsUUID, Length } from 'class-validator';

export default class TransactionValidationPipe
  implements TransactionWhereInput
{
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  categoryId: string;

  @IsCurrency()
  amount: number;

  @Length(0, 250)
  description?: string;

  @IsDate()
  date?: DateTime;

  @IsIn([0, 1])
  isExpense?: number;
}
