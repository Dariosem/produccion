import { Router } from 'express';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';
import authRouter from '../modules/auth/auth.routes.js';
import userRouter from '../modules/user/user.routes.js';
import roleRouter from '../modules/role/role.routes.js';
import articuloRouter from '../modules/articulo/articulo.routes.js';
import grupoArticuloRouter from '../modules/grupo-articulo/grupoArticulo.routes.js'
import almacenRouter from '../modules/almacen/almacen.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', checkAuth, userRouter);
router.use('/roles', checkAuth, roleRouter );
router.use('/articulos', checkAuth, articuloRouter );
router.use('/grupo-articulos', checkAuth, grupoArticuloRouter );
router.use('/almacenes', checkAuth, almacenRouter );

export default router;