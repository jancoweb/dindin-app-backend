const conexao = require('../../conexao');

const listarTransacao = async(req, res)=> {

  const { usuario } = req;
  const { id } = usuario;
  try {
    const query = 'select t.id, t.descricao, t.valor, t.data, t.categoria_id, t.usuario_id, t.tipo, c.descricao as categoria_nome from transacoes as t JOIN categorias as c ON t.categoria_id = c.id where t.usuario_id = $1';
    const listar = await conexao.query(query, [id]);
    return res.status(200).json(listar.rows)
  } catch (e) {
    res.send().json(e.message);
  }
}

module.exports = listarTransacao;