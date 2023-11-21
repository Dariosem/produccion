import { Router } from 'express';
import { createModel, deleteModel, getAllModels, getModelById, updateModel } from './categoriaPaciente.controller.js';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import {categoriaPacienteSchema} from '../../schemas/categoriaPaciente.schema.js';


const router = Router();

router.get('/', getAllModels) ;
router.get('/search/:search', getAllModels) ;
router.get('/:id', getModelById);
router.post('/', dataValidate(categoriaPacienteSchema), createModel);
router.patch('/:id', updateModel);
router.delete('/:id', deleteModel);

export default router;