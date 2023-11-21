import { z } from 'zod';

export const articuloSchema = z.object({
    codigoProveedor:z.string().optional(),
    codigoPropio:z.string({
        required_error: 'El código del artículo es obligatorio'
    }),
    descripcion:z.string({
        required_error: 'La descripción del artículo es obligatoria'
    }),
    precio:z.string().optional(),
    grupo:z.string({
        required_error: 'El grupo del artículo es obligatorio'
    }),
    inventariable:z.string().optional(),
    activo:z.string().optional(),
    tipo: z.string({
        required_error: 'El tipo de articulo es obligatorio'
    })
});