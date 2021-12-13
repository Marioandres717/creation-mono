import { Transaction, TransactionType } from '@creation-mono/shared/types';
import {
  IsCurrency,
  IsDate,
  IsEnum,
  IsIn,
  IsUUID,
  Length,
} from 'class-validator';

export default class TransactionValidationPipe implements Transaction {
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
  date?: any;

  @IsIn([0, 1])
  isExpense?: number;

  @IsEnum(TransactionType)
  type?: TransactionType;
}
