const negocio = require('../negocio/autor_negocio')

async function cadastrarAutores(req, res) {
    const autores = req.body
    
    try {
        const autorInserido = await negocio.cadastrarAutores(autores)
        res.status(201).json(autorInserido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarAutorPorNome(req, res) {
    const nome = req.params.nome

    try {
        const autorNome = await negocio.buscarAutorPorNome(nome)
        res.status(200).json(autorNome)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarAutorPorId(req, res) {
    const id = req.params.autor_id

    try {
        const autorId = negocio.buscarAutorPorId(id)
        res.status(200).json(autorId)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarAutor(req, res) {
    const autor = req.body

    try {
        const autores = await negocio.buscarAutor(autor)
        res.status(200).json(autores)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function atualizarAutores(req, res) {
    const id = req.params.id
    const autores = req.body

    try {
        const autorAtualizado = await negocio.atualizarAutores(id, autores)
        res.status(200).json(autorAtualizado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function deletarAutores(req, res) {
    const id = req.params.id

    try {
        const autorDel = await negocio.deletarAutores(id)
        res.status(200).json(autorDel)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

module.exports = {
    cadastrarAutores,
    buscarAutorPorNome,
    buscarAutorPorId,
    buscarAutor,
    atualizarAutores,
    deletarAutores
}