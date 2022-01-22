import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TagService } from '../../repository/tag.service';
import { CreateInitialTagsCommand } from '../impl/create-initial-tags.command';

@CommandHandler(CreateInitialTagsCommand)
export class CreateInitialTagsHandler
  implements ICommandHandler<CreateInitialTagsCommand>
{
  constructor(private readonly repository: TagService) {}

  execute(command: CreateInitialTagsCommand) {
    const { tags } = command;
    return this.repository.createTags(tags);
  }
}
