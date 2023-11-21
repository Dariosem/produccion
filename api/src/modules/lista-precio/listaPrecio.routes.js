import { Router } from 'express';
import { createModel, deleteModel, getAllModels, getModelById, updateModel } from './listaPrecio.controller.js';

const router = Router();

router.get('/', getAllModels) ;
router.get('/search/:search', getAllModels) ;
router.get('/:id', getModelById);
router.post('/', createModel);
router.patch('/:id', updateModel);
router.delete('/:id', deleteModel);

export default router;