-- Usuários
CREATE TABLE usuarios (
	user_id  SERIAL PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL
)

INSERT INTO usuarios (username, password) VALUES ('ADM', '123ADM123')

-- Livros
CREATE TABLE livros (
	livro_id  SERIAL PRIMARY KEY,
	isbn      VARCHAR (50) UNIQUE NOT NULL,
	nome	  VARCHAR (50) NOT NULL,
	autor_id  INTEGER,
		FOREIGN KEY (autor_id) REFERENCES autores(autor_id),
	editora   VARCHAR (50) NOT NULL,
	ano_publi CHAR(4),
	status    VARCHAR (10)
)

-- Autores
CREATE TABLE autores (
	autor_id    SERIAL PRIMARY KEY,
	nome 	    VARCHAR (50) UNIQUE NOT NULL,
	pais_origem VARCHAR (3) NOT NULL
)

-- Clientes
CREATE TABLE clientes (
	matricula 		 SERIAL PRIMARY KEY,
	nome      		 VARCHAR (50) UNIQUE NOT NULL,
	telefone  		 VARCHAR (20) NOT NULL,
	livros_retirados INTEGER
)

-- Retirada de Livros
CREATE TABLE retirada (
	id_retirada 	  SERIAL PRIMARY KEY,
	matricula_cliente INTEGER,
		FOREIGN KEY (matricula_cliente) REFERENCES clientes(matricula),
	livro_id 		  INTEGER,
		FOREIGN KEY (livro_id) REFERENCES livros(livro_id),
	data_retirada 	  DATE,
	data_entrega  	  DATE
)

-- Devolução de Livros
CREATE TABLE devolucao (
	id_devolucao   SERIAL PRIMARY KEY,
	retirada       INTEGER,
		FOREIGN KEY (retirada) REFERENCES retirada(id_retirada),
	data_devolucao DATE,
	dias_atraso    INTEGER
)

select * from usuarios
select * from livros
select * from autores
select * from clientes
select * from retirada
select * from devolucao
