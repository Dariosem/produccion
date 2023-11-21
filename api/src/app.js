import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/app.routes.js';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const app = express();

app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    methods: "POST, GET, PUT, PATCH, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads/')
      },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})
const upload = multer({storage, limits: {filedSize: 50 * 1024 * 1024}});
//const upload = multer({storage});

app.use(upload.single('image'))
app.use('/api', appRouter);

app.use(express.static('src/public'))

app.use((req, res, next) => {
    res.status(404).json({error: 'Recurso no encontrado'});
})


export default app;