import { Router } from 'express';
import { getQtyHistoriaClinica } from './indicador.controller.js';


const router = Router();

router.get('/hc/:id', getQtyHistoriaClinica);


export default router;