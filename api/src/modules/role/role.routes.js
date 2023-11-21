import { Router } from 'express';
import { createRole, deleteRole, getAllRoles, getRoleById, updateRole } from './role.controller.js';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import { roleSchema } from '../../schemas/role.schema.js';

const router = Router();

router.get('/', getAllRoles) ;
router.get('/search/:search', getAllRoles) ;
router.get('/:id', getRoleById);
router.post('/', dataValidate(roleSchema), createRole);
router.patch('/:id', updateRole);
router.delete('/:id', deleteRole);

export default router;