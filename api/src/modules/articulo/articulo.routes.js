import { Router } from 'express';
import { createModel, deleteModel, getAllInventoryModels, getAllModels, getModelById, updateModel, updatePrice } from './articulo.controller.js';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import {articuloSchema} from '../../schemas/articulo.schema.js';

const router = Router();

router.get('/', getAllModels) ;
router.get('/search/:search', getAllModels) ;
router.get('/inventariable', getAllInventoryModels) ;
router.get('/:id', getModelById);
router.post('/', dataValidate(articuloSchema), createModel);
router.post('/precios-update', updatePrice);
router.patch('/:id', updateModel);
router.delete('/:id', deleteModel);

export default router;