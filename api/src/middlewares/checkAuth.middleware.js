import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const checkAuth = async (req, res, next) => {
    //return req.next();
    const {authorization} = req.headers;

    if(!authorization) return res.status(401).json({error: 'No se ha enviado un token válido'});

    const token = authorization.split(' ')[1];

    try {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) return res.status(401).json({error: 'No está autorizado', err});
            req.user = user;

            next();

        });
        
        
    } catch (error) {
        return res.status(401).json({error: 'No está autorizado', error});
    }
}