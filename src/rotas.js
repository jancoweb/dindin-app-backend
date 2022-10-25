const express = require('express');
const rotas = express();

const autenticador = require('./autenticador');
const listarCategorias = require('./controladores/Categorias/listarCategorias');
const atualizarTransacao = require('./controladores/Transações/atualizarTransacao');
const cadastrarTransacao = require('./controladores/Transações/cadastrarTransacao');
const deletarTransacao = require('./controladores/Transações/deletarTransacao');
const detalharTransacao = require('./controladores/Transações/detalharTransacao');
const listarTransacao = require('./controladores/Transações/listarTransacao');
const obterExtrato = require('./controladores/Transações/obterExtrato');
const cadastrar = require('./controladores/Usuarios/cadastro');
const detalharUsuario = require('./controladores/Usuarios/detalhes');
const editarCadastro = require('./controladores/Usuarios/editarCadastro');
const login = require('./controladores/Usuarios/login');

rotas.post('/usuario', cadastrar);
rotas.post('/login', login);
rotas.get('/usuario', autenticador, detalharUsuario);
rotas.put('/usuario', autenticador, editarCadastro);
rotas.get('/categoria', autenticador, listarCategorias);
rotas.get('/transacao/extrato', autenticador ,obterExtrato);
rotas.get('/transacao', autenticador,listarTransacao);
rotas.get('/transacao/:id', autenticador,detalharTransacao);
rotas.post('/transacao/', autenticador, cadastrarTransacao);
rotas.put('/transacao/:id', autenticador, atualizarTransacao);
rotas.delete('/transacao/:id', autenticador, deletarTransacao);


module.exports = rotas;