import { PrismaClient } from './generated/prisma';

// Prevent multiple instances during development/testing
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Use a single instance of Prisma Client in development
export const prisma = globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

// Assign to global object in non-production
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
export const db = prisma;