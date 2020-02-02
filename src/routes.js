import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

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

export default routes;
