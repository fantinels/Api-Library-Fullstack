const { Client }  = require('pg')
const { conexao } = require('./conexao');

async function retirada(matricula, id_livro) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = await cliente.query(`INSERT INTO retirada(matricula_cliente, livro_id) 
                                                       VALUES($1, $2) RETURNING *`, [matricula, id_livro])
        await cliente.end()
        return sql.rows
    } catch (error) { throw error }
}

async function devolucao(retirada, matricula_cliente, livro_id) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `INSERT INTO devolucao (retirada, matricula_cliente, livro_id) VALUES ($1, $2, $3) RETURNING *`
        const values = [retirada, matricula_cliente, livro_id]
        const devolucao = await cliente.query(sql, values)

        await cliente.end()
        return devolucao.rows
    } catch (error) { throw error }
}

async function buscarDevolucao(retirada) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * FROM devolucao WHERE retirada = $1`
        const values = [retirada]
        const dataDevolucao = await cliente.query(sql, values)

        await cliente.end()
        return dataDevolucao.rows[0]
    } catch (error) { throw error }
}

async function buscarRetiradaId(id) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * FROM retirada WHERE id_retirada = $1`
        const values = [id]
        const retiradaId = await cliente.query(sql, values)

        await cliente.end()
        return retiradaId.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    retirada,
    devolucao,
    buscarDevolucao,
    buscarRetiradaId
}