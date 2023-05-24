const persistencia = require('../persistencia/livro_persistencia')
const autor = require('../persistencia/autor_persistencia')

async function cadastrarLivros(livros) {

    const livro = await persistencia.buscarLivroPorIsbn(livros.isbn)

    if (livro) {
        console.log('Livro já cadastrado')
        return
    }
    
    if (livros && livros.isbn && livros.nome && livros.autor_id && livros.editora && livros.ano_publi) {
        try {
            const livroInserido = await persistencia.cadastrarLivros(livros)
            return livroInserido
        } catch (error) { throw error }
    } else {
        let erro = new Error()
        erro.message = "Falta parâmetros deste livro"
        erro.status = 400
        throw erro
    } 
}

async function buscarLivroPorNome(nome) {
    try {
        const livroNome = await persistencia.buscarLivroPorNome(nome)

        if (!livroNome) {
            let erro = new Error()
            erro.message = "Nome do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return livroNome
    } catch (error) { throw error }
}

async function buscarLivroPorIsbn(isbn) {
    try {
        const livroIsbn = await persistencia.buscarLivroPorIsbn(isbn)

        if (!livroIsbn) {
            let erro = new Error()
            erro.message = "Isbn do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return livroIsbn
    } catch (error) { throw error }
}

async function buscarLivroPorId(livro_id) {
    try {
        const livroId = await persistencia.buscarLivroPorId(livro_id)

        if (!livroId) {
            let erro = new Error()
            erro.message = "Id do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return livroId
    } catch (error) { throw error }
}

async function buscarLivros() {
    try {
        let livro = await persistencia.buscarLivros()
        return livro
    } catch (error) { throw error }
}

async function atualizarLivro(id, livro) {

    const isbnExiste = await persistencia.buscarLivroPorIsbn(livro.isbn)
    if (isbnExiste) {
        console.log('ISBN já cadastrado, tente novamente ...')
        return
    }

    const nomeExiste = await persistencia.buscarLivroPorNome(livro.nome)
    if (nomeExiste) {
        console.log('NOME já cadastrado, tente novamente ...')
        return
    }

    const autorId = await autor.buscarAutorPorId(livro.autor_id)
    if (!autorId) {
        console.log('ID do autor não encontrado')
        return
    }

    if (livro && livro.isbn && livro.nome && livro.autor_id && livro.editora && livro.ano_publi && livro.status) {
        const livroAtualizado = await persistencia.atualizarLivro(id, livro)
        if (!livroAtualizado) {
            let erro = new Error()
            erro.message = "Id do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return livroAtualizado
    } else {
        let erro = new Error()
        erro.message = "Falta parâmetros deste livro"
        erro.status = 400
        throw erro
    }
}

async function deletarLivro(livro_id) {
    try {
        const livroDel = await persistencia.deletarLivro(livro_id)

        if (!livroDel) {
            let erro = new Error()
            erro.message = "Id do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return livroDel
    } catch (error) { throw error }
}

module.exports = {
    cadastrarLivros,
    buscarLivroPorNome,
    buscarLivroPorIsbn,
    buscarLivroPorId,
    buscarLivros,
    atualizarLivro,
    deletarLivro
}