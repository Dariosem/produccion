import { z } from 'zod';

export const almacenSchema = z.object({
    nombre: z.string({
        required_error: 'El nombre es obligatorio'
    }),
    descripcion: z.string().optional()
});