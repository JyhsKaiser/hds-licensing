import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async (server) => {
    server.register(cors, {
        origin: true, // En desarrollo permitimos todo, en producción pondrás tu dominio
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
});