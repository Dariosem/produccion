import { Router } from 'express';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import { remitoSchema } from '../../schemas/remito.schema.js';
import { createModel, deleteModel, getAllModel, getModelById, getModelByPaciente, getModelByPacienteDeuda, updateModel } from './remito.controller.js';

const router = Router();

router.get('/', getAllModel) ;
router.get('/:id', getModelById);
router.get('/paciente/:id', getModelByPaciente);
router.get('/deuda/:id', getModelByPacienteDeuda);
router.post('/', createModel);
//router.post('/', dataValidate(remitoSchema), createModel);
router.patch('/:id', updateModel);
router.delete('/:id', deleteModel);

export default router;