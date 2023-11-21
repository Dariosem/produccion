import { z } from 'zod';

export const pacienteSchema = z.object({
    email: z.string().optional(),
    nombre: z.string({
        required_error: 'El nombre es obligatorio'
    }),
    apellido: z.string({
        required_error: 'El apellido es obligatorio'
    }),
    dni: z.string({
        required_error: 'El dni es obligatorio'
    }),
    cuit: z.string().optional(),
    telefono: z.string({
        required_error: 'El teléfono es obligatorio'
    }),
    telefono2: z.string().optional(),
    fechaNacimiento: z.string().optional(),
    sexo: z.string().optional(),
    direccion: z.string().optional(),
    image: z.string().optional(),
    categoria: z.string().optional(),
    banco: z.string().optional(),
    cuenta: z.string().optional(),
    obraSocial: z.string().optional(),  
    numeroObraSocial: z.string().optional(),
    activo: z.string().default("1")  
});