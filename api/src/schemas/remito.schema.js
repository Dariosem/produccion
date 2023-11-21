import { z } from 'zod';

export const remitoSchema = z.object({
    fecha: z.string({
        required_error: 'La fecha es requerida'
    }),
    profesional: z.string().optional(),
    articulos: z.array().optional(),
    practicas: z.array().optional(),
    paciente: z.string({
        required_error: 'El paciente es requerido'
    }),
    
    estado:z.string({
        required_error: 'El estado es requerido'
    }),
    fechaCambioEstado: z.string().optional(),
    usuarioCambioEstado: z.string().optional(),
    
});