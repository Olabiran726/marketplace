import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Seed function
async function seed() {
  const users = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
  ];

  for (const user of users) {
    const exists = await prisma.user.findUnique({ where: { email: user.email } });
    if (!exists) await prisma.user.create({ data: user });
  }

  // Pick a user to own products
  const alice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } });
  if (!alice) throw new Error('Alice must exist');

  const products = [
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 50 },
    { name: 'Product 3', price: 75 },
  ];

  for (const product of products) {
    const exists = await prisma.product.findFirst({ where: { name: product.name } });
    if (!exists) {
      await prisma.product.create({
        data: { ...product, brand: { connect: { id: alice.id } } },
      });
    }
  }

  console.log('Seeding completed!');
}

// API route
app.get('/api/products', async (req, res) => {
  const products = await prisma.product.findMany({
    include: { brand: { select: { name: true, email: true } } },
  });
  res.json(products);
});

// Start server after seeding
seed()
  .catch(e => console.error('Error during seeding:', e))
  .finally(async () => {
    app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
  });
