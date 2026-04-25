import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma';
import corsPlugin from './plugins/cors';
import { licenseRoutes } from './modules/licenses/license.routes'; // Importación nueva

export const buildApp = async () => {
    const app = Fastify({
        logger: { transport: { target: 'pino-pretty' } },
    });

    await app.register(prismaPlugin);
    await app.register(corsPlugin);

    // Registro del módulo de negocio con prefijo de API
    await app.register(licenseRoutes, { prefix: '/api/licenses' });

    return app;
};