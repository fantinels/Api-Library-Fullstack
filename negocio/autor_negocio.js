const persistencia = require('../persistencia/autor_persistencia')

async function cadastrarAutores(autores) {
    if (autores && autores.nome && autores.pais_origem) {
        try {
            const autorInserido = await persistencia.cadastrarAutores(autores)
            return autorInserido
        } catch (error) { throw error }
    } else {
        let erro = new Error()
        erro.message = "Falta parâmetros deste livro"
        erro.status = 400
        throw erro
    }
}

async function buscarAutorPorNome(nome) {
    try {
        const autorNome = await persistencia.buscarAutorPorNome(nome)
        return autorNome
    } catch (error) { throw error }
}

async function buscarAutorPorId(id) {
    try {
        const autorId = await persistencia.buscarAutorPorId(id)

        if (!autorId) {
            let erro = new Error()
            erro.message = "Id do autor não encontrado"
            erro.status = 404
            throw erro
        }

        return autorId
    } catch (error) { throw error }
}

async function buscarAutor() {
    try {
        const autor = await persistencia.buscarAutor()
        return autor
    } catch (error) { throw error }
}

async function atualizarAutores(id, autores) {
    if (autores && autores.nome && autores.pais_origem) {
        const autorAtualizado = await persistencia.atualizarAutores(id, autores)

        if (!autorAtualizado) {
            let erro = new Error()
            erro.message = "Id do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return autorAtualizado
    } else {
        let erro = new Error()
        erro.message = "Falta parâmetros deste livro"
        erro.status = 400
        throw erro
    }
}

async function deletarAutores(id) {
    try {
        const autorDel = await persistencia.deletarAutores(id)

        if (!autorDel) {
            let erro = new Error()
            erro.message = "Id do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return autorDel
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