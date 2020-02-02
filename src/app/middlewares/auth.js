import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json(401).json({ error: 'Token não enviado.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Usando o promisify:
    // Promissify retornará uma função que normalmente usa um callback transformada
    // em uma promisse para usarmos async / await.
    //
    // Se não utilizar, teria que controlar através de callback, conforme abaixo:
    // jwt.verify(token, authConfig.secret, (err, result) => {
    // callback;
    //    });

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
