import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    // retornará todas as informações do model vindas do banco
    // const user = await User.create(req.body);

    // retornará informações selecionadas. Nem tudo precisa voltar
    const { id, name, email, provider } = await User.create(req.body);

    res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
