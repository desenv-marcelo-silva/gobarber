import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Marcelo Silva',
    email: 'Marcelo@empresa.com.br',
    password_hash: '123456',
  });
  res.json(user);
});

export default routes;
