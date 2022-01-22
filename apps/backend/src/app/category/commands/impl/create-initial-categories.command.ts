const CATEGORIES_NAMES = [
  'Auto & Transport',
  'Bills & Utilities',
  'Business Services',
  'Education',
  'Entertainment',
  'Fees & Charges',
  'Financial',
  'Food & Dining',
  'Gifts & Donations',
  'Health & Fitness',
  'Home',
  'Income',
  'Kids',
  'Misc Expenses',
  'Personal Care',
  'Pets',
  'Shopping',
  'Taxes',
  'Transfer',
  'Travel',
  'Uncategorized',
];

export class CreateInitialCategoriesCommand {
  categories: { name: string; userId: string }[];
  constructor(public readonly userId: string) {
    this.categories = CATEGORIES_NAMES.map((name) => ({
      name,
      userId,
    }));
  }
}
