import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Add users if needed
  const users = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ];

  for (const user of users) {
    const exists = await prisma.user.findUnique({ where: { email: user.email } });
    if (!exists) {
      await prisma.user.create({ data: user });
    }
  }

  // Add sample products
  const products = [
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 50 },
    { name: 'Product 3', price: 75 },
  ];

  for (const product of products) {
    const exists = await prisma.product.findUnique({ where: { name: product.name } });
    if (!exists) {
      await prisma.product.create({ data: product });
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
