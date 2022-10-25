const conexao = require('../../conexao');

const cadastrarTransacao = async(req, res)=>{
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const { id: userId } = req.usuario;

  if(!descricao || !valor || !data || !categoria_id || !tipo) {
    return res.status(400).json('Todos os campos são obrigatórios');
  }
  if(tipo !== 'entrada' && tipo !=='saida') return res.status(400).json('Tipo de transação inválido');

  try {
    const checkQuery = 'select * from categorias where id = $1';
    const categoriaCheck = await conexao.query(checkQuery, [categoria_id]);
    if(categoriaCheck.rowCount === 0) return res.status(404).json('Categoria não encontrada')

    const query = 'insert into transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) values ($1, $2, $3, $4 ,$5, $6)';
    const cadastrar = await conexao.query(query, [descricao, valor, data, categoria_id, tipo, userId]);

    if(cadastrar.rowCount === 0) return res.status(400).json('Não foi possível cadastrar esta transação')

    const searchQuery = 'select descricao from categorias where id = $1';
    const categoria = await conexao.query(searchQuery, [categoria_id]);

    if(categoria.rowCount === 0) return res.status(404).json('Erro interno')

    const nomeCategoria = categoria.rows[0].descricao;

    const transacaoCadastrada = {
      descricao, 
      valor, 
      data, 
      categoria_id,
      nomeCategoria,
      tipo
    }

    return res.status(200).json(transacaoCadastrada)
    
  } catch (e){
    return res.json(e.message);
  }
}

module.exports = cadastrarTransacao;