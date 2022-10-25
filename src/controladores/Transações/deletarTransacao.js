const conexao = require('../../conexao');

const deletarTransacao = async (req, res) =>{
  const { usuario } = req;
  const { id } = req.params;
  const checkQuery = 'select * from transacoes where usuario_id = $1';
  const check = await conexao.query(checkQuery, [usuario.id]);
  if(check.rowCount === 0) return res.status(404).json('Transação não encontrada');

  try {
    const deleteQuery = 'delete from transacoes where id = $1';
    const deletar = await conexao.query(deleteQuery, [id]);

    if(deletar.rowCount === 0) return res.status(404).json('Transação não encontrada');

    return res.send().status(200)
  } catch (e) {
    return res.send().json(e.message);
  }
}

module.exports = deletarTransacao;