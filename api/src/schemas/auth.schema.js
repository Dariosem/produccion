import { z } from 'zod';

export const loginSchema = z.object({
    dni: z.string({
        required_error: "El usuario es obligatorio"
    }).min(6, {message: 'El dni debe tener mas de 6 caracteres'}),
    password: z.string({
        required_error: "La contraseña es obligatoria"
    }),
})