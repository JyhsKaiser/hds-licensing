// packages/database/index.ts
import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'], // Útil para aprender qué SQL genera Prisma por detrás
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;