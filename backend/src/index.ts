import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import util from 'node:util';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.error('API error:', util.inspect(err, { depth: null, colors: true }));
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Run server in async function to catch all errors
(async () => {
  try {
    // Try to connect Prisma early
    await prisma.$connect();
    console.log('Prisma connected successfully.');

    const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
    app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Server failed to start:', util.inspect(err, { depth: null, colors: true }));
    try { await prisma.$disconnect(); } catch (_) {}
    process.exit(1);
  }
})();

// Global safety nets
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', util.inspect(reason, { depth: null, colors: true }));
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', util.inspect(err, { depth: null, colors: true }));
});
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:3000' }));
