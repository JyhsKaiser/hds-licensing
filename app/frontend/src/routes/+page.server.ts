import { LicenseSchema } from '@hds/shared-schemas';
import { fail } from '@sveltejs/kit';

export const actions = {
    // Acción por defecto para procesar el formulario de creación
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());

        // 1. Validamos usando el contrato compartido (Zod)
        const result = LicenseSchema.safeParse({
            ...formData,
            durationMonths: Number(formData.durationMonths)
        });

        if (!result.success) {
            // Devolvemos los errores de validación para mostrarlos en la UI
            return fail(400, {
                errors: result.error.flatten().fieldErrors,
                values: formData
            });
        }

        try {
            // 2. Enviamos la petición al backend de Fastify
            // Usamos el nombre del servicio 'backend' si estás en Docker
            const response = await fetch('http://localhost:3000/api/licenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result.data)
            });

            if (!response.ok) {
                return fail(500, { message: 'Error interno en el servidor de licencias' });
            }

            const newLicense = await response.json();
            return { success: true, license: newLicense };

        } catch (err) {
            return fail(500, { message: 'No se pudo conectar con el backend' });
        }
    }
};