const conexao = require('../../conexao');
const securePassword = require('secure-password');

const password = securePassword();

const cadastrar = async (req, res)=>{
  const { nome, email, senha } = req.body;
  
  if(!nome || !email || !senha) return res.status(400).json('Campo obrigatório');

  try {
    const query = 'select * from usuarios where email = $1';
    const emailCheck = await conexao.query(query, [email]);

    if(emailCheck.rowCount > 0) return res.status(400).json('Email já cadastrado');

  } catch (e) {
    return res.send(e.message)
  }

  try {
    const hash = (await password.hash(Buffer.from(senha))).toString('hex');
    const query = 'insert into usuarios (nome, email, senha) values ($1, $2, $3)';
    const usuario = await conexao.query(query, [nome,email, hash]);

    if(usuario.rowCount === 0) return res.status(400).json('Não foi possível realizar o cadastro');


    const responseQuery = 'select id, nome, email from usuarios where email = $1';
    const bodyResponse = await conexao.query(responseQuery,[email]);

    return res.status(201).json(bodyResponse.rows[0]);

  } catch (e) {
    return res.send(e.message)
  }
}

module.exports = cadastrar;