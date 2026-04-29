// @ts-nocheck
import { LicenseSchema } from '@hds/shared-schemas';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

// ESTA ES LA FUNCIÓN QUE TE FALTA PARA QUITAR EL ERROR 500
export const load = async ({ fetch }: Parameters<PageServerLoad>[0]) => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/licenses');

        if (!response.ok) {
            return { licenses: [], error: 'El servidor respondió con error' };
        }

        const licenses = await response.json();
        return { licenses };
    } catch (err) {
        // Si el back está apagado, devolvemos un array vacío en lugar de romper la página
        return { licenses: [], error: 'No se pudo conectar con el backend' };
    }
};

export const actions = {
    default: async ({ request }: import('./$types').RequestEvent) => {
        const formData = Object.fromEntries(await request.formData());

        const result = LicenseSchema.safeParse({
            ...formData,
            durationMonths: Number(formData.durationMonths)
        });

        if (!result.success) {
            return fail(400, {
                errors: result.error.flatten().fieldErrors,
                values: formData
            });
        }

        try {
            // Cambiado localhost por 127.0.0.1 para Windows
            const response = await fetch('http://127.0.0.1:3000/api/licenses', {
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
};;null as any as Actions;