const conexao = require('../../conexao');

const obterExtrato = async (req, res)=>{
  const { usuario } = req;

  try {
    const query = 'select * from transacoes where usuario_id = $1';
    const transacoesEncontradas = await conexao.query(query, [usuario.id]);
    
    if(transacoesEncontradas.rowCount === 0) return res.status(404).json('Não foi possível encontrar transações deste usuário');
    
    let entradas = 0;
    let saidas = 0;

    transacoesEncontradas.rows.forEach((transacao)=>{
      if(transacao.tipo == 'entrada') entradas += transacao.valor;
      if(transacao.tipo == 'saida') saidas += transacao.valor;
    });

    return res.status(200).json({entrada: entradas, saida: saidas});
  } catch (e) {
    return res.send().json(e.message)
  }
}

module.exports = obterExtrato;