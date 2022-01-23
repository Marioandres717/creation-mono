import { CategoryWhereInput } from '@creation-mono/shared/types';
import { IsUUID, Length } from 'class-validator';

export default class CategoryValidationPipe implements CategoryWhereInput {
  @IsUUID()
  id: string;

  @IsUUID()
  userId?: string;

  @Length(1, 50)
  name: string;
}
