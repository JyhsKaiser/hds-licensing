// packages/shared-schemas/license.schema.ts
import { z } from 'zod';

export const LicenseSchema = z.object({
    clientName: z
        .string()
        .min(3, "El nombre del cliente debe tener al menos 3 caracteres")
        .max(100),
    serviceName: z
        .string()
        .min(2, "El nombre del servicio es obligatorio"),
    plan: z.enum(['FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE'], {
        errorMap: () => ({ message: "Selecciona un plan válido" })
    }),
    // Duración en meses para calcular la fecha de expiración en el server
    durationMonths: z.number().int().min(1).max(24)
});

// Inferimos el tipo de TypeScript directamente del esquema de Zod
// Así no tenemos que escribir la interfaz manualmente
export type LicenseInput = z.infer<typeof LicenseSchema>;