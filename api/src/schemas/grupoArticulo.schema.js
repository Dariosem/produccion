import { z } from 'zod';

export const grupoArticuloSchema = z.object({
    nombre: z.string({
        required_error: 'El nombre del rol es obligatorio'
    }),
    descripcion: z.string().optional()
});