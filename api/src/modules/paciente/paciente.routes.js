import { Router } from 'express';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import { pacienteSchema } from '../../schemas/paciente.schema.js';
import { createPaciente, deletePaciente, getAllPacientes, getPacienteByDni, getPacienteById, updatePaciente } from './paciente.controller.js';

const router = Router();

router.get('/', getAllPacientes) ;
router.get('/search/:search', getAllPacientes) ;
router.get('/:id', getPacienteById);
router.get('/dni/:dni', getPacienteByDni);
router.post('/', dataValidate(pacienteSchema), createPaciente);
router.patch('/:id', updatePaciente);
router.delete('/:id', deletePaciente);

export default router;