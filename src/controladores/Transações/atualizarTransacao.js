const conexao = require('../../conexao');

const atualizarTransacao = async(req, res)=>{
  const { id: idTransacao } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  if(!descricao || !valor || !data || !categoria_id || !tipo) {
    return res.status(400).json('Todos os campos são obrigatórios');
  }
  if(tipo !== 'entrada' && tipo !=='saida') return res.status(400).json('Tipo de transação inválido');
  
  const checkQuery = 'select * from categorias where id = $1';
  const categoriaCheck = await conexao.query(checkQuery, [categoria_id]);
  if(categoriaCheck.rowCount === 0) return res.status(404).json('Categoria não encontrada');

  try {
    const selectQuery = 'select * from transacoes where id = $1';
    const transacao = await conexao.query(selectQuery, [idTransacao])

    if(transacao.rowCount === 0) return res.status(404).json('transação não encontrada');

    const attQuery = 'update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6';
    const transacaoAtualizada = await conexao.query(attQuery, [descricao, valor, data, categoria_id, tipo, idTransacao])
    
    return res.send().status(201);
  } catch (e){
    return res.json(e.message)
  }
}

module.exports = atualizarTransacao