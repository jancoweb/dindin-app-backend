const conexao = require('./conexao');
const jwt = require('jsonwebtoken');
const jwtSecret = require('./controladores/Usuarios/jwt_secret');

const autenticador = async(req, res, next)=>{
  const { authorization } = req.headers;
  if(!authorization) return res.status(401).json('mensagem: Para acessar este recurso um token de autenticação válido deve ser enviado.');
  try {
    const token = authorization.replace('Bearer', '').trim();
    const { id } = jwt.verify(token, jwtSecret);

    const query = 'select * from usuarios where id = $1';
    const { rows, rowCount } = await conexao.query(query, [id]);
  
    if(rowCount === 0) return res.status(404).json('Usuário não encontrado');

    const { senha, ...usuario } = rows[0];

    req.usuario = usuario;

    next()
  } catch (e) {
    return res.json(e.message);
  }
}

module.exports = autenticador;