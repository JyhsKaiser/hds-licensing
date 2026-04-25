import { PrismaClient } from '@hds/database';
import { LicenseInput } from '@hds/shared-schemas';
import { randomBytes } from 'crypto';

export class LicenseService {
    constructor(private prisma: PrismaClient) { }

    async createLicense(data: LicenseInput) {
        // Lógica de negocio: Generar clave única de HDS
        const licenseKey = `HDS-${randomBytes(8).toString('hex').toUpperCase()}`;

        // Calcular expiración
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + data.durationMonths);

        return await this.prisma.license.create({
            data: {
                clientName: data.clientName,
                serviceName: data.serviceName,
                plan: data.plan,
                licenseKey,
                expiresAt,
            },
        });
    }

    async getAllLicenses() {
        return await this.prisma.license.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
}