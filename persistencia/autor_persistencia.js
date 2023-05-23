const { Client }  = require('pg')
const { conexao } = require('./conexao');

async function cadastrarAutores(autores) {
    const cliente = new Client(conexao)
    await cliente.connect()

    try {
        const sql = `INSERT INTO autores(nome, pais_origem) VALUES($1, $2) RETURNING *`
        const valuesAuthor = [autores.nome, autores.pais_origem]
        const autorCadastrado = await cliente.query(sql, valuesAuthor)

        await cliente.end()
        return autorCadastrado.rows[0]
    } catch (error) { throw error }
}

async function buscarAutorPorNome(nome) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT DISTINCT nome, pais_origem FROM autores WHERE nome = $1`
        const valuesAutorNome = [nome]
        const autorNome = await cliente.query(sql, valuesAutorNome)

        await cliente.end()
        return autorNome.rows
    } catch (error) { throw error }
}

async function buscarAutorPorId(id_autor) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * FROM autores WHERE autor_id = $1`
        const valuesAutorId = [id_autor]
        const autorId = await cliente.query(sql, valuesAutorId)

        await cliente.end()
        return autorId.rows[0]
    } catch (error) { throw error }
}

async function buscarAutor() {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT DISTINCT nome, pais_origem FROM autores`
        const autorNome = await cliente.query(sql)

        await cliente.end()
        return autorNome.rows
    } catch (error) { throw error }
}

async function atualizarAutores(id, autores) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = await cliente.query(`UPDATE autores SET nome = $1, pais_origem = $2 WHERE autor_id = $3 RETURNING *`, 
                                                    [autores.nome, autores.pais_origem, id])
        
        await cliente.end()
        return sql.rows[0]
    } catch (error) { throw error }
}

async function deletarAutores(id) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = await cliente.query(`DELETE FROM autores WHERE autor_id = $1 RETURNING *`, [id])
        await cliente.end()
        return sql.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    cadastrarAutores,
    buscarAutorPorNome,
    buscarAutorPorId,
    buscarAutor,
    atualizarAutores,
    deletarAutores
}