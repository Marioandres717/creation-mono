const TAGS_NAMES = ['Tax Related', 'Reimbursable', 'Vacation'];

export class CreateInitialTagsCommand {
  tags: { name: string; userId: string }[];
  constructor(public readonly userId: string) {
    this.tags = TAGS_NAMES.map((name) => ({
      name,
      userId,
    }));
  }
}
