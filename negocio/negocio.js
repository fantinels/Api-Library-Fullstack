const persistencia = require('../persistencia/persistencia')
const persistenciaC = require('../persistencia/cliente_persistencia')
const persistenciaL = require('../persistencia/livro_persistencia')

async function retirada(matricula_cliente, livro_id) {
    console.log('Verificando se este livro existe em nosso sistema ...');
    const livroExiste = await persistenciaL.buscarLivroPorId(livro_id)

    if (!livroExiste) {
        console.log('Livro NÃO existente! Tente novamente ...')
        return 
    }
    console.log('Livro Existente! Prosseguindo ...')

    console.log('Verificando se você está cadastrado em nosso sistema ...');
    const clienteExiste = await persistenciaC.buscarClientePorMatricula(matricula_cliente)

    if (!clienteExiste) {
        console.log('Cadastrado NÃO econtrado! Tente novamente ...')
        return
    }
    console.log('Cadastrado Econtrado! Prosseguindo ...')

    console.log('Verificando se você ainda tem limite para aluguel de livros ...')
    const limite = await persistenciaC.limiteLivroCliente(matricula_cliente)

    if (limite) {
        console.log('Limite máximo de livros alugados atingido ...')
        return
    }

    console.log('Limite liberado! Proseguindo ...')

    console.log('Verificando se o livro está disponível ...')
    const livroDisp = await persistenciaL.verificarDisponibilidade(livro_id)

    if (!livroDisp) {
        console.log('Livro INDISPONÍVEL! Não pode ser retirado!');
        return
    }

    console.log('Registrando o aluguel do livro ...');
    const retirada = await persistencia.retirada(matricula_cliente, livro_id)

    if (retirada) {
        console.log('Livro retirado com sucesso');
    }

    console.log('Contabilizando livro na conta do cliente...')
    const livroRetirado = await persistenciaC.contabilizaLivroCliente(matricula_cliente)

    if(livroRetirado) {
        console.log('Contabilizado com sucesso!')
    }

    console.log('Atualizando status do livro ...')
    const indisp = await persistenciaL.indisponibilizaLivro(livro_id)

    if (indisp) {
        console.log('Baixa realizada com sucesso!')
    }
}

async function devolucao(retiradaId, matricula_cliente, livro_id) {

    console.log('Verificando se este livro foi retirado ...')
    const retiradaLivro = await persistencia.buscarRetiradaId(retiradaId)
    if (!retiradaLivro) {
        console.log('Não há retirada registrada para este livro')
        return
    }

    console.log('Verificando se cliente existe ... ')
    const cliente = await persistenciaC.buscarClientePorMatricula(matricula_cliente)
    if (!cliente) {
        console.log('Cliente não existe') 
        return
    }

    console.log('Verificando se livro existe ... ')
    const livro = await persistenciaL.buscarLivroPorId(livro_id)
    if (!livro) {
        console.log('Livro não existe')
        return
    }

    console.log('Verificando devolução ... ')
    const devolucaoL = await persistencia.buscarDevolucao(retiradaId)
    if (devolucaoL) {
        console.log('Devolução já realizada!')
        return
    }

    console.log('Disponiblizando Livro ... ')
    await persistenciaL.disponibilizaLivro(livro_id)

    console.log('Atualizando limite cliente ... ')
    await persistenciaC.reduzLivroCliente(matricula_cliente)

    console.log('Registrando Devolução ... ')
    const livroDevolvido = await persistencia.devolucao(retiradaId, matricula_cliente, livro_id)

    if (livroDevolvido) {
        console.log('Livro Devolvido com Sucesso!')
    }
     
}
    
module.exports = {
    retirada,
    devolucao
}