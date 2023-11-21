import { Router } from 'express';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import { profesionalSchema } from '../../schemas/profesional.schema.js';
import { createProfesional, deleteProfesional, getAllProfesionales, getProfesionalById, updateProfesional } from './profesional.controller.js';

const router = Router();

router.get('/', getAllProfesionales) ;
router.get('/search/:search', getAllProfesionales);
router.get('/:id', getProfesionalById);
router.post('/', dataValidate(profesionalSchema), createProfesional);
router.patch('/:id', updateProfesional);
router.delete('/:id', deleteProfesional);

export default router;