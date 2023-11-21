import { Router } from 'express';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import { turnoSchema } from '../../schemas/turno.schema.js';
import { createTurno, deleteTurno, getAllFilteredTurnos, getAllTurnos, getTurnoById, updateTurno } from './turno.controller.js';

const router = Router();

router.get('/', getAllTurnos) ;
router.get('/:search', getAllTurnos) ;
router.get('/:id', getTurnoById);
router.post('/', dataValidate(turnoSchema), createTurno);
router.post('/filter', getAllFilteredTurnos);
router.patch('/:id', updateTurno);
router.delete('/:id', deleteTurno);

export default router;