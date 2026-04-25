import { FastifyInstance } from 'fastify';
import { LicenseController } from './license.controller';
import { LicenseService } from './license.service';

export async function licenseRoutes(server: FastifyInstance) {
    // Inyección de dependencias manual (Simple y efectiva)
    const service = new LicenseService(server.prisma);
    const controller = new LicenseController(service);

    server.post('/', (req, res) => controller.create(req, res));
    server.get('/', (req, res) => controller.list(req, res));
}