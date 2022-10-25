CREATE TABLE IF NOT EXISTS usuarios (
	id SERIAL PRIMARY KEY,
  	nome TEXT NOT NULL,
  	email TEXT UNIQUE NOT NULL,
  	senha TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS categorias (
	id SERIAL PRIMARY KEY,
  	descricao TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS transacoes (
 	id SERIAL PRIMARY KEY,
  	descricao TEXT,
  	valor INTEGER NOT NULL,
  	data TIMESTAMPTZ NOT NULL,
  	categoria_id INT NOT NULL,
  	usuario_id INT NOT NULL,
  	tipo TEXT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id), 
  	FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
)

INSERT INTO categorias (descricao) values ('')('Alimentação'),('Assinaturas e Serviços'),('Casa'),('Mercado'), ('Cuidados Pessoais'), ('Educação'), ('Família'), ('Lazer'), ('Pets'), ('Presentes'), ('Roupas'), ('Saúde'), ('Transporte'), ('Salário'),('Vendas'), ('Outras receitas'), ('Outras despesas')