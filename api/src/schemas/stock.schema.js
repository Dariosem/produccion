import { z } from 'zod';

export const stockSchema = z.object({
    articulo: z.string({
        required_error: 'El código del artículo es obligatorio'
    }),
    almacen: z.string({
        required_error: 'El código del almacén es obligatorio'
    }),
    cantidad: z.number().nonnegative().optional(),
});