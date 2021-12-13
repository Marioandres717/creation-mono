import { Tag } from '@creation-mono/shared/types';
import { IsIn, IsUUID, Length } from 'class-validator';

export default class TagValidationPipe implements Tag {
  @IsUUID()
  id: string;

  @IsUUID()
  userId?: string;

  @Length(1, 50)
  name: string;

  @IsIn([0, 1])
  isSystemDefined?: number;
}
