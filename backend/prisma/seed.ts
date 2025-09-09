import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Ensure users exist
  const users = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
  ];

  for (const user of users) {
    const exists = await prisma.user.findUnique({ where: { email: user.email } });
    if (!exists) {
      await prisma.user.create({ data: user });
      console.log(`User created: ${user.email}`);
    } else {
      console.log(`User already exists: ${user.email}`);
    }
  }

  // Pick a user to own the products (e.g., Alice)
  const alice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } });
  if (!alice) throw new Error('Alice must exist');

  // Seed products
  const products = [
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 50 },
    { name: 'Product 3', price: 75 },
  ];

  for (const product of products) {
    const exists = await prisma.product.findFirst({ where: { name: product.name } });
    if (!exists) {
      await prisma.product.create({
        data: {
          ...product,
          brand: { connect: { id: alice.id } }, // Connect to Alice
        },
      });
      console.log(`Product created: ${product.name}`);
    } else {
      console.log(`Product already exists: ${product.name}`);
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch(e => console.error('Error during seeding:', e))
  .finally(async () => await prisma.$disconnect());

  