import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Duas formas de aplicar o middleware
// 1. routes.use(authMiddleware) - Perigoso porque depende da linha que for
//    colocada. Neste caso, tudo abaixo desse routes.use(authMiddleware) será
//    passado para ele. Mas se trocar a linha de lugar ou adicionar muito mais
//    mais rotas algum tempo depois, pode ser que traga problemas se esquecer
//    disso.
//
// 2. Usando diretamente dentro da rota: routes.put('/users', authMiddleware, UserController.update);
// routes.put('/users', authMiddleware, UserController.update);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

routes.get('/schedule', ScheduleController.index);

routes.get("/notifications", NotificationController.index);
routes.put("/notifications/:id", NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
