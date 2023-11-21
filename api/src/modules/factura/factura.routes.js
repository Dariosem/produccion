import { Router } from 'express';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import { remitoSchema } from '../../schemas/remito.schema.js';
import { createModel, getAllModel, getModelById, getModelByPaciente, 
    getVoucherTypes, getDocumentTypes, getLastVoucher, getVoucherInfo, getServerStatus 
} from './factura.controller.js';

const router = Router();

router.get('/tipos-comprobante', getVoucherTypes);
router.get('/tipos-documento', getDocumentTypes);
router.get('/ultimo-numero', getLastVoucher);
router.get('/info/:numero', getVoucherInfo);
router.get('/id/:id', getModelById);
router.get('/paciente/:id', getModelByPaciente);
router.get('/estado-server', getServerStatus);
router.get('/', getAllModel) ;
router.post('/', createModel);
//router.post('/', dataValidate(remitoSchema), createModel);

export default router;