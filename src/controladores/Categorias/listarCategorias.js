const conexao = require('../../conexao');

const listarCategorias = async(req, res)=>{
  const query = 'select * from categorias';
  const categorias = await conexao.query(query);
  if(categorias.rowCount === 0) return res.status(404).json('Categoria não encontrada');

  return res.status(200).json(categorias.rows);
}

module.exports = listarCategorias;