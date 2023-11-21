import { Router } from 'express';
import { createModel, deleteModel, getAllModels, getModelById, getModelByRef, materialReceipt, updateModel, updateModelByArticulo } from './stock.controller.js';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import {stockSchema} from '../../schemas/stock.schema.js';


const router = Router();

router.get('/', getAllModels) ;
router.get('/:tipo/:id', getModelByRef) ;
router.get('/:id', getModelById);
router.post('/', dataValidate(stockSchema), createModel);
router.post('/recepcion', materialReceipt);
router.patch('/:id', updateModel);
router.patch('/articulo/:id', updateModelByArticulo);
router.delete('/:id', deleteModel);

export default router;