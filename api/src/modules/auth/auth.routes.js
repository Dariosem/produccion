import { Router } from 'express';
import { forgotPassword, getHash, login, logout, resetPassword } from './auth.controller.js';
import { dataValidate } from '../../middlewares/dataValidate.middleware.js';
import { loginSchema } from '../../schemas/auth.schema.js'

const authRouter = Router();

authRouter.get('/', (req, res) => res.send('Estoy en Auth Routes')) ;
authRouter.post('/login', dataValidate(loginSchema), login);
authRouter.get('/logout/:token', logout) ;
authRouter.post('/forgotPass', forgotPassword) ;
authRouter.post('/resetPass', resetPassword) ;
authRouter.get('/get-hash/:pass', getHash) ;



export default authRouter;