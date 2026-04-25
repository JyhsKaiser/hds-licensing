import { PrismaClient } from '@hds/database';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}