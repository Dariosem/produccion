import { z } from 'zod';

export const turnoSchema = z.object({
    title: z.string({
        required_error: 'El título es obligatorio'
    }),
    start: z.string({
        required_error: 'La fecha y hora de inicio es obligatoria'
    }).datetime(),
    end: z.string({
        required_error: 'La fecha y hora de fin es obligatoria'
    }).datetime(),
});