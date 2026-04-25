import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { prisma } from '@hds/database';

// fp hace que el plugin no cree un nuevo scope y prisma sea global
const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
    server.decorate('prisma', prisma);

    server.addHook('onClose', async (server) => {
        await server.prisma.$disconnect();
    });
});

export default prismaPlugin;