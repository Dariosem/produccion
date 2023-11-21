import { z } from 'zod';

export const profesionalSchema = z.object({
    email: z.string({
        required_error: 'El email es obligatorio'
    }),
    nombre: z.string({
        required_error: 'El nombre es obligatorio'
    }),
    apellido: z.string({
        required_error: 'El apellido es obligatorio'
    }),
    dni: z.string({
        required_error: 'El dni es obligatorio'
    }),
    telefono: z.string({
        required_error: 'El teléfono es obligatorio'
    }),
    especialidad: z.string({
        required_error: 'La especialidad es obligatoria'
    }),
    color: z.string({
        required_error: 'El color es obligatorio'
    }),
    image: z.string().optional()
});