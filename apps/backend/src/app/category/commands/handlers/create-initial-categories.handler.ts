import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryService } from '../../repository/category.service';
import { CreateInitialCategoriesCommand } from '../impl/create-initial-categories.command';

@CommandHandler(CreateInitialCategoriesCommand)
export class CreateInitialCategoriesHandler
  implements ICommandHandler<CreateInitialCategoriesCommand>
{
  constructor(private readonly repository: CategoryService) {}

  execute(command: CreateInitialCategoriesCommand) {
    const { categories } = command;
    return this.repository.createCategories(categories);
  }
}
