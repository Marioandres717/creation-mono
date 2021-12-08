/* eslint-disable @typescript-eslint/no-var-requires */
const pc = require('.prisma/client');
const PrismaClient = pc.PrismaClient;
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      email: 'tech@walletdb.com',
    },
    update: {},
    create: {
      email: 'tech@walletdb.com',
      username: 'tech',
      password: 'asd123',
      isActive: 1,
    },
  });

  CATEGORIES.map(
    async (category) =>
      await prisma.category.create({
        data: {
          name: category,
          isSystemDefined: 1,
        },
      })
  );

  TAGS.map(
    async (tag) =>
      await prisma.tag.create({
        data: {
          name: tag,
          isSystemDefined: 1,
        },
      })
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });

const CATEGORIES = [
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

const TAGS = ['Tax Related', 'Reimbursable', 'Vacation'];
