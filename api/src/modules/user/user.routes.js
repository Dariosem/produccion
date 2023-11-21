import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './user.controller.js';

const router = Router();

router.get('/', getAllUsers) ;
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;