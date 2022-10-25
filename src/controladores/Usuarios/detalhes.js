const detalharUsuario = async (req, res)=>{
  const { usuario } = req;
  console.log(req.headers)
  return res.status(200).json(usuario);
}

module.exports = detalharUsuario;