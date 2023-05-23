const negocio = require('../negocio/negocio')


async function retirada(req, res) {
    const livro = req.body
    
    try {
        const livroRetirado = await negocio.retirada(livro.matricula_cliente, livro.livro_id)
        res.status(201).json(livroRetirado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function devolucao(req, res) {
    const livro = req.body

    try {
        const livroDevolvido = await negocio.devolucao(livro.retirada, livro.matricula_cliente, livro.livro_id)
        res.status(201).json(livroDevolvido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

module.exports = {
    retirada,
    devolucao
}