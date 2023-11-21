import { z } from 'zod';

export const categoriaPacienteSchema = z.object({
    nombre: z.string({
        required_error: 'El nombre de la categoria es obligatorio'
    }),
    descripcion: z.string().optional(),
    indicePrecio: z.string({
        required_error: 'El índice de precio es obligatorio'
    })
});