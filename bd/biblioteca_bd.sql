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
	isbn      VARCHAR (50) NOT NULL,
	nome	  VARCHAR (50) NOT NULL,
	autor_id  INTEGER,
		FOREIGN KEY (autor_id) REFERENCES autores(autor_id),
	editora   VARCHAR (50) NOT NULL,
	ano_publi DATE,
	status    VARCHAR (20)
)

-- Autores
CREATE TABLE autores (
	autor_id    SERIAL PRIMARY KEY,
	nome 	    VARCHAR (50) NOT NULL,
	pais_origem VARCHAR (3) NOT NULL
)

-- Clientes
CREATE TABLE clientes (
	matricula 		 SERIAL PRIMARY KEY,
	nome      		 VARCHAR (50) NOT NULL,
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
	data_retirada 	  CHAR(10)
)
ALTER TABLE retirada ADD COLUMN data_retirada CHAR(10)

-- Devolução de Livros
CREATE TABLE devolucao (
	id_devolucao   SERIAL PRIMARY KEY,
	retirada       INTEGER,
		FOREIGN KEY (retirada) REFERENCES retirada(id_retirada),
	data_devolucao CHAR(10),
	matricula_cliente INTEGER,
		FOREIGN KEY (matricula_cliente) REFERENCES clientes(matricula),
	livro_id INTEGER,
		FOREIGN KEY (livro_id) REFERENCES livros(livro_id)
)
ALTER TABLE devolucao DROP COLUMN data_devolucao

ALTER TABLE devolucao ADD CONSTRAINT livro_id FOREIGN KEY (livro_id) REFERENCES livros(livro_id)
FOREIGN KEY (matricula_cliente) REFERENCES clientes(matricula)

drop table autores
drop table livros
drop table retirada
drop table devolucao

select * from usuarios
select * from livros
select * from autores
select * from clientes
select * from retirada
select * from devolucao

select * from livros where livro_id = 1 and status = 'disponível'
update livros set status = 'disponível' where livro_id = 1 returning *

SELECT COUNT(*) FROM livros WHERE livro_id = 1 AND status = 'disponível'
SELECT * from clientes WHERE matricula = 9 AND livros_retirados >= 3

update clientes set livros_retirados = 4 where matricula = 1 returning *

INSERT INTO retirada(matricula_cliente, livro_id) 
                                                       VALUES(5, 2)
													   
SELECT livros_retirados FROM clientes WHERE matricula = 4
delete from retirada
delete from clientes
delete from autores
delete from livros
SELECT DISTINCT nome, pais_origem FROM autores

update clientes set livros_retirados = livros_retirados - 1 where matricula = 14
select * from clientes
select * from livros
select * from autores
select * from retirada
select * from devolucao
delete from devolucao

UPDATE clientes SET livros_retirados = livros_retirados - 1 WHERE matricula = 14 RETURNING *
insert into autores(nome, pais_origem) values ('coleen hoover', 'eua')
select distinct nome, pais_origem from autores WHERE autor_id = 

insert into retirada(matricula_cliente, livro_id, data_retirada) values (11, 1, CURRENT_DATE)
SELECT * FROM clientes WHERE matricula = 15
SELECT * FROM retirada WHERE id_retirada = 100

UPDATE livros SET isbn = '2222222222',
                  nome = 'Verity',
                  autor_id  = 1,
                  editora   = 'Rocco',
                  ano_publi = '03-05-2021',
                  status    = 'disponível'
                                       WHERE livro_id = 3 RETURNING *
									   
SELECT * FROM clientes WHERE matricula = 15