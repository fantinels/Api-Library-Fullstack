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

async function buscarDataRetirada(retirada) {
    const cliente = new Client()
    cliente.connect()

    try {
        const sql = `SELECT data_retirada FROM retirada WHERE id_retirada = $1`
        const values = [retirada]
        const dataRetirada = await cliente.query(sql, values)

        await cliente.end()
        return dataRetirada.rows[0].data_retirada
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

async function buscarDataDevolucao(retirada) {
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

async function diasAtraso(retirada) {
    try {
        const dataRetirada = await this.buscarDataRetirada(retirada)
        diasAtrasos = new Date() - dataRetirada
        diasAtrasos = Math.ceil(diasAtraso / (1000 * 3600 * 24))

        diasAtrasos -= 15

        if (diasAtrasos > 0) {
            return 0
        } else {
            return diasAtrasos
        }
    } catch (error) { throw error }
}

module.exports = {
    retirada,
    buscarDataRetirada,
    devolucao,
    buscarDataDevolucao,
    buscarRetiradaId,
    diasAtraso
}