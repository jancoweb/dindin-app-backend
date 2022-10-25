const conexao = require('../../conexao');
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwt_secret')

const password = securePassword();

const login = async (req, res) => {
  const { email, senha } = req.body;
  if(!email || !senha) return res.status(400).json('Campo obrigatório');

  try {
    const query = 'select * from usuarios where email = $1';
    const usuarios = await conexao.query(query, [email]);

    if(usuarios.rowCount === 0) return res.status(404).json('Email ou senha incorretos.')

    const usuarioEncontrado = usuarios.rows[0];

    const passwordResult = await password.verify(Buffer.from(senha), Buffer.from(usuarioEncontrado.senha, "hex"));

    switch(passwordResult) {
      case securePassword.INVALID_UNRECOGNIZED_HASH: 
      case securePassword.INVALID:
        return res.status(401).json('Email ou senha incorretos');
      case securePassword.VALID:
        break
      case securePassword.VALID_NEEDS_REHASH:
        try {
          const newHash = (await password.hash(Buffer.from(senha))).toString("hex");
          const query = 'update usuarios set senha = $1 where email = $2';
          await conexao.query(query, [newHash, email]);
        } catch (e) {
        }
        break
    }
    
    const queryLogin = 'select id, nome, email from usuarios where email = $1'; 
    const usuarioLogado = await conexao.query(queryLogin, [email]);
    const usuario = usuarioLogado.rows[0];

    const token = jwt.sign({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }, jwtSecret);

    const response = {usuario, token}

    return res.status(200).json(response)

  } catch (e) {
    return res.send(e.message)
  }

}

module.exports = login;