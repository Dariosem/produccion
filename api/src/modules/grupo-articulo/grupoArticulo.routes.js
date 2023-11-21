import { Router } from 'express';
import { createModel, deleteModel, getAllModels, getModelById, updateModel } from './grupoArticulo.controller.js';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import {grupoArticuloSchema} from '../../schemas/grupoArticulo.schema.js';


const router = Router();

router.get('/', getAllModels) ;
router.get('/search/:search', getAllModels) ;
router.get('/:id', getModelById);
router.post('/', dataValidate(grupoArticuloSchema), createModel);
router.patch('/:id', updateModel);
router.delete('/:id', deleteModel);

export default router;