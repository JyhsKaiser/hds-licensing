import { FastifyReply, FastifyRequest } from 'fastify';
import { LicenseService } from './license.service';
import { LicenseSchema } from '@hds/shared-schemas';

export class LicenseController {
    constructor(private service: LicenseService) { }

    async create(request: FastifyRequest, reply: FastifyReply) {
        // Validación con Zod (Aduana de datos)
        const result = LicenseSchema.safeParse(request.body);

        if (!result.success) {
            return reply.code(400).send({
                error: 'Validation failed',
                details: result.error.format()
            });
        }

        const license = await this.service.createLicense(result.data);
        return reply.code(201).send(license);
    }

    async list(_request: FastifyRequest, reply: FastifyReply) {
        const licenses = await this.service.getAllLicenses();
        return reply.send(licenses);
    }
}