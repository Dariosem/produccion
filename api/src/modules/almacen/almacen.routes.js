import { Router } from 'express';
import { createModel, deleteModel, getAllModels, getModelById, updateModel } from './almacen.controller.js';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import {almacenSchema} from '../../schemas/almacen.schema.js';


const router = Router();

router.get('/', getAllModels) ;
router.get('/search/:search', getAllModels) ;
router.get('/:id', getModelById);
router.post('/', dataValidate(almacenSchema), createModel);
router.patch('/:id', updateModel);
router.delete('/:id', deleteModel);

export default router;