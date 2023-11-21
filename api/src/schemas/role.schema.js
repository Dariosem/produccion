import { z } from 'zod';

export const roleSchema = z.object({
    rolename: z.string({
        required_error: 'El nombre del rol es obligatorio'
    }),
    description: z.string().optional()
});