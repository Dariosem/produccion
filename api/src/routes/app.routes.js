import { Router } from 'express';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';
import authRouter from '../modules/auth/auth.routes.js';
import userRouter from '../modules/user/user.routes.js';
import roleRouter from '../modules/role/role.routes.js';
import pacienteRouter from '../modules/paciente/paciente.routes.js';
import profesionalRouter from '../modules/profesional/profesional.routes.js';
import turnoRouter from '../modules/turnos/turno.routes.js'
import visitaRouter from '../modules/visita/visita.routes.js'
import articuloRouter from '../modules/articulo/articulo.routes.js';
import listaPrecioRouter from '../modules/lista-precio/listaPrecio.routes.js';
import grupoArticuloRouter from '../modules/grupo-articulo/grupoArticulo.routes.js'
import almacenRouter from '../modules/almacen/almacen.routes.js';
import stockRouter from '../modules/stock/stock.routes.js';
import categoriaPacienteRouter from '../modules/categoria-paciente/categoriaPaciente.routes.js';
import remitoRouter from '../modules/remito/remito.routes.js';
import facturaRoutes from '../modules/factura/factura.routes.js';
import pagosRecibidosRoutes from '../modules/pago-recibido/pago.recibido.routes.js';
import indicadoresRoutes from '../modules/indicador/indicador.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', checkAuth, userRouter);
router.use('/roles', checkAuth, roleRouter );
router.use('/pacientes', checkAuth, pacienteRouter );
router.use('/profesionales', checkAuth, profesionalRouter );
router.use('/turnos', checkAuth, turnoRouter );
router.use('/visitas', checkAuth, visitaRouter );
router.use('/articulos', checkAuth, articuloRouter );
router.use('/lista-precios', checkAuth, listaPrecioRouter );
router.use('/grupo-articulos', checkAuth, grupoArticuloRouter );
router.use('/almacenes', checkAuth, almacenRouter );
router.use('/stocks', checkAuth, stockRouter );
router.use('/categoria-pacientes', checkAuth, categoriaPacienteRouter );
router.use('/remitos', checkAuth, remitoRouter );
router.use('/facturas', checkAuth, facturaRoutes );
router.use('/pagos-recibidos', checkAuth, pagosRecibidosRoutes );
router.use('/indicadores', checkAuth, indicadoresRoutes );


export default router;