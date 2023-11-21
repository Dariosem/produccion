import { Router } from 'express';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import { visitaSchema } from '../../schemas/visita.schema.js';
import { createVisita, deleteVisita, fileDelete, fileUpload, getAllVisitas, getVisitaById, getVisitaByPaciente, updateVisita } from './visita.controller.js';

const router = Router();

router.get('/', getAllVisitas) ;
router.get('/search/:search', getAllVisitas);
router.get('/:id', getVisitaById);
router.get('/paciente/:id', getVisitaByPaciente);
router.post('/', createVisita);
//router.post('/', dataValidate(visitaSchema), createVisita);

router.post('/upload', fileUpload);
router.post('/file-delete', fileDelete);
router.patch('/:id', updateVisita);
router.delete('/:id', deleteVisita);

export default router;