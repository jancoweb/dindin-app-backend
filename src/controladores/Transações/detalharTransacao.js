const conexao = require('../../conexao');

const detalharTransacao = async(req, res)=>{
  const { id: idTransacao } = req.params;
  const { id } = req.usuario;

  try {
    const query = 'select * from transacoes where id = $1 and usuario_id = $2';
    const detalhes = await conexao.query(query, [idTransacao, id]);

  
    if(detalhes.rowCount === 0) return res.status(404).json('Transação não encontrada');

    return res.status(200).json(detalhes.rows[0])
  } catch (e){
    return res.send().json(e.message);
  }
}

module.exports = detalharTransacao;